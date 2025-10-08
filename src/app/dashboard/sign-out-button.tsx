'use client';

import { signOut } from '@/app/actions/auth';

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
      >
        Sign out
      </button>
    </form>
  );
}
