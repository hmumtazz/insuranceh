'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

interface DocumentUploadProps {
  userId: string;
  onUploadComplete: (url: string) => void;
  onUploadError: (error: string) => void;
}

export default function DocumentUpload({
  userId,
  onUploadComplete,
  onUploadError,
}: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      onUploadError('Please upload a JPG, PNG, or PDF file');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10485760) {
      onUploadError('File size must be less than 10MB');
      return;
    }

    setFileName(file.name);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    // Upload file
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('verification-documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage
        .from('verification-documents')
        .getPublicUrl(data.path);

      onUploadComplete(data.path);
    } catch (error: any) {
      console.error('Upload error:', error);
      onUploadError(error.message || 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-6 text-center transition-colors hover:border-neutral-400">
        {!preview && !fileName ? (
          <div>
            <svg
              className="mx-auto h-12 w-12 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div className="mt-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Choose File
              </label>
              <input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileSelect}
                disabled={uploading}
              />
            </div>
            <p className="mt-2 text-xs text-neutral-600">
              Upload your insurance policy document (JPG, PNG, or PDF, max 10MB)
            </p>
          </div>
        ) : (
          <div>
            {preview ? (
              <img
                src={preview}
                alt="Document preview"
                className="mx-auto h-32 w-auto rounded-lg object-contain"
              />
            ) : (
              <div className="flex items-center justify-center">
                <svg
                  className="h-12 w-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            <p className="mt-2 text-sm font-medium text-neutral-900">
              {fileName}
            </p>
            {!uploading && (
              <button
                onClick={handleRemove}
                className="mt-2 text-sm text-red-600 transition-colors hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        )}

        {uploading && (
          <div className="mt-4">
            <div className="mx-auto h-2 w-48 overflow-hidden rounded-full bg-neutral-200">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-neutral-900"></div>
            </div>
            <p className="mt-2 text-sm text-neutral-600">Uploading...</p>
          </div>
        )}
      </div>

      <div className="rounded-lg bg-blue-50 p-4">
        <div className="flex gap-3">
          <svg
            className="h-5 w-5 flex-shrink-0 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-blue-900">
            <p className="font-semibold">Why verify your rate?</p>
            <ul className="mt-1 list-inside list-disc space-y-1 text-blue-800">
              <li>Get a verified badge on your submission</li>
              <li>Help others make informed decisions</li>
              <li>Build trust in the community</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
