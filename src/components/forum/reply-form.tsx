'use client';

import { createReply } from '@/app/actions/forum';
import { useState } from 'react';
import Button from '@/components/ui/button';

interface ReplyFormProps {
  postId: string;
}

export default function ReplyForm({ postId }: ReplyFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    const result = await createReply(postId, content);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setContent('');
      setLoading(false);
      window.location.reload();
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-bold text-neutral-900">Add a Reply</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          rows={4}
          className="w-full rounded-lg border-2 border-neutral-300 bg-neutral-50 px-4 py-3 text-neutral-900 placeholder-neutral-500 transition-colors focus:border-neutral-900 focus:bg-white focus:outline-none"
        />

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={loading || !content.trim()}>
            {loading ? 'Posting...' : 'Post Reply'}
          </Button>
        </div>
      </form>
    </div>
  );
}
