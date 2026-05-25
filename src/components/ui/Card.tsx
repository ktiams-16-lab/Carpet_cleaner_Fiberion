import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={cn('fiberion-panel fiberion-glow-card', className)}>{children}</div>;
}
