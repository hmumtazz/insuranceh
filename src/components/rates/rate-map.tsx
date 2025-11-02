'use client';

import { useState, useCallback, useMemo } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import RateDetailCard from './rate-detail-card';
import MapFilters from './map-filters';
import MapSearchBar from './map-search-bar';

interface RateData {
  id: string;
  anonymized_location: { coordinates: [number, number] } | null;
  num_bedrooms: number;
  num_bathrooms: number;
  square_footage: number;
  monthly_premium: number;
  annual_premium: number;
  insurance_provider: string;
  home_type: string;
  year_built: number;
  created_at: string;
}

interface RateMapProps {
  initialRates: RateData[];
}

export default function RateMap({ initialRates }: RateMapProps) {
  const [selectedRate, setSelectedRate] = useState<RateData | null>(null);

  // Calculate center from all rates, or default to US center
  const mapCenter = useMemo(() => {
    if (initialRates.length === 0) {
      return { latitude: 39.8283, longitude: -98.5795, zoom: 4 }; // US center
    }

    // Calculate average position of all rates
    let totalLat = 0;
    let totalLng = 0;
    let count = 0;

    initialRates.forEach((rate) => {
      if (rate.anonymized_location?.coordinates) {
        const [lng, lat] = rate.anonymized_location.coordinates;
        totalLat += lat;
        totalLng += lng;
        count++;
      }
    });

    if (count === 0) {
      return { latitude: 39.8283, longitude: -98.5795, zoom: 4 };
    }

    return {
      latitude: totalLat / count,
      longitude: totalLng / count,
      zoom: 10,
    };
  }, [initialRates]);

  const [viewport, setViewport] = useState(mapCenter);

  const [filters, setFilters] = useState({
    radius: 2.0,
    bedrooms: null as number | null,
    bathrooms: null as number | null,
  });

  // Filter rates based on current filters
  const filteredRates = useMemo(() => {
    return initialRates.filter((rate) => {
      if (filters.bedrooms && rate.num_bedrooms !== filters.bedrooms)
        return false;
      if (filters.bathrooms && rate.num_bathrooms !== filters.bathrooms)
        return false;
      return true;
    });
  }, [initialRates, filters]);

  const handleMarkerClick = useCallback((rate: RateData) => {
    setSelectedRate(rate);
  }, []);

  const handleLocationSelect = useCallback((lat: number, lng: number) => {
    setViewport({
      latitude: lat,
      longitude: lng,
      zoom: 13,
    });
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* Map */}
      <Map
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Navigation Controls */}
        <NavigationControl position="top-right" />

        {/* Rate Markers */}
        {filteredRates.map((rate) => {
          if (!rate.anonymized_location?.coordinates) return null;

          const [lng, lat] = rate.anonymized_location.coordinates;

          return (
            <Marker
              key={rate.id}
              latitude={lat}
              longitude={lng}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleMarkerClick(rate);
              }}
            >
              <button
                className="flex h-12 w-12 items-center justify-center rounded-full border-3 border-white bg-neutral-900 shadow-xl transition-all hover:scale-110 hover:bg-neutral-800 hover:shadow-2xl"
                aria-label={`Rate: $${rate.monthly_premium}/month`}
              >
                <span className="text-sm font-bold text-white">
                  ${Math.round(rate.monthly_premium)}
                </span>
              </button>
            </Marker>
          );
        })}

        {/* Selected Rate Popup */}
        {selectedRate && selectedRate.anonymized_location?.coordinates && (
          <Popup
            latitude={selectedRate.anonymized_location.coordinates[1]}
            longitude={selectedRate.anonymized_location.coordinates[0]}
            onClose={() => setSelectedRate(null)}
            closeButton={true}
            closeOnClick={false}
            offset={25}
          >
            <RateDetailCard
              rate={{
                ...selectedRate,
                distance_miles: 0, // We'll calculate this later if needed
              }}
            />
          </Popup>
        )}
      </Map>

      {/* Search Bar */}
      <div className="absolute left-1/2 top-4 z-10 w-full max-w-md -translate-x-1/2 px-4">
        <MapSearchBar onLocationSelect={handleLocationSelect} />
      </div>

      {/* Filter Panel */}
      <div className="absolute left-4 top-20 z-10">
        <MapFilters
          filters={filters}
          onFiltersChange={setFilters}
          rateCount={filteredRates.length}
        />
      </div>

      {/* Info Panel */}
      <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-neutral-200 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-4 text-sm">
          <div className="text-neutral-600">
            Showing {filteredRates.length} rate
            {filteredRates.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="mt-2 text-xs text-neutral-500">
          Circles show approximate location (±0.03-0.09 miles for privacy)
        </div>
      </div>
    </div>
  );
}
