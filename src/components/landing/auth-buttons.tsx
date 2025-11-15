'use client';

export default function AuthButtons() {
  const openAuthModal = (mode: 'signin' | 'signup') => {
    window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode } }));
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => openAuthModal('signin')}
        className="rounded-full md:rounded-2xl border border-white/40 bg-white/30 px-4 md:px-5 py-1.5 text-xs md:text-sm font-medium text-neutral-700 backdrop-blur-xl transition hover:bg-white/40 hover:text-neutral-900"
      >
        Log In
      </button>
      <button
        onClick={() => openAuthModal('signup')}
        className="rounded-full md:rounded-2xl bg-neutral-900 px-4 md:px-5 py-1.5 text-xs md:text-sm font-semibold text-white transition hover:bg-black"
      >
        Sign Up
      </button>
    </div>
  );
}
