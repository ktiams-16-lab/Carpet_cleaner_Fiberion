import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AuthProvider } from '../store/auth';
import '../index.css';

export const metadata: Metadata = {
  title: 'FIBERION Surface Care',
  description:
    'Premium residential and commercial carpet cleaning for Downtown Orlando and surrounding areas.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
