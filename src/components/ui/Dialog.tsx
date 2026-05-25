import { ReactNode } from 'react';
import { X } from 'lucide-react';

export function Dialog({
  open,
  title,
  children,
  onClose
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur">
      <section className="fiberion-panel w-full max-w-lg p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white" onClick={onClose} type="button" aria-label="Close dialog">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
