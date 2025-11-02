'use client';

interface RateDetailCardProps {
  rate: {
    id: string;
    num_bedrooms: number;
    num_bathrooms: number;
    square_footage: number;
    monthly_premium: number;
    annual_premium: number;
    distance_miles: number;
    insurance_provider: string;
    home_type: string;
    year_built: number;
  };
}

export default function RateDetailCard({ rate }: RateDetailCardProps) {
  const formatHomeType = (type: string) => {
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="w-72 p-2">
      {/* Home Details */}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-neutral-900">
          {rate.num_bedrooms} bed, {rate.num_bathrooms} bath
        </h3>
        <p className="text-sm text-neutral-600">
          {rate.square_footage.toLocaleString()} sqft •{' '}
          {formatHomeType(rate.home_type)}
        </p>
        {rate.year_built && (
          <p className="text-xs text-neutral-500">Built {rate.year_built}</p>
        )}
      </div>

      {/* Insurance Rate */}
      <div className="mb-3 rounded-lg bg-neutral-50 p-3">
        <div className="mb-1 flex items-baseline justify-between">
          <span className="text-2xl font-bold text-neutral-900">
            ${Math.round(rate.monthly_premium)}
          </span>
          <span className="text-sm text-neutral-600">/month</span>
        </div>
        <div className="text-xs text-neutral-500">
          ${Math.round(rate.annual_premium).toLocaleString()}/year
        </div>
        {rate.insurance_provider && (
          <div className="mt-2 text-sm text-neutral-700">
            {rate.insurance_provider}
          </div>
        )}
      </div>

      {/* Distance */}
      <div className="flex items-center gap-2 text-sm text-neutral-600">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>{rate.distance_miles.toFixed(1)} miles away</span>
      </div>

      {/* Privacy Notice */}
      <div className="mt-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-800">
        📍 Location shown is approximate for privacy
      </div>
    </div>
  );
}
