'use client';

import { useState } from 'react';

interface MapFiltersProps {
  filters: {
    radius: number;
    bedrooms: number | null;
    bathrooms: number | null;
  };
  onFiltersChange: (filters: {
    radius: number;
    bedrooms: number | null;
    bathrooms: number | null;
  }) => void;
  rateCount: number;
}

export default function MapFilters({
  filters,
  onFiltersChange,
  rateCount,
}: MapFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3 transition-colors hover:bg-neutral-100"
      >
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="font-semibold text-neutral-900">Filters</span>
          <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-700">
            {rateCount}
          </span>
        </div>
        <svg
          className={`h-5 w-5 text-neutral-600 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Filter Content */}
      {isExpanded && (
        <div className="space-y-4 p-4">
          {/* Radius Slider */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Search Radius: {filters.radius} miles
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={filters.radius}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  radius: parseFloat(e.target.value),
                })
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200"
              style={{
                background: `linear-gradient(to right, #171717 0%, #171717 ${((filters.radius - 0.5) / 4.5) * 100}%, #e5e5e5 ${((filters.radius - 0.5) / 4.5) * 100}%, #e5e5e5 100%)`,
              }}
            />
            <div className="mt-1 flex justify-between text-xs text-neutral-500">
              <span>0.5 mi</span>
              <span>5 mi</span>
            </div>
          </div>

          {/* Bedrooms Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Bedrooms
            </label>
            <div className="flex flex-wrap gap-2">
              {[null, 1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num === null ? 'any' : num}
                  onClick={() =>
                    onFiltersChange({ ...filters, bedrooms: num })
                  }
                  className={`flex-1 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors ${
                    filters.bedrooms === num
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  {num === null ? 'Any' : num}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Bathrooms
            </label>
            <div className="flex flex-wrap gap-2">
              {[null, 1, 1.5, 2, 2.5, 3].map((num) => (
                <button
                  key={num === null ? 'any' : num}
                  onClick={() =>
                    onFiltersChange({ ...filters, bathrooms: num })
                  }
                  className={`flex-1 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors ${
                    filters.bathrooms === num
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  {num === null ? 'Any' : num}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() =>
              onFiltersChange({
                radius: 2.0,
                bedrooms: null,
                bathrooms: null,
              })
            }
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
