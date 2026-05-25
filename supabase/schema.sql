-- Fiberion Surface Care Supabase schema
-- Run this in Supabase SQL Editor. It is safe to run more than once.

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'customer_type') then
    create type customer_type as enum ('residential', 'commercial');
  end if;

  if not exists (select 1 from pg_type where typname = 'quote_status') then
    create type quote_status as enum ('new', 'review', 'quoted', 'booked', 'closed');
  end if;

  if not exists (select 1 from pg_type where typname = 'service_status') then
    create type service_status as enum ('booked', 'confirmed', 'in_progress', 'completed', 'cancelled');
  end if;

  if not exists (select 1 from pg_type where typname = 'invoice_status') then
    create type invoice_status as enum ('pending', 'paid', 'overdue');
  end if;

  if not exists (select 1 from pg_type where typname = 'payment_plan_status') then
    create type payment_plan_status as enum ('paid', 'unpaid', 'payment_plan');
  end if;
end $$;

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  customer_type customer_type not null,
  name text not null,
  company_name text,
  email text not null,
  phone text,
  address text,
  city text,
  state text default 'FL',
  zip text,
  lifecycle_stage text not null default 'lead',
  created_at timestamptz not null default now()
);

create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete set null,
  customer_type customer_type not null,
  contact_name text not null,
  company_name text,
  email text not null,
  phone text,
  address text not null,
  area_size text,
  room_or_area_count integer,
  establishment_type text,
  last_professional_cleaning text,
  preferred_service_date date,
  notes text,
  status quote_status not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  cleaner_name text not null,
  email text not null unique,
  phone text,
  role text not null check (role in ('admin', 'cleaner', 'office_staff')),
  availability text,
  assigned_jobs integer not null default 0,
  status text not null default 'active',
  profile_photo_url text,
  created_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  quote_request_id uuid references quote_requests(id) on delete set null,
  assigned_cleaner_id uuid references team_members(id) on delete set null,
  customer_type customer_type not null,
  service_type text not null,
  service_address text not null,
  service_date timestamptz,
  completed_at timestamptz,
  status service_status not null default 'booked',
  duration_minutes integer,
  travel_buffer_minutes integer default 0,
  created_at timestamptz not null default now()
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  invoice_number text not null unique,
  customer_type customer_type not null,
  amount numeric(10, 2) not null,
  issued_at timestamptz not null default now(),
  due_at timestamptz not null,
  paid_at timestamptz,
  status invoice_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists payment_plans (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  invoice_id uuid references invoices(id) on delete set null,
  status payment_plan_status not null default 'unpaid',
  total_amount numeric(10, 2) not null,
  deposit numeric(10, 2) not null default 0,
  remaining_balance numeric(10, 2) not null,
  number_of_payments integer not null,
  next_payment_due_date date,
  created_at timestamptz not null default now()
);

create table if not exists job_photos (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  photo_type text not null check (photo_type in ('before', 'after', 'attachment')),
  storage_path text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete set null,
  notification_type text not null,
  provider text,
  recipient text not null,
  status text not null default 'queued',
  scheduled_for timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

-- Add columns when upgrading an older copy of this schema.
alter table customers add column if not exists lifecycle_stage text not null default 'lead';
alter table quote_requests add column if not exists establishment_type text;
alter table services add column if not exists assigned_cleaner_id uuid references team_members(id) on delete set null;
alter table services add column if not exists duration_minutes integer;
alter table services add column if not exists travel_buffer_minutes integer default 0;

create index if not exists customers_customer_type_idx on customers(customer_type);
create index if not exists customers_email_idx on customers(email);
create index if not exists quote_requests_created_at_idx on quote_requests(created_at desc);
create index if not exists quote_requests_status_idx on quote_requests(status);
create index if not exists quote_requests_customer_id_idx on quote_requests(customer_id);
create index if not exists services_status_idx on services(status);
create index if not exists invoices_status_due_at_idx on invoices(status, due_at);
create index if not exists team_members_role_idx on team_members(role);
create index if not exists job_photos_service_id_idx on job_photos(service_id);
create index if not exists notifications_status_idx on notifications(status);

alter table customers enable row level security;
alter table quote_requests enable row level security;
alter table services enable row level security;
alter table invoices enable row level security;
alter table payment_plans enable row level security;
alter table team_members enable row level security;
alter table job_photos enable row level security;
alter table notifications enable row level security;

-- Development policies for the current Vite app.
-- The public quote form uses the anon key, and the dashboard auth is currently local-only.
-- For production, replace these read policies with Supabase Auth-based admin policies.
drop policy if exists "public quote customer insert" on customers;
create policy "public quote customer insert"
on customers for insert
to anon, authenticated
with check (true);

drop policy if exists "dashboard customer read" on customers;
create policy "dashboard customer read"
on customers for select
to anon, authenticated
using (true);

drop policy if exists "public quote request insert" on quote_requests;
create policy "public quote request insert"
on quote_requests for insert
to anon, authenticated
with check (true);

drop policy if exists "dashboard quote request read" on quote_requests;
create policy "dashboard quote request read"
on quote_requests for select
to anon, authenticated
using (true);

drop policy if exists "dashboard quote request update" on quote_requests;
create policy "dashboard quote request update"
on quote_requests for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "dashboard service read" on services;
create policy "dashboard service read"
on services for select
to anon, authenticated
using (true);

drop policy if exists "dashboard invoice read" on invoices;
create policy "dashboard invoice read"
on invoices for select
to anon, authenticated
using (true);

drop policy if exists "dashboard payment plan read" on payment_plans;
create policy "dashboard payment plan read"
on payment_plans for select
to anon, authenticated
using (true);

drop policy if exists "dashboard team member read" on team_members;
create policy "dashboard team member read"
on team_members for select
to anon, authenticated
using (true);
