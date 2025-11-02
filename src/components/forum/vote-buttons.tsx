'use client';

import { voteOnPost } from '@/app/actions/forum';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VoteButtonsProps {
  postId: string;
  initialUpvotes: number;
  initialDownvotes: number;
  userId?: string | null;
}

export default function VoteButtons({
  postId,
  initialUpvotes,
  initialDownvotes,
  userId,
}: VoteButtonsProps) {
  const router = useRouter();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleVote(voteType: 'up' | 'down') {
    if (!userId) {
      router.push('/auth/signin');
      return;
    }

    if (loading) return;

    setLoading(true);

    // Optimistic update
    const previousUpvotes = upvotes;
    const previousDownvotes = downvotes;
    const previousUserVote = userVote;

    if (userVote === voteType) {
      // Remove vote
      if (voteType === 'up') {
        setUpvotes((prev) => prev - 1);
      } else {
        setDownvotes((prev) => prev - 1);
      }
      setUserVote(null);
    } else if (userVote) {
      // Change vote
      if (voteType === 'up') {
        setUpvotes((prev) => prev + 1);
        setDownvotes((prev) => prev - 1);
      } else {
        setUpvotes((prev) => prev - 1);
        setDownvotes((prev) => prev + 1);
      }
      setUserVote(voteType);
    } else {
      // New vote
      if (voteType === 'up') {
        setUpvotes((prev) => prev + 1);
      } else {
        setDownvotes((prev) => prev + 1);
      }
      setUserVote(voteType);
    }

    const result = await voteOnPost(postId, voteType);

    if (result?.error) {
      // Revert on error
      setUpvotes(previousUpvotes);
      setDownvotes(previousDownvotes);
      setUserVote(previousUserVote);
    }

    setLoading(false);
  }

  const score = upvotes - downvotes;

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={() => handleVote('up')}
        disabled={loading}
        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed ${
          userVote === 'up'
            ? 'bg-neutral-900 text-white'
            : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900'
        }`}
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
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      <span
        className={`text-sm font-semibold ${
          score > 0
            ? 'text-green-600'
            : score < 0
              ? 'text-red-600'
              : 'text-neutral-900'
        }`}
      >
        {score}
      </span>
      <button
        onClick={() => handleVote('down')}
        disabled={loading}
        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed ${
          userVote === 'down'
            ? 'bg-neutral-900 text-white'
            : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900'
        }`}
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
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
}
