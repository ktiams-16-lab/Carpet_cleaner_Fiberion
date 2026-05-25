import { FormEvent, useState } from 'react';
import { Lock } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';
import { FiberionMark } from '../../components/Brand';
import { useAuth } from '../../store/auth';

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const [error, setError] = useState('');
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const ok = login(String(formData.get('email') ?? ''), String(formData.get('password') ?? ''));
    if (!ok) setError('Enter an email and password to use the mock admin session.');
  }

  if (isAuthenticated) return <Navigate to={from} replace />;

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,rgba(0,119,200,0.22),transparent_28rem),linear-gradient(135deg,#0B1D34_0%,#020509_55%,#000000_100%)] p-4">
      <form className="fiberion-panel w-full max-w-md p-6 sm:p-8" onSubmit={handleLogin}>
        <div className="mb-8">
          <FiberionMark />
          <h1 className="mt-8 text-3xl font-bold text-white">Admin login</h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Private operations access. Mock authentication is active and ready to swap for Supabase Auth.
          </p>
        </div>
        <label className="mb-4 block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gray-400">Email</span>
          <input className="fiberion-input min-h-12" name="email" type="email" />
        </label>
        <label className="mb-6 block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gray-400">Password</span>
          <input className="fiberion-input min-h-12" name="password" type="password" />
        </label>
        <button className="fiberion-button min-h-12 w-full justify-center" type="submit">
          <Lock className="h-4 w-4" />
          Log in
        </button>
        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      </form>
    </main>
  );
}
