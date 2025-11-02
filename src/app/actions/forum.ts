'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to create a post' };
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const imageUrls = formData.get('imageUrls') as string;

  if (!title || !content || !category) {
    return { error: 'Title, content, and category are required' };
  }

  if (title.length < 5 || title.length > 200) {
    return { error: 'Title must be between 5 and 200 characters' };
  }

  if (content.length < 10) {
    return { error: 'Content must be at least 10 characters' };
  }

  const { data: post, error } = await supabase
    .from('forum_posts')
    .insert({
      user_id: user.id,
      title,
      content,
      category,
      image_urls: imageUrls ? JSON.parse(imageUrls) : [],
      last_activity_at: new Date().toISOString(),
    })
    .select('id, slug')
    .single();

  if (error) {
    console.error('Failed to create post:', error);
    return { error: error.message || 'Failed to create post. Please try again.' };
  }

  if (!post.slug) {
    console.error('Slug not generated for post:', post.id);
    return { error: 'Failed to generate post URL. Please try again.' };
  }

  revalidatePath('/forum');
  redirect(`/forum/${post.slug}`);
}

export async function createReply(
  parentPostId: string,
  content: string,
  imageUrls?: string[]
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to reply' };
  }

  if (!content || content.length < 1) {
    return { error: 'Reply content is required' };
  }

  const { data: reply, error } = await supabase
    .from('forum_posts')
    .insert({
      user_id: user.id,
      parent_post_id: parentPostId,
      title: '', // Replies don't need titles
      content,
      image_urls: imageUrls || [],
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create reply:', error);
    return { error: 'Failed to create reply. Please try again.' };
  }

  revalidatePath('/forum');
  return { success: true, reply };
}

export async function updatePost(postId: string, content: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to edit posts' };
  }

  // Check if user owns the post
  const { data: post } = await supabase
    .from('forum_posts')
    .select('user_id')
    .eq('id', postId)
    .single();

  if (!post || post.user_id !== user.id) {
    return { error: 'You can only edit your own posts' };
  }

  const { error } = await supabase
    .from('forum_posts')
    .update({
      content,
      is_edited: true,
      edited_at: new Date().toISOString(),
    })
    .eq('id', postId);

  if (error) {
    console.error('Failed to update post:', error);
    return { error: 'Failed to update post. Please try again.' };
  }

  revalidatePath('/forum');
  return { success: true };
}

export async function deletePost(postId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to delete posts' };
  }

  // Get user profile to check if admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const isAdmin = profile?.role === 'admin';

  // Check if user owns the post or is admin
  const { data: post } = await supabase
    .from('forum_posts')
    .select('user_id, parent_post_id')
    .eq('id', postId)
    .single();

  if (!post) {
    return { error: 'Post not found' };
  }

  // Allow deletion if user owns the post OR is an admin
  if (post.user_id !== user.id && !isAdmin) {
    return { error: 'You can only delete your own posts' };
  }

  const { error } = await supabase.from('forum_posts').delete().eq('id', postId);

  if (error) {
    console.error('Failed to delete post:', error);
    return { error: 'Failed to delete post. Please try again.' };
  }

  revalidatePath('/forum');

  // If it's a reply, stay on the parent post page
  if (post.parent_post_id) {
    return { success: true };
  }

  // If it's a main post, redirect to forum index
  redirect('/forum');
}

export async function voteOnPost(postId: string, voteType: 'up' | 'down') {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to vote' };
  }

  // Check if user already voted
  const { data: existingVote } = await supabase
    .from('forum_votes')
    .select('*')
    .eq('user_id', user.id)
    .eq('post_id', postId)
    .maybeSingle();

  if (existingVote) {
    // If same vote type, remove vote (toggle off)
    if (existingVote.vote_type === voteType) {
      const { error } = await supabase
        .from('forum_votes')
        .delete()
        .eq('id', existingVote.id);

      if (error) {
        return { error: 'Failed to remove vote' };
      }

      // Update vote counts
      const columnToDecrement = voteType === 'up' ? 'upvotes' : 'downvotes';
      await supabase.rpc('decrement_vote', {
        post_id: postId,
        vote_column: columnToDecrement,
      });

      revalidatePath('/forum');
      return { success: true, action: 'removed' };
    }

    // If different vote type, update the vote
    const { error } = await supabase
      .from('forum_votes')
      .update({ vote_type: voteType })
      .eq('id', existingVote.id);

    if (error) {
      return { error: 'Failed to update vote' };
    }

    // Update vote counts (decrement old, increment new)
    const oldColumn = existingVote.vote_type === 'up' ? 'upvotes' : 'downvotes';
    const newColumn = voteType === 'up' ? 'upvotes' : 'downvotes';

    await supabase.rpc('decrement_vote', {
      post_id: postId,
      vote_column: oldColumn,
    });
    await supabase.rpc('increment_vote', {
      post_id: postId,
      vote_column: newColumn,
    });

    revalidatePath('/forum');
    return { success: true, action: 'updated' };
  }

  // Create new vote
  const { error } = await supabase.from('forum_votes').insert({
    user_id: user.id,
    post_id: postId,
    vote_type: voteType,
  });

  if (error) {
    console.error('Failed to vote:', error);
    return { error: 'Failed to vote. Please try again.' };
  }

  // Update vote count
  const columnToIncrement = voteType === 'up' ? 'upvotes' : 'downvotes';
  await supabase.rpc('increment_vote', {
    post_id: postId,
    vote_column: columnToIncrement,
  });

  revalidatePath('/forum');
  return { success: true, action: 'added' };
}

export async function incrementViewCount(postId: string) {
  const supabase = await createClient();

  // Use RPC to increment view count
  await supabase.rpc('increment_view_count', { post_id: postId });
}

export async function uploadForumImage(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to upload images' };
  }

  const file = formData.get('file') as File;

  if (!file) {
    return { error: 'No file provided' };
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return { error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' };
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'File size must be less than 5MB' };
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('forum-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Failed to upload image:', error);
    return { error: 'Failed to upload image. Please try again.' };
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from('forum-images').getPublicUrl(data.path);

  return { success: true, url: publicUrl };
}
