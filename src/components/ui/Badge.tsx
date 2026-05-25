import type { JobStatus } from '../../types/fiberion';
import { jobStatusMeta } from '../../data/status';
import { cn } from '../../utils/cn';

export function StatusBadge({ status, className = '' }: { status: JobStatus; className?: string }) {
  const meta = jobStatusMeta[status];
  return (
    <span
      className={cn(
        'inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-xs font-bold capitalize',
        meta.className,
        className
      )}
    >
      {meta.label}
    </span>
  );
}
