import Link from 'next/link';
import { signUpAction } from '@/app/actions/auth';

type SignUpPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function SignUpPage({
  searchParams,
}: SignUpPageProps) {
  const params = await searchParams;

  let errorMessage = '';

  if (params.error === 'invalid-fields') {
    errorMessage =
      'Enter a valid email, a name of at least 2 characters, and a password of at least 8 characters.';
  } else if (params.error === 'signup-failed') {
    errorMessage =
      'We could not create your account. Check your details and try again.';
  }

  return (
    <main className="mx-auto my-12 w-full max-w-md px-4">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Create your account
        </h1>

        <p className="mt-2 text-gray-600">
          Join Addis Eats and order your favorite meals.
        </p>

        {errorMessage && (
          <div
            role="alert"
            className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {errorMessage}
          </div>
        )}

        {params.message === 'check-email' && (
          <div
            role="status"
            className="mt-5 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800"
          >
            Account registration was submitted. If email
            confirmation is enabled, check your inbox and follow
            the verification link before signing in.
          </div>
        )}

        <form action={signUpAction} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Full name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              minLength={2}
              maxLength={80}
              required
              className="w-full rounded-lg border px-3 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border px-3 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-lg border px-3 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="At least 8 characters"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-semibold text-emerald-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}