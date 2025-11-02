'use client';

import { useState, useEffect } from 'react';
import { updateRate } from '@/app/actions/rates';
import AddressAutocomplete from '@/components/rates/address-autocomplete';

interface RateSubmission {
  id: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  num_bedrooms: number;
  num_bathrooms: number;
  square_footage: number;
  monthly_premium: number;
  annual_premium: number;
  full_address: string;
  year_built: number;
  home_type: string;
  coverage_amount: number;
  deductible: number;
  insurance_provider: string;
}

interface EditRateModalProps {
  submission: RateSubmission;
  onClose: () => void;
}

export default function EditRateModal({
  submission,
  onClose,
}: EditRateModalProps) {
  const [formData, setFormData] = useState({
    fullAddress: submission.full_address,
    streetAddress: submission.street_address,
    city: submission.city,
    state: submission.state,
    zipCode: submission.zip_code,
    latitude: 0,
    longitude: 0,
    bedrooms: submission.num_bedrooms,
    bathrooms: submission.num_bathrooms,
    squareFeet: submission.square_footage,
    yearBuilt: submission.year_built,
    homeType: submission.home_type as
      | 'single_family'
      | 'townhouse'
      | 'condo'
      | 'multi_family',
    monthlyPremium: submission.monthly_premium,
    annualPremium: submission.annual_premium,
    coverageAmount: submission.coverage_amount,
    deductible: submission.deductible,
    insuranceProvider: submission.insurance_provider,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAddressSelect = (address: {
    fullAddress: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  }) => {
    setFormData({
      ...formData,
      ...address,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const result = await updateRate(submission.id, formData);

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900">
            Edit Rate Submission
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 transition-colors hover:text-neutral-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Property Address
            </label>
            <AddressAutocomplete
              onAddressSelect={handleAddressSelect}
              initialValue={formData.fullAddress}
            />
          </div>

          {/* Home Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Bedrooms
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.bedrooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bedrooms: parseInt(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Bathrooms
              </label>
              <input
                type="number"
                required
                min="1"
                step="0.5"
                value={formData.bathrooms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bathrooms: parseFloat(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Square Feet
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.squareFeet}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    squareFeet: parseInt(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Year Built
              </label>
              <input
                type="number"
                required
                min="1800"
                max={new Date().getFullYear()}
                value={formData.yearBuilt}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    yearBuilt: parseInt(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Home Type
            </label>
            <select
              required
              value={formData.homeType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  homeType: e.target.value as
                    | 'single_family'
                    | 'townhouse'
                    | 'condo'
                    | 'multi_family',
                })
              }
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
            >
              <option value="single_family">Single Family</option>
              <option value="townhouse">Townhouse</option>
              <option value="condo">Condo</option>
              <option value="multi_family">Multi-Family</option>
            </select>
          </div>

          {/* Insurance Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Monthly Premium
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.monthlyPremium === 0 ? '' : formData.monthlyPremium}
                onChange={(e) => {
                  const monthly =
                    e.target.value === '' ? 0 : parseFloat(e.target.value);
                  setFormData({
                    ...formData,
                    monthlyPremium: monthly,
                    annualPremium: monthly > 0 ? monthly * 12 : 0,
                  });
                }}
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Annual Premium
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.annualPremium === 0 ? '' : formData.annualPremium}
                onChange={(e) => {
                  const annual =
                    e.target.value === '' ? 0 : parseFloat(e.target.value);
                  setFormData({
                    ...formData,
                    annualPremium: annual,
                    monthlyPremium: annual > 0 ? annual / 12 : 0,
                  });
                }}
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Coverage Amount
              </label>
              <input
                type="number"
                required
                min="0"
                step="1000"
                value={formData.coverageAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    coverageAmount: parseFloat(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Deductible
              </label>
              <input
                type="number"
                required
                min="0"
                step="100"
                value={formData.deductible}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deductible: parseFloat(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Insurance Provider
            </label>
            <input
              type="text"
              required
              value={formData.insuranceProvider}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  insuranceProvider: e.target.value,
                })
              }
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 rounded-lg border-2 border-neutral-300 bg-white px-6 py-3 text-base font-semibold text-neutral-900 transition-all hover:bg-neutral-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-neutral-900 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-neutral-800 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
