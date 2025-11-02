'use client';

import { useState } from 'react';
import { deletePost } from '@/app/actions/forum';
import { useRouter } from 'next/navigation';

interface UserPostActionsProps {
  postId: string;
  postSlug: string | null;
  isMainPost: boolean;
}

export default function UserPostActions({
  postId,
  postSlug,
  isMainPost,
}: UserPostActionsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsDeleting(true);
    const result = await deletePost(postId);

    if (result?.error) {
      alert(result.error);
      setIsDeleting(false);
    } else {
      router.refresh();
    }
  }

  return (
    <div className="flex items-center gap-2">
      {isMainPost && postSlug && (
        <a
          href={`/forum/${postSlug}`}
          className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50"
        >
          View
        </a>
      )}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-50"
      >
        Delete
      </button>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold text-neutral-900">
              Delete {isMainPost ? 'Post' : 'Reply'}
            </h3>
            <p className="mt-2 text-neutral-600">
              Are you sure you want to delete this {isMainPost ? 'post' : 'reply'}? This
              action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="flex-1 rounded-lg border-2 border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
