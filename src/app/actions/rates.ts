'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

interface RateSubmissionData {
  userId: string;
  fullAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  homeType: 'single_family' | 'townhouse' | 'condo' | 'multi_family';
  monthlyPremium: number;
  annualPremium: number;
  coverageAmount: number;
  deductible: number;
  insuranceProvider: string;
}

export async function submitRate(data: RateSubmissionData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== data.userId) {
    return { error: 'Unauthorized' };
  }

  // Insert rate submission
  const { data: submission, error } = await supabase
    .from('rate_submissions')
    .insert({
      user_id: data.userId,
      full_address: data.fullAddress,
      street_address: data.streetAddress,
      city: data.city,
      state: data.state,
      zip_code: data.zipCode,
      location: `POINT(${data.longitude} ${data.latitude})`,
      num_bedrooms: data.bedrooms,
      num_bathrooms: data.bathrooms,
      square_footage: data.squareFeet,
      year_built: data.yearBuilt,
      home_type: data.homeType,
      monthly_premium: data.monthlyPremium,
      annual_premium: data.annualPremium,
      coverage_amount: data.coverageAmount,
      deductible: data.deductible,
      insurance_provider: data.insuranceProvider,
      visible_to_public: true, // Default to public
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to submit rate:', error);
    return { error: error.message || 'Failed to submit rate. Please try again.' };
  }

  revalidatePath('/rates/map');

  return { success: true, submissionId: submission.id };
}

export async function updateRate(
  submissionId: string,
  data: Partial<RateSubmissionData>
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  // Verify the submission belongs to the user
  const { data: existing } = await supabase
    .from('rate_submissions')
    .select('user_id')
    .eq('id', submissionId)
    .single();

  if (!existing || existing.user_id !== user.id) {
    return { error: 'Unauthorized' };
  }

  const updateData: Record<string, string | number> = {};

  if (data.streetAddress !== undefined)
    updateData.street_address = data.streetAddress;
  if (data.city !== undefined) updateData.city = data.city;
  if (data.state !== undefined) updateData.state = data.state;
  if (data.zipCode !== undefined) updateData.zip_code = data.zipCode;
  if (data.fullAddress !== undefined)
    updateData.full_address = data.fullAddress;
  if (data.latitude !== undefined && data.longitude !== undefined) {
    updateData.location = `POINT(${data.longitude} ${data.latitude})`;
  }
  if (data.bedrooms !== undefined) updateData.num_bedrooms = data.bedrooms;
  if (data.bathrooms !== undefined) updateData.num_bathrooms = data.bathrooms;
  if (data.squareFeet !== undefined)
    updateData.square_footage = data.squareFeet;
  if (data.yearBuilt !== undefined) updateData.year_built = data.yearBuilt;
  if (data.homeType !== undefined) updateData.home_type = data.homeType;
  if (data.monthlyPremium !== undefined)
    updateData.monthly_premium = data.monthlyPremium;
  if (data.annualPremium !== undefined)
    updateData.annual_premium = data.annualPremium;
  if (data.coverageAmount !== undefined)
    updateData.coverage_amount = data.coverageAmount;
  if (data.deductible !== undefined) updateData.deductible = data.deductible;
  if (data.insuranceProvider !== undefined)
    updateData.insurance_provider = data.insuranceProvider;

  const { error } = await supabase
    .from('rate_submissions')
    .update(updateData)
    .eq('id', submissionId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  revalidatePath('/rates/map');
  return { success: true };
}

export async function deleteRate(submissionId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  // Verify the submission belongs to the user
  const { data: existing } = await supabase
    .from('rate_submissions')
    .select('user_id')
    .eq('id', submissionId)
    .single();

  if (!existing || existing.user_id !== user.id) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('rate_submissions')
    .delete()
    .eq('id', submissionId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  revalidatePath('/rates/map');
  return { success: true };
}
