'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitRate } from '@/app/actions/rates';
import AddressAutocomplete from './address-autocomplete';

interface RateSubmissionFormProps {
  userId: string;
}

interface AddressData {
  fullAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

export default function RateSubmissionForm({ userId }: RateSubmissionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addressData, setAddressData] = useState<AddressData | null>(null);

  const [formData, setFormData] = useState({
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2000,
    yearBuilt: 2010,
    homeType: 'single_family' as 'single_family' | 'townhouse' | 'condo' | 'multi_family',
    monthlyPremium: 0,
    annualPremium: 0,
    coverageAmount: 250000,
    deductible: 1000,
    insuranceProvider: '',
  });

  const handleAddressSelect = (address: AddressData) => {
    setAddressData(address);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!addressData) {
      setError('Please select an address');
      return;
    }

    if (!formData.monthlyPremium && !formData.annualPremium) {
      setError('Please enter either monthly or annual premium');
      return;
    }

    setLoading(true);
    setError(null);


    const monthlyPremium = formData.monthlyPremium || formData.annualPremium / 12;
    const annualPremium = formData.annualPremium || formData.monthlyPremium * 12;

    const result = await submitRate({
      userId,
      ...addressData,
      ...formData,
      monthlyPremium,
      annualPremium,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/rates/map');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Address Section */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-neutral-900">
          Property Address
        </h2>
        <AddressAutocomplete onAddressSelect={handleAddressSelect} />
      </div>

      {/* Home Details Section */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-neutral-900">
          Home Details
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Bedrooms
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.bedrooms}
              onChange={(e) =>
                setFormData({ ...formData, bedrooms: parseInt(e.target.value) })
              }
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-neutral-900 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Bathrooms
            </label>
            <input
              type="number"
              min="1"
              max="10"
              step="0.5"
              value={formData.bathrooms}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bathrooms: parseFloat(e.target.value),
                })
              }
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-neutral-900 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Square Feet
            </label>
            <input
              type="number"
              min="500"
              max="20000"
              value={formData.squareFeet}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  squareFeet: parseInt(e.target.value),
                })
              }
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-neutral-900 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Year Built
            </label>
            <input
              type="number"
              min="1800"
              max={new Date().getFullYear()}
              value={formData.yearBuilt}
              onChange={(e) =>
                setFormData({ ...formData, yearBuilt: parseInt(e.target.value) })
              }
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-neutral-900 focus:outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Home Type
            </label>
            <select
              value={formData.homeType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  homeType: e.target.value as typeof formData.homeType,
                })
              }
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-neutral-900 focus:outline-none"
              required
            >
              <option value="single_family">Single Family</option>
              <option value="townhouse">Townhouse</option>
              <option value="condo">Condo</option>
              <option value="multi_family">Multi-Family</option>
            </select>
          </div>
        </div>
      </div>

      {/* Insurance Details Section */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-neutral-900">
          Insurance Information
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Monthly Premium ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.monthlyPremium === 0 ? '' : formData.monthlyPremium}
              onChange={(e) => {
                const monthly = e.target.value === '' ? 0 : parseFloat(e.target.value);
                setFormData({
                  ...formData,
                  monthlyPremium: monthly,
                  annualPremium: monthly > 0 ? monthly * 12 : 0,
                });
              }}
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-neutral-900 focus:outline-none"
              placeholder="150.00"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Annual Premium ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.annualPremium === 0 ? '' : formData.annualPremium}
              onChange={(e) => {
                const annual = e.target.value === '' ? 0 : parseFloat(e.target.value);
                setFormData({
                  ...formData,
                  annualPremium: annual,
                  monthlyPremium: annual > 0 ? annual / 12 : 0,
                });
              }}
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-neutral-900 focus:outline-none"
              placeholder="1800.00"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Enter either monthly or annual - we&apos;ll calculate the other
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Coverage Amount ($)
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={formData.coverageAmount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  coverageAmount: parseInt(e.target.value),
                })
              }
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-neutral-900 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Deductible ($)
            </label>
            <input
              type="number"
              min="0"
              step="100"
              value={formData.deductible}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deductible: parseInt(e.target.value),
                })
              }
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-neutral-900 focus:outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Insurance Provider
            </label>
            <input
              type="text"
              value={formData.insuranceProvider}
              onChange={(e) =>
                setFormData({ ...formData, insuranceProvider: e.target.value })
              }
              className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-neutral-900 focus:outline-none"
              placeholder="State Farm, Allstate, etc."
              required
            />
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="rounded-lg bg-blue-50 p-4">
        <div className="flex gap-3">
          <svg
            className="h-5 w-5 flex-shrink-0 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm text-blue-900">
            <p className="font-semibold">Privacy Protection</p>
            <p className="mt-1 text-blue-800">
              Your exact address will not be shown publicly. We&apos;ll display an
              approximate location within 100-300 meters of your property to
              protect your privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading || !addressData}
          className="flex-1 rounded-lg bg-neutral-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Rate'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-neutral-300 px-6 py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
