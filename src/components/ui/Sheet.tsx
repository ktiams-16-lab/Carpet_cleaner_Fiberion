import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Sheet({
  open,
  title,
  children,
  onClose,
  side = 'right'
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  side?: 'left' | 'right';
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur">
      <aside
        className={cn(
          'absolute top-0 h-full w-full max-w-md bg-navy p-5 shadow-[0_0_80px_rgba(0,119,200,0.24)]',
          side === 'right' ? 'right-0' : 'left-0'
        )}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white" onClick={onClose} type="button" aria-label="Close sheet">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
}
