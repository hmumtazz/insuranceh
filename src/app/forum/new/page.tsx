import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import NewPostForm from '@/components/forum/new-post-form';

export default async function NewPostPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900">
          Create New Post
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Share your thoughts, questions, or insights with the community
        </p>
      </div>

      <NewPostForm />
    </div>
  );
}
