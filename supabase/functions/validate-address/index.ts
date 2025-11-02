
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

interface AddressValidationRequest {
  address: string;
}

interface MapboxFeature {
  place_name: string;
  center: [number, number];
  context: Array<{ id: string; text: string }>;
  place_type: string[];
  relevance: number;
}

interface ValidatedAddress {
  fullAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  confidence: number;
}

Deno.serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const { address }: AddressValidationRequest = await req.json();

    if (!address || address.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Address is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get Mapbox token from environment
    const mapboxToken = Deno.env.get('MAPBOX_ACCESS_TOKEN');
    if (!mapboxToken) {
      return new Response(
        JSON.stringify({ error: 'Mapbox token not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Call Mapbox Geocoding API
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${mapboxToken}&country=US&types=address&limit=1`;

    const response = await fetch(geocodingUrl);
    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Address not found. Please enter a valid US address.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const feature: MapboxFeature = data.features[0];

    // Extract address components
    let streetAddress = '';
    let city = '';
    let state = '';
    let zipCode = '';

    // Parse street address from place_name
    const addressParts = feature.place_name.split(',');
    streetAddress = addressParts[0]?.trim() || '';

    // Extract components from context
    if (feature.context) {
      for (const item of feature.context) {
        if (item.id.startsWith('place.')) {
          city = item.text;
        } else if (item.id.startsWith('region.')) {
          state = item.text;
        } else if (item.id.startsWith('postcode.')) {
          zipCode = item.text;
        }
      }
    }

    // Validate that we have all required components
    if (!streetAddress || !city || !state || !zipCode) {
      return new Response(
        JSON.stringify({
          error: 'Incomplete address. Please provide a complete street address with city, state, and ZIP code.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const validatedAddress: ValidatedAddress = {
      fullAddress: feature.place_name,
      streetAddress,
      city,
      state,
      zipCode,
      latitude: feature.center[1],
      longitude: feature.center[0],
      confidence: feature.relevance,
    };

    return new Response(
      JSON.stringify({ data: validatedAddress }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Address validation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to validate address' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});
