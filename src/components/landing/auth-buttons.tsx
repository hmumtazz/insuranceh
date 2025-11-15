'use client';

export default function AuthButtons() {
  const openAuthModal = (mode: 'signin' | 'signup') => {
    window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode } }));
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => openAuthModal('signin')}
        className="cursor-pointer rounded-full border border-white/40 bg-white/30 px-4 py-2 text-sm font-medium text-neutral-700 backdrop-blur-xl transition hover:bg-white/40 hover:text-neutral-900 transform transition-transform hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md hover:shadow-black/10"
      >
        Log In
      </button>

      <button
        onClick={() => openAuthModal('signup')}
        className="cursor-pointer rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black transform transition-transform hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md hover:shadow-black/20"
      >
        Sign Up
      </button>
    </div>
  );
}
