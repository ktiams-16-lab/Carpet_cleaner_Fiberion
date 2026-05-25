import { useEffect, useState } from 'react';
import {
  BarChart3,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock,
  CreditCard,
  GripVertical,
  ImagePlus,
  ReceiptText,
  Users,
  WalletCards
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/Badge';
import { DashboardTable } from '../../dashboard/DashboardTable';
import { StatusDropdown, StatusFilters } from '../../dashboard/StatusControls';
import { invoices, jobs, paymentPlans, quoteRequests, teamMembers } from '../../data/mock';
import { fetchQuoteRequests } from '../../services/quotes';
import type { CalendarView, JobStatus } from '../../types/fiberion';

function PageHeader({ label, title, detail }: { label: string; title: string; detail?: string }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-lime">{label}</p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">{title}</h1>
        {detail ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">{detail}</p> : null}
      </div>
    </div>
  );
}

function StatCard({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: React.ReactNode }) {
  return (
    <Card className="p-5">
      <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-sky text-navy">{icon}</div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-lime">{detail}</p>
    </Card>
  );
}

export function OverviewPage() {
  return (
    <>
      <PageHeader label="Private Dashboard" title="Fiberion operations" detail="Internal system for quotes, scheduling, cleaners, invoices, payments, and analytics." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="New quote requests" value="18" detail="+6 this week" icon={<ReceiptText />} />
        <StatCard label="Booked services" value="11" detail="4 commercial" icon={<CalendarDays />} />
        <StatCard label="Completed jobs" value="42" detail="This month" icon={<CheckCircle2 />} />
        <StatCard label="Unpaid invoices" value="$4.8k" detail="3 overdue" icon={<CreditCard />} />
        <StatCard label="Commercial invoices due within 14 days" value="7" detail="Net-14 active" icon={<Clock />} />
        <StatCard label="Residential payment plans" value="5" detail="2 due soon" icon={<WalletCards />} />
      </div>
    </>
  );
}

export function QuotesPage() {
  const [filter, setFilter] = useState<JobStatus | 'all'>('all');
  const [quotes, setQuotes] = useState(quoteRequests);
  const [loadError, setLoadError] = useState('');
  const filtered = filter === 'all' ? quotes : quotes.filter((quote) => quote.status === filter);

  useEffect(() => {
    fetchQuoteRequests()
      .then((requests) => {
        setQuotes(requests);
        setLoadError('');
        console.log('Loaded quote requests from Supabase:', requests.length);
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : 'Unable to load quote requests.';
        setQuotes([]);
        setLoadError(message);
        console.error('Failed to load quote requests:', message);
      });
  }, []);

  return (
    <>
      <PageHeader label="Pipeline" title="New Quotes" detail="Lead intake, customer lifecycle status, quick actions, and future quote estimator output." />
      {loadError ? <p className="mb-4 rounded-2xl border border-red-400/30 bg-red-500/15 px-4 py-3 text-sm text-red-200">{loadError}</p> : null}
      <StatusFilters active={filter} onChange={setFilter} />
      <div className="mt-5">
        <DashboardTable
          title="Quote Requests"
          columns={['Name', 'Type', 'Email', 'Phone', 'Address', 'Area size', 'Last cleaned', 'Preferred', 'Status', 'Quick action']}
          rows={filtered.map((quote) => [
            quote.name,
            quote.customerType,
            quote.email,
            quote.phone,
            quote.address,
            quote.areaSize,
            quote.lastCleaningDate,
            quote.preferredDate,
            <StatusBadge status={quote.status} />,
            <StatusDropdown value={quote.status} />
          ])}
          emptyMessage="No quote requests yet."
        />
      </div>
    </>
  );
}

export function SchedulePage() {
  const [view, setView] = useState<CalendarView>('weekly');

  return (
    <>
      <PageHeader label="Scheduling" title="Scheduling Calendar" detail="Daily, weekly, and monthly infrastructure for drag-and-drop appointments, assigned cleaners, duration, travel buffers, and color-coded statuses." />
      <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
        {(['daily', 'weekly', 'monthly'] as CalendarView[]).map((item) => (
          <button key={item} className={`min-h-11 rounded-full px-5 text-sm capitalize ${view === item ? 'bg-electric text-white' : 'bg-white/10 text-gray-300'}`} onClick={() => setView(item)} type="button">
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <Card key={day} className="min-h-[220px] p-4">
            <h3 className="text-sm font-bold text-white">{day}</h3>
            {jobs[index % jobs.length] ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <GripVertical className="h-4 w-4 text-gray-500" />
                  <StatusBadge status={jobs[index % jobs.length].status} />
                </div>
                <p className="font-bold text-white">{jobs[index % jobs.length].customer}</p>
                <p className="mt-2 text-xs text-gray-400">{jobs[index % jobs.length].serviceDate}</p>
                <p className="mt-2 text-xs text-sky">{jobs[index % jobs.length].assignedCleaner}</p>
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </>
  );
}

export function JobsPage({ mode }: { mode: 'booked' | 'in_progress' | 'completed' }) {
  const selected = jobs.filter((job) => (mode === 'booked' ? job.status === 'booked' : mode === 'in_progress' ? job.status === 'in_progress' : job.status === 'completed'));

  return (
    <>
      <PageHeader label="Jobs" title={mode === 'booked' ? 'Booked Services' : mode === 'in_progress' ? 'In Progress Jobs' : 'Completed Jobs'} detail="Mobile-friendly field cards support reassignment, status updates, and photo documentation architecture." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(selected.length ? selected : jobs).map((job) => (
          <Card key={job.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white">{job.customer}</h3>
                <p className="mt-1 text-sm text-gray-400">{job.address}</p>
              </div>
              <StatusBadge status={job.status} />
            </div>
            <div className="mt-5 grid gap-3 text-sm text-gray-300">
              <p>{job.serviceDate}</p>
              <p>Assigned: <span className="text-sky">{job.assignedCleaner}</span></p>
              <p>{job.durationMinutes} min service + {job.travelBufferMinutes} min travel buffer</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button className="fiberion-button min-h-11" type="button">Update Status</button>
              <button className="fiberion-button-outline min-h-11" type="button">Reassign</button>
            </div>
            <div className="mt-5 rounded-2xl border border-dashed border-sky/30 bg-sky/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-sky"><Camera className="h-4 w-4" />Photo documentation</div>
              <div className="grid grid-cols-2 gap-3">
                {['Before photos', 'After photos'].map((label) => (
                  <div key={label} className="grid min-h-24 place-items-center rounded-xl bg-black/25 text-center text-xs text-gray-400">
                    <ImagePlus className="mb-2 h-5 w-5 text-lime" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export function CustomersPage() {
  const [quotes, setQuotes] = useState(quoteRequests);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    fetchQuoteRequests()
      .then((requests) => {
        setQuotes(requests);
        setLoadError('');
        console.log('Loaded customers from quote requests:', requests.length);
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : 'Unable to load customers.';
        setQuotes([]);
        setLoadError(message);
        console.error('Failed to load customers:', message);
      });
  }, []);

  return (
    <>
      <PageHeader label="CRM" title="Customers" detail="Lifecycle stages: lead, contacted, quoted, booked, in progress, completed, invoiced, paid, follow up." />
      {loadError ? <p className="mb-4 rounded-2xl border border-red-400/30 bg-red-500/15 px-4 py-3 text-sm text-red-200">{loadError}</p> : null}
      <DashboardTable
        title="Customers"
        columns={['Customer', 'Type', 'Email', 'Phone', 'Lifecycle', 'Actions']}
        rows={quotes.map((quote) => [quote.name, quote.customerType, quote.email, quote.phone, 'lead', <button className="fiberion-button-outline min-h-10" type="button">Open</button>])}
        emptyMessage="No customers yet."
      />
    </>
  );
}

export function InvoicesPage() {
  return (
    <>
      <PageHeader label="Billing" title="Invoices" detail="Commercial clients have up to 14 days to pay after completion. Statuses are pending, paid, and overdue." />
      <DashboardTable
        title="Unpaid Invoices"
        columns={['Invoice #', 'Customer/company', 'Type', 'Amount', 'Due date', 'Days remaining', 'Status']}
        rows={invoices.map((invoice) => [invoice.invoiceNumber, invoice.customer, invoice.customerType, invoice.amount, invoice.dueDate, String(invoice.daysRemaining), <StatusBadge status={invoice.status} />])}
      />
    </>
  );
}

export function PaymentPlansPage() {
  return (
    <>
      <PageHeader label="Residential Payments" title="Payment Plans" detail="Residential customers can be marked as paid, unpaid, or payment_plan." />
      <DashboardTable
        title="Payment Plans"
        columns={['Customer', 'Status', 'Total', 'Deposit', 'Remaining', 'Payments', 'Next due']}
        rows={paymentPlans.map((plan) => [plan.customer, plan.status, plan.totalAmount, plan.deposit, plan.remainingBalance, String(plan.numberOfPayments), plan.nextPaymentDueDate])}
      />
    </>
  );
}

export function TeamPage() {
  return (
    <>
      <PageHeader label="Team" title="Team Members" detail="Roles support admin, cleaner, and office_staff. Jobs support assigned cleaner, reassignment, and status updates." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id} className="p-5">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-electric text-xl font-bold text-white">{member.cleanerName.slice(0, 1)}</div>
            <h3 className="text-xl font-bold text-white">{member.cleanerName}</h3>
            <p className="mt-2 text-sm text-gray-400">{member.role}</p>
            <div className="mt-5 grid gap-2 text-sm text-gray-300">
              <p>{member.email}</p>
              <p>{member.phone}</p>
              <p>{member.availability}</p>
              <p>{member.assignedJobs} assigned jobs</p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export function AnalyticsPage() {
  const metrics = ['Monthly revenue', 'Quote conversion rate', 'Repeat customers', 'Average invoice amount', 'Overdue invoices', 'Top services', 'Bookings per month', 'Customer growth'];
  return (
    <>
      <PageHeader label="Reporting" title="Analytics" detail="Prepared for revenue, conversion, repeat customer, invoice, service, booking, and growth reporting." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <StatCard key={metric} label={metric} value={index % 2 ? 'Ready' : '--'} detail="Supabase-ready" icon={<BarChart3 />} />
        ))}
      </div>
    </>
  );
}

export function SettingsPage() {
  return (
    <>
      <PageHeader label="System" title="Settings" detail="Notification providers, Supabase Storage, quote estimator rules, and auth settings are staged for production." />
      <div className="grid gap-4 lg:grid-cols-2">
        {['Twilio SMS', 'Resend Email', 'SendGrid Email', 'Postmark Email', 'Supabase Storage', 'Quote Estimator Rules'].map((item) => (
          <Card key={item} className="p-5">
            <h3 className="text-xl font-bold text-white">{item}</h3>
            <p className="mt-3 text-sm text-gray-400">Provider placeholder. Environment variables and service adapters can be added here without touching public website code.</p>
          </Card>
        ))}
      </div>
    </>
  );
}
