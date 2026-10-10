import Link from 'next/link';
import { signInAction } from '@/app/actions/auth';

type SignInPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
    message?: string;
  }>;
};

function safeNextPath(value: string | undefined): string {
  if (
    !value ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\')
  ) {
    return '/';
  }

  return value;
}

export default async function SignInPage({
  searchParams,
}: SignInPageProps) {
  const params = await searchParams;

  const next = safeNextPath(params.next);

  let errorMessage = '';

  if (params.error === 'invalid-credentials') {
    errorMessage = 'Email or password is incorrect.';
  } else if (params.error === 'missing-fields') {
    errorMessage = 'Enter your email and password.';
  } else if (params.error === 'auth-callback') {
    errorMessage =
      'We could not verify your email. Please try again.';
  }

  return (
    <main className="mx-auto my-12 w-full max-w-md px-4">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back
        </h1>

        <p className="mt-2 text-gray-600">
          Sign in to continue ordering from Addis Eats.
        </p>

        {errorMessage && (
          <div
            role="alert"
            className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {errorMessage}
          </div>
        )}

        <form action={signInAction} className="mt-6 space-y-5">
          <input
            type="hidden"
            name="next"
            value={next}
          />

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
              autoComplete="current-password"
              minLength={8}
              required
              className="w-full rounded-lg border px-3 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold text-emerald-700 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}