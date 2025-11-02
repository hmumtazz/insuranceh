'use client';

import { completeProfile } from '@/app/actions/profile';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useState, useEffect } from 'react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const [formData, setFormData] = useState({
    displayName: '',
    dateOfBirth: '',
    phone: '',
    username: '',
    isAnonymous: true,
  });

  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null
  );
  const [checkingUsername, setCheckingUsername] = useState(false);

  useEffect(() => {
    fetchUsernameSuggestions();
  }, []);

  async function fetchUsernameSuggestions() {
    try {
      const response = await fetch('/api/username/suggestions');
      const data = await response.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch (err) {
      console.error('Failed to fetch username suggestions:', err);
    }
  }

  async function checkUsername(username: string) {
    if (username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    setCheckingUsername(true);
    try {
      const response = await fetch('/api/username/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      setUsernameAvailable(data.available);
      if (data.error) {
        setError(data.error);
      } else {
        setError(null);
      }
    } catch (err) {
      console.error('Username check failed:', err);
      setUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  }

  function handleInputChange(field: string, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'username' && typeof value === 'string') {
      checkUsername(value);
    }
  }

  function handleNext() {
    setError(null);

    if (step === 1) {
      if (!formData.displayName || !formData.dateOfBirth || !formData.phone) {
        setError('Please fill in all required fields');
        return;
      }

      const age = calculateAge(new Date(formData.dateOfBirth));
      if (age < 18) {
        setError('You must be at least 18 years old to use this service');
        return;
      }

      const phoneRegex = /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
      if (!phoneRegex.test(formData.phone)) {
        setError('Please enter a valid US phone number');
        return;
      }
    }

    if (step === 2) {
      if (!formData.username) {
        setError('Please choose a username');
        return;
      }
      if (usernameAvailable === false) {
        setError('Username is not available');
        return;
      }
    }

    setDirection('forward');
    setStep((prev) => prev + 1);
  }

  function handleBack() {
    setError(null);
    setDirection('backward');
    setStep((prev) => prev - 1);
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    const result = await completeProfile(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
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

  return (
    <div className="flex min-h-screen items-center justify-center p-4" style={{ backgroundColor: '#e9e9e9' }}>
      <div className="w-full max-w-2xl">
        {/* Header with Progress */}
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900">
              <span className="text-lg font-bold text-white">R</span>
            </div>
            <span className="text-xl font-bold text-neutral-900">RateNextDoor</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-neutral-900">
            Complete your profile
          </h1>
          <p className="mt-2 text-neutral-600">
            Step {step} of 3
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all duration-300 ${
                  i < step
                    ? 'bg-green-500 text-white'
                    : i === step
                      ? 'bg-neutral-900 text-white ring-4 ring-neutral-900/20'
                      : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                {i < step ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i
                )}
              </div>
              {i < 3 && (
                <div
                  className={`mx-2 h-1 w-16 rounded-full transition-all duration-300 ${
                    i < step ? 'bg-green-500' : 'bg-neutral-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
          <div className="p-8">
            {/* Step 1 - Basic Information */}
            {step === 1 && (
              <div
                key="step1"
                className={`space-y-6 ${
                  direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft'
                }`}
              >
                <h2 className="text-2xl font-bold text-neutral-900">
                  Basic Information
                </h2>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                    FULL NAME (*)
                  </label>
                  <Input
                    name="displayName"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    className="border-neutral-300 bg-neutral-50 text-neutral-900"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                    DATE OF BIRTH (*)
                  </label>
                  <Input
                    name="dateOfBirth"
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="border-neutral-300 bg-neutral-50 text-neutral-900"
                  />
                  <p className="mt-1 text-xs text-neutral-500">
                    You must be at least 18 years old
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                    PHONE NUMBER (*)
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="border-neutral-300 bg-neutral-50 text-neutral-900"
                  />
                  <p className="mt-1 text-xs text-neutral-500">
                    US phone number required
                  </p>
                </div>
              </div>
            )}

            {/* Step 2 - Username */}
            {step === 2 && (
              <div
                key="step2"
                className={`space-y-6 ${
                  direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft'
                }`}
              >
                <h2 className="text-2xl font-bold text-neutral-900">
                  Choose Your Username
                </h2>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-500">
                    USERNAME (*)
                  </label>
                  <Input
                    name="username"
                    type="text"
                    placeholder="Choose a unique username"
                    required
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className={`border-neutral-300 bg-neutral-50 text-neutral-900 ${
                      usernameAvailable === false ? 'border-red-500' : ''
                    } ${usernameAvailable === true ? 'border-green-500' : ''}`}
                  />
                  <p className="mt-1 text-xs text-neutral-500">
                    3-20 characters, letters, numbers, and underscores only
                  </p>

                  {checkingUsername && (
                    <p className="mt-2 text-sm text-neutral-600">
                      Checking availability...
                    </p>
                  )}

                  {usernameAvailable === true && (
                    <p className="mt-2 flex items-center gap-1 text-sm font-medium text-green-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Username is available!
                    </p>
                  )}

                  {usernameAvailable === false && (
                    <p className="mt-2 flex items-center gap-1 text-sm font-medium text-red-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Username is already taken
                    </p>
                  )}
                </div>

                {suggestions.length > 0 && (
                  <div>
                    <p className="mb-3 text-sm font-medium text-neutral-700">
                      Suggestions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => handleInputChange('username', suggestion)}
                          className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 transition-all hover:border-neutral-900 hover:bg-neutral-50"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3 - Privacy */}
            {step === 3 && (
              <div
                key="step3"
                className={`space-y-6 ${
                  direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft'
                }`}
              >
                <h2 className="text-2xl font-bold text-neutral-900">
                  Privacy Preferences
                </h2>

                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      id="isAnonymous"
                      checked={formData.isAnonymous}
                      onChange={(e) =>
                        handleInputChange('isAnonymous', e.target.checked)
                      }
                      className="mt-1 h-5 w-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                    />
                    <div>
                      <label
                        htmlFor="isAnonymous"
                        className="font-semibold text-neutral-900"
                      >
                        Keep my profile anonymous
                      </label>
                      <p className="mt-1 text-sm text-neutral-600">
                        When enabled, only your username will be visible to other
                        users. Your real name and contact information will remain
                        private.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-6">
                  <h3 className="mb-4 font-semibold text-neutral-900">
                    Profile Summary
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <dt className="text-neutral-600">Name:</dt>
                      <dd className="font-medium text-neutral-900">
                        {formData.displayName}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <dt className="text-neutral-600">Username:</dt>
                      <dd className="font-medium text-neutral-900">
                        @{formData.username}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <dt className="text-neutral-600">Phone:</dt>
                      <dd className="font-medium text-neutral-900">
                        {formData.phone}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-neutral-600">Privacy:</dt>
                      <dd className="font-medium text-neutral-900">
                        {formData.isAnonymous ? 'Anonymous' : 'Public'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-xl bg-neutral-50 p-6">
                  <h3 className="flex items-center gap-2 font-semibold text-neutral-900">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Your Privacy Matters
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      We never share your personal information
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Your data is encrypted and secure
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      You control what others can see
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      You can change these settings anytime
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-600">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex gap-4">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 border-neutral-300 text-neutral-900 hover:bg-neutral-50"
                >
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  {loading ? 'Completing profile...' : 'Complete Profile'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
