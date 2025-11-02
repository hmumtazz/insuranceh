'use client';

import { useState } from 'react';
import Link from 'next/link';
import { deleteRate } from '@/app/actions/rates';
import EditRateModal from './edit-rate-modal';

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
  is_verified: boolean;
  created_at: string;
  full_address: string;
  year_built: number;
  home_type: string;
  coverage_amount: number;
  deductible: number;
  insurance_provider: string;
}

interface RateSubmissionItemProps {
  submission: RateSubmission;
}

export default function RateSubmissionItem({
  submission,
}: RateSubmissionItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this rate submission? This action cannot be undone.'
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError('');

    const result = await deleteRate(submission.id);

    if (result.error) {
      setError(result.error);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-6 transition-all hover:border-neutral-300 hover:shadow-md">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h4 className="text-lg font-semibold text-neutral-900">
              {submission.street_address}
            </h4>
            {submission.is_verified && (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                Verified
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            {submission.city}, {submission.state} {submission.zip_code}
          </p>
          <div className="mt-3 flex items-center gap-6 text-sm">
            <div>
              <span className="text-neutral-600">Monthly: </span>
              <span className="font-semibold text-neutral-900">
                ${Math.round(submission.monthly_premium)}
              </span>
            </div>
            <div>
              <span className="text-neutral-600">Annual: </span>
              <span className="font-semibold text-neutral-900">
                ${Math.round(submission.annual_premium)}
              </span>
            </div>
            <div>
              <span className="text-neutral-600">
                {submission.num_bedrooms} bed, {submission.num_bathrooms} bath
              </span>
            </div>
            <div>
              <span className="text-neutral-600">
                {submission.square_footage?.toLocaleString()} sqft
              </span>
            </div>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            Submitted{' '}
            {new Date(submission.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <div className="ml-4 flex gap-2">
          <button
            onClick={() => setShowEditModal(true)}
            disabled={isDeleting}
            className="inline-flex items-center rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <Link
            href="/rates/map"
            className="inline-flex items-center rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            View on Map
          </Link>
        </div>
      </div>

      {showEditModal && (
        <EditRateModal
          submission={submission}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}
