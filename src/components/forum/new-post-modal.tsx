'use client';

import { useEffect } from 'react';
import NewPostForm from '@/components/forum/new-post-form';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewPostModal({ isOpen, onClose }: NewPostModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow || '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-post-modal-title"
    >
      <div
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-[1001] w-full max-w-4xl overflow-hidden rounded-3xl border border-neutral-200 bg-white/95 shadow-2xl backdrop-blur">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 bg-neutral-50/80 px-6 py-5">
          <div>
            <h2
              id="new-post-modal-title"
              className="text-xl font-semibold text-neutral-900"
            >
              Make a post
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Share the specifics so the community can chime in quickly.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-transparent bg-white px-3 py-2 text-sm font-medium text-neutral-600 shadow-sm transition hover:border-neutral-200 hover:text-neutral-900"
            aria-label="Close"
          >
            Close
          </button>
        </header>

        <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
          <NewPostForm onCancel={onClose} />
        </div>
      </div>
    </div>
  );
}
