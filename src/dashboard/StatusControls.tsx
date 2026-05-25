'use client';

import type { JobStatus } from '../types/fiberion';
import { jobStatuses, jobStatusMeta } from '../data/status';
import { StatusBadge } from '../components/ui/Badge';

export function StatusFilters({ active, onChange }: { active: JobStatus | 'all'; onChange: (status: JobStatus | 'all') => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button className="min-h-10 shrink-0 rounded-full border border-white/10 px-4 text-sm text-white" onClick={() => onChange('all')} type="button">All</button>
      {jobStatuses.map((status) => (
        <button key={status} className="shrink-0" onClick={() => onChange(status)} type="button">
          <StatusBadge status={status} className={active === status ? 'ring-2 ring-sky' : ''} />
        </button>
      ))}
    </div>
  );
}

export function StatusDropdown({ value }: { value: JobStatus }) {
  return (
    <select className="fiberion-input min-h-10 py-2 text-xs" defaultValue={value}>
      {jobStatuses.map((status) => (
        <option key={status} value={status}>
          {jobStatusMeta[status].label}
        </option>
      ))}
    </select>
  );
}
