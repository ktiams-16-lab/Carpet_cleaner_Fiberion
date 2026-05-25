'use client';

import { ReactNode, useState } from 'react';
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Home,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
  WalletCards,
  Wrench,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiberionMark } from '../components/Brand';
import { useAuth } from '../store/auth';
import { cn } from '../utils/cn';

const navItems = [
  ['Overview', '/dashboard', LayoutDashboard],
  ['New Quotes', '/dashboard/quotes', ClipboardList],
  ['Scheduling Calendar', '/dashboard/schedule', CalendarDays],
  ['Booked Services', '/dashboard/booked', Wrench],
  ['In Progress Jobs', '/dashboard/in-progress', Wrench],
  ['Completed Jobs', '/dashboard/completed', CheckCircle2],
  ['Customers', '/dashboard/customers', Users],
  ['Invoices', '/dashboard/invoices', CreditCard],
  ['Payment Plans', '/dashboard/payment-plans', WalletCards],
  ['Team Members', '/dashboard/team', Users],
  ['Analytics', '/dashboard/analytics', BarChart3],
  ['Settings', '/dashboard/settings', Settings]
] as const;

function NavItem({ to, children, onClick }: { to: string; children: ReactNode; onClick?: () => void }) {
  const pathname = usePathname() ?? '';
  const isActive = to === '/dashboard' ? pathname === to : pathname.startsWith(to);

  return (
    <Link
      href={to}
      onClick={onClick}
      className={cn(
        'flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition',
        isActive
          ? 'bg-electric text-white shadow-[0_0_28px_rgba(0,119,200,0.28)]'
          : 'text-gray-400 hover:bg-white/10 hover:text-sky'
      )}
    >
      {children}
    </Link>
  );
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const pathname = usePathname() ?? '';

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#0B1D34_0%,#020509_45%,#000000_100%)] pb-20 text-white lg:pb-0">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-white/10 bg-navy/80 p-4 shadow-[20px_0_80px_rgba(0,119,200,0.08)] backdrop-blur lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
          <div className="flex items-center justify-between">
            <FiberionMark />
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle dashboard navigation">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          <nav className={cn(open ? 'grid' : 'hidden', 'mt-8 gap-2 lg:grid')}>
            {navItems.map(([label, to, Icon]) => (
              <NavItem key={to} to={to} onClick={() => setOpen(false)}>
                <Icon className="h-4 w-4" />
                {label}
              </NavItem>
            ))}
            <Link className="fiberion-button-outline mt-4 justify-center" href="/">Public site</Link>
            <button className="min-h-12 rounded-2xl px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-sky" onClick={logout} type="button">
              Log out
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 gap-1 border-t border-white/10 bg-black/90 p-2 backdrop-blur lg:hidden">
        {navItems.slice(0, 5).map(([label, to, Icon]) => {
          const isActive = to === '/dashboard' ? pathname === to : pathname.startsWith(to);

          return (
          <Link key={to} href={to} className={cn('flex min-h-14 flex-col items-center justify-center rounded-2xl text-[10px]', isActive ? 'bg-electric text-white' : 'text-gray-400')}>
            <Icon className="mb-1 h-4 w-4" />
            {label.split(' ')[0]}
          </Link>
          );
        })}
      </nav>
      <button className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-lime text-navy shadow-[0_0_38px_rgba(102,179,46,0.42)] lg:hidden" type="button" aria-label="Quick action">
        <Home className="h-5 w-5" />
      </button>
    </div>
  );
}
