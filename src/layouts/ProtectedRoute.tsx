'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../store/auth';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname() ?? '/dashboard';
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-black text-white">
        <div className="fiberion-panel p-6 text-sm text-sky">Loading Fiberion Surface Care...</div>
      </div>
    );
  }

  return <>{children}</>;
}
