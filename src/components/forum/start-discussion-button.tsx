'use client';

import { useCallback, useState } from 'react';
import NewPostModal from '@/components/forum/new-post-modal';

type ButtonVariant = 'solid' | 'outline';

interface StartDiscussionButtonProps {
  label?: string;
  variant?: ButtonVariant;
  className?: string;
}

const baseButtonClasses =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const variantClasses: Record<ButtonVariant, string> = {
  solid: `${baseButtonClasses} bg-neutral-900 text-white shadow-sm hover:bg-neutral-800`,
  outline: `${baseButtonClasses} border border-neutral-300 bg-white text-neutral-900 shadow-sm hover:border-neutral-400 hover:bg-neutral-50`,
};

export default function StartDiscussionButton({
  label = 'Make a post',
  variant = 'outline',
  className = '',
}: StartDiscussionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const buttonClassName = `${variantClasses[variant]} ${className}`.trim();

  return (
    <>
      <button type="button" onClick={openModal} className={buttonClassName}>
        {label}
      </button>
      <NewPostModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
