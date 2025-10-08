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

    setStep((prev) => prev + 1);
  }

  function handleBack() {
    setError(null);
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      <div className="w-full max-w-2xl space-y-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Complete your profile
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Step {step} of 3 - Help us get to know you
          </p>
        </div>

        <div className="flex items-center justify-between">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-1 items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  i <= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                } font-semibold`}
              >
                {i}
              </div>
              {i < 3 && (
                <div
                  className={`mx-2 h-1 flex-1 ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Basic Information
            </h2>

            <Input
              label="Full Name"
              name="displayName"
              type="text"
              placeholder="John Doe"
              required
              value={formData.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
            />

            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={(e) =>
                handleInputChange('dateOfBirth', e.target.value)
              }
              helperText="You must be at least 18 years old"
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              required
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              helperText="US phone number required"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Choose Your Username
            </h2>

            <Input
              label="Username"
              name="username"
              type="text"
              placeholder="Choose a unique username"
              required
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              helperText="3-20 characters, letters, numbers, and underscores only"
              error={
                usernameAvailable === false
                  ? 'Username is already taken'
                  : undefined
              }
            />

            {checkingUsername && (
              <p className="text-sm text-gray-500">Checking availability...</p>
            )}

            {usernameAvailable === true && (
              <p className="text-sm text-green-600">
                ✓ Username is available!
              </p>
            )}

            {suggestions.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Suggestions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleInputChange('username', suggestion)}
                      className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Privacy Preferences
            </h2>

            <div className="rounded-lg border border-gray-200 p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={(e) =>
                    handleInputChange('isAnonymous', e.target.checked)
                  }
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <label
                    htmlFor="isAnonymous"
                    className="font-medium text-gray-900"
                  >
                    Keep my profile anonymous
                  </label>
                  <p className="mt-1 text-sm text-gray-600">
                    When enabled, only your username will be visible to other
                    users. Your real name and contact information will remain
                    private.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-900">
                Your Privacy Matters
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-blue-800">
                <li>✓ We never share your personal information</li>
                <li>✓ Your data is encrypted and secure</li>
                <li>✓ You control what others can see</li>
                <li>✓ You can change these settings anytime</li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4 font-semibold text-gray-900">
                Profile Summary
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Name:</dt>
                  <dd className="font-medium text-gray-900">
                    {formData.displayName}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Username:</dt>
                  <dd className="font-medium text-gray-900">
                    @{formData.username}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Phone:</dt>
                  <dd className="font-medium text-gray-900">
                    {formData.phone}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Privacy:</dt>
                  <dd className="font-medium text-gray-900">
                    {formData.isAnonymous ? 'Anonymous' : 'Public'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
            <div className="flex">
              <svg
                className="h-5 w-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-3">{error}</span>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} fullWidth>
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={handleNext} fullWidth>
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              fullWidth
            >
              {loading ? 'Completing profile...' : 'Complete Profile'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
