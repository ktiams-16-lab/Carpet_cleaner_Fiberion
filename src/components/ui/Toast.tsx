import { ReactNode } from 'react';

export function Toast({ children }: { children: ReactNode }) {
  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 rounded-2xl border border-electric/30 bg-navy/95 px-4 py-3 text-sm text-white shadow-[0_0_40px_rgba(0,119,200,0.28)] backdrop-blur sm:left-auto sm:right-6 sm:w-96">
      {children}
    </div>
  );
}
