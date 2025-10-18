'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

interface ProfileCompletionData {
  firstName: string;
  lastName: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  phone: string;
  username: string;
  isAnonymous: boolean;
}

export async function completeProfile(data: ProfileCompletionData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  if (!data.firstName || !data.lastName || !data.birthMonth || !data.birthDay || !data.birthYear || !data.phone || !data.username) {
    return { error: 'All fields are required' };
  }

  if (data.username.length < 3 || data.username.length > 20) {
    return { error: 'Username must be between 3 and 20 characters' };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
    return {
      error: 'Username can only contain letters, numbers, and underscores',
    };
  }

  // Validate phone number (should be 10 digits after removing formatting)
  const cleanedPhone = data.phone.replace(/\D/g, '');
  if (cleanedPhone.length !== 10) {
    return { error: 'Please enter a valid 10-digit US phone number' };
  }

  // Validate date of birth
  const birthDate = new Date(
    parseInt(data.birthYear),
    parseInt(data.birthMonth) - 1,
    parseInt(data.birthDay)
  );

  const age = calculateAge(birthDate);
  if (age < 18) {
    return { error: 'You must be at least 18 years old to use this service' };
  }

  const { data: existingUsername } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', data.username)
    .neq('id', user.id)
    .maybeSingle();

  if (existingUsername) {
    return { error: 'Username is already taken' };
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      full_name: `${data.firstName} ${data.lastName}`,
      birth_month: parseInt(data.birthMonth),
      birth_day: parseInt(data.birthDay),
      birth_year: parseInt(data.birthYear),
      phone: data.phone,
      username: data.username,
      is_anonymous: data.isAnonymous,
      onboarding_completed: true,
    })
    .eq('id', user.id);

  if (updateError) {
    console.error('Profile update error:', updateError);
    return { error: 'Failed to update profile. Please try again.' };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
