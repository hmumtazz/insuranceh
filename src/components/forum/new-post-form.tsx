'use client';

import Button from '@/components/ui/button';
import { createPost, uploadForumImage } from '@/app/actions/forum';
import { FORUM_CATEGORIES } from '@/lib/forum/constants';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface NewPostFormProps {
  onCancel?: () => void;
}

export default function NewPostForm({ onCancel }: NewPostFormProps = {}) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < Math.min(files.length, 5 - images.length); i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const result = await uploadForumImage(formData);

        if (result?.error) {
          setError(result.error);
          break;
        } else if (result?.url) {
          uploadedUrls.push(result.url);
        }
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      setError('Failed to upload images');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (images.length > 0) {
      formData.append('imageUrls', JSON.stringify(images));
    }

    const result = await createPost(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  function handleCancel() {
    if (loading) return;
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white/95 p-8 shadow-lg backdrop-blur">
        <div className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-900">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm transition focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400/60"
            >
              <option value="">Select a category</option>
              {FORUM_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-900">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your post about?"
              required
              minLength={5}
              maxLength={200}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm transition placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400/60"
            />
            <p className="mt-1 text-xs text-neutral-500">
              {title.length}/200 characters
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-900">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts in detail..."
              rows={10}
              required
              minLength={10}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm transition placeholder:text-neutral-500 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400/60"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Minimum 10 characters
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-900">
              Images (Optional)
            </label>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading || images.length >= 5}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || images.length >= 5}
                  className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm transition hover:border-neutral-400 hover:bg-neutral-50 disabled:opacity-60"
                >
                  {uploading ? 'Uploading...' : 'Add Images'}
                </Button>
                <p className="text-xs text-neutral-500">
                  {images.length}/5 images • Max 5MB each • JPEG, PNG, GIF,
                  WebP
                </p>
              </div>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {images.map((url, index) => (
                    <div key={index} className="group relative">
                      <img
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="h-48 w-full rounded-lg border border-neutral-200 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 rounded-full bg-neutral-900/80 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={loading}
          className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:border-neutral-400 hover:bg-neutral-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading || !title || !content || !category}
          className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800"
        >
          {loading ? 'Publishing...' : 'Publish Post'}
        </Button>
      </div>
    </form>
  );
}
