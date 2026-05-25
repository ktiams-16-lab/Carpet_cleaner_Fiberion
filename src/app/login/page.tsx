import { Suspense } from 'react';
import LoginPage from '../../views/auth/LoginPage';

export default function LoginRoute() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-black text-white">
          <div className="fiberion-panel p-6 text-sm text-sky">Loading Fiberion Surface Care...</div>
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
