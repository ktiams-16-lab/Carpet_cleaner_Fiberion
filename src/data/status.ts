import type { JobStatus } from '../types/fiberion';

export const jobStatusMeta: Record<JobStatus, { label: string; className: string }> = {
  new_quote: { label: 'New quote', className: 'bg-electric/15 text-sky border-electric/30' },
  contacted: { label: 'Contacted', className: 'bg-cyan-400/15 text-cyan-200 border-cyan-300/30' },
  quoted: { label: 'Quoted', className: 'bg-indigo-500/15 text-indigo-200 border-indigo-400/30' },
  booked: { label: 'Booked', className: 'bg-yellow-400/15 text-yellow-200 border-yellow-300/30' },
  in_progress: { label: 'In progress', className: 'bg-purple-500/15 text-purple-200 border-purple-400/30' },
  completed: { label: 'Completed', className: 'bg-lime/15 text-[#B8F08A] border-lime/30' },
  payment_pending: { label: 'Payment pending', className: 'bg-orange-500/15 text-orange-200 border-orange-400/30' },
  overdue: { label: 'Overdue', className: 'bg-red-500/15 text-red-200 border-red-400/30' },
  cancelled: { label: 'Cancelled', className: 'bg-neutral/20 text-gray-300 border-white/10' }
};

export const jobStatuses = Object.keys(jobStatusMeta) as JobStatus[];
