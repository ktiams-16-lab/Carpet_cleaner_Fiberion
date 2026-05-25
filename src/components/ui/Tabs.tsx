'use client';

import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export function Tabs({
  value,
  onChange,
  tabs
}: {
  value: string;
  onChange: (value: string) => void;
  tabs: Array<{ value: string; label: string; content: ReactNode }>;
}) {
  return (
    <div>
      <div className="grid gap-2 rounded-2xl bg-black/35 p-2 sm:grid-cols-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={cn(
              'min-h-12 rounded-xl px-4 py-3 text-sm font-bold capitalize transition',
              value === tab.value
                ? 'bg-electric text-white shadow-[0_0_28px_rgba(0,119,200,0.28)]'
                : 'text-gray-400 hover:bg-white/10 hover:text-sky'
            )}
            type="button"
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-8">{tabs.find((tab) => tab.value === value)?.content}</div>
    </div>
  );
}
