import { signInAction } from '@/app/actions/auth';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const rawNext = params?.next || '/';
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/';

  return (
    <main style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Sign In</h1>
      <form action={signInAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="hidden" name="next" value={next} />
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="almaz@example.com or staff@addiseats.com"
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rom', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
    </main>
  );
}
