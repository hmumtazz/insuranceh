import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const ADJECTIVES = [
  'Quick',
  'Silent',
  'Brave',
  'Calm',
  'Bold',
  'Smart',
  'Swift',
  'Wise',
  'Cool',
  'Happy',
  'Bright',
  'Noble',
  'Keen',
  'Clever',
  'Mighty',
  'Fresh',
  'Wild',
  'Free',
  'True',
  'Pure',
];

const NOUNS = [
  'Tiger',
  'Eagle',
  'Lion',
  'Wolf',
  'Bear',
  'Hawk',
  'Fox',
  'Owl',
  'Deer',
  'Puma',
  'Falcon',
  'Panther',
  'Lynx',
  'Raven',
  'Phoenix',
  'Dragon',
  'Shark',
  'Cobra',
  'Viper',
  'Otter',
];

async function generateUniqueSuggestion(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<string> {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const adjective =
      ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const number = Math.floor(Math.random() * 9000) + 1000;
    const suggestion = `${adjective}${noun}${number}`;

    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', suggestion)
      .maybeSingle();

    if (!data) {
      return suggestion;
    }

    attempts++;
  }

  return `User${Date.now()}`;
}

export async function GET() {
  try {
    const supabase = await createClient();

    const suggestions = await Promise.all([
      generateUniqueSuggestion(supabase),
      generateUniqueSuggestion(supabase),
      generateUniqueSuggestion(supabase),
    ]);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Username suggestions error:', error);
    return NextResponse.json(
      { error: 'Failed to generate username suggestions' },
      { status: 500 }
    );
  }
}
