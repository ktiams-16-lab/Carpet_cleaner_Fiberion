'use client';

import { useState } from 'react';
import Link from 'next/link';

export function FiberionMark({ compact = false, hero = false }: { compact?: boolean; hero?: boolean }) {
  const [logoLoaded, setLogoLoaded] = useState(true);

  return (
    <Link href="/" className="flex items-center gap-3 text-left">
      {logoLoaded ? (
        <span
          className={
            hero
              ? 'flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white p-1.5 shadow-[0_0_44px_rgba(0,119,200,0.32)] sm:h-28 sm:w-28 md:h-32 md:w-32'
              : compact
                ? 'flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5'
                : 'flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_0_34px_rgba(0,119,200,0.24)]'
          }
        >
          <img
            src="/fiberion-logo.png"
            alt="FIBERION Surface Care"
            className="h-full w-full object-contain"
            onError={() => setLogoLoaded(false)}
          />
        </span>
      ) : (
        <span className="leading-none">
          <span className="block text-sm font-extrabold tracking-[0.24em] text-white">FIBERION</span>
          <span className="block text-[10px] uppercase tracking-[0.24em] text-sky">Surface Care</span>
        </span>
      )}
      {!compact && logoLoaded ? <span className="sr-only">FIBERION Surface Care</span> : null}
    </Link>
  );
}
