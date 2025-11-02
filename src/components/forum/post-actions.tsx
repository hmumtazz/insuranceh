'use client';

import { deletePost, updatePost } from '@/app/actions/forum';
import { useState } from 'react';
import Button from '@/components/ui/button';

interface PostActionsProps {
  postId: string;
  content: string;
  isOwner?: boolean;
  isAdmin?: boolean;
}

export default function PostActions({
  postId,
  content,
  isOwner = true,
  isAdmin = false,
}: PostActionsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  async function handleEdit() {
    setLoading(true);
    const result = await updatePost(postId, editedContent);

    if (result?.error) {
      alert(result.error);
    } else {
      setIsEditing(false);
      window.location.reload();
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setLoading(true);
    const result = await deletePost(postId);

    if (result?.error) {
      alert(result.error);
      setLoading(false);
    }
  }

  if (isEditing) {
    return (
      <div className="mt-4 space-y-3">
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          rows={4}
          className="w-full rounded-lg border-2 border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-900 transition-colors focus:border-neutral-900 focus:bg-white focus:outline-none"
        />
        <div className="flex gap-2">
          <Button
            onClick={handleEdit}
            disabled={loading || editedContent === content}
            className="text-sm"
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsEditing(false);
              setEditedContent(content);
            }}
            disabled={loading}
            className="text-sm"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-10 z-20 w-40 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
            {isOwner && (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                Edit
              </button>
            )}
            {(isOwner || isAdmin) && (
              <button
                onClick={handleDelete}
                disabled={loading}
                className="w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Deleting...' : isAdmin && !isOwner ? 'Delete (Admin)' : 'Delete'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
