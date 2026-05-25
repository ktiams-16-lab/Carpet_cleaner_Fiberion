import { supabase } from '../lib/supabase';
import type { CustomerType, JobStatus, QuoteRequest } from '../types/fiberion';

type SupabaseQuoteStatus = 'new' | 'review' | 'quoted' | 'booked' | 'closed';

type SupabaseQuoteRequest = {
  id: string;
  customer_type: CustomerType;
  contact_name: string;
  company_name: string | null;
  email: string;
  phone: string | null;
  address: string;
  area_size: string | null;
  room_or_area_count: number | null;
  last_professional_cleaning: string | null;
  preferred_service_date: string | null;
  status: SupabaseQuoteStatus;
  created_at: string;
};

const statusMap: Record<SupabaseQuoteStatus, JobStatus> = {
  new: 'new_quote',
  review: 'contacted',
  quoted: 'quoted',
  booked: 'booked',
  closed: 'completed'
};

function formatDate(value: string | null) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date);
}

function numericField(value: FormDataEntryValue | null) {
  const number = Number(String(value ?? '').replace(/[^0-9]/g, ''));
  return Number.isFinite(number) && number > 0 ? number : null;
}

function textField(formData: FormData, name: string) {
  return String(formData.get(name) ?? '').trim();
}

function mapQuoteRequest(row: SupabaseQuoteRequest): QuoteRequest {
  return {
    id: row.id,
    name: row.company_name || row.contact_name,
    customerType: row.customer_type,
    email: row.email,
    phone: row.phone ?? '-',
    address: row.address,
    areaSize: row.area_size ?? '-',
    lastCleaningDate: row.last_professional_cleaning ?? '-',
    preferredDate: formatDate(row.preferred_service_date),
    status: statusMap[row.status],
    createdDate: formatDate(row.created_at)
  };
}

export async function fetchQuoteRequests() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('quote_requests')
    .select(
      'id, customer_type, contact_name, company_name, email, phone, address, area_size, room_or_area_count, last_professional_cleaning, preferred_service_date, status, created_at'
    )
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => mapQuoteRequest(row as SupabaseQuoteRequest));
}

export async function submitQuoteRequest(type: CustomerType, formData: FormData) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const isResidential = type === 'residential';
  const contactName = isResidential ? textField(formData, 'fullName') : textField(formData, 'contactPerson');
  const companyName = isResidential ? null : textField(formData, 'companyName');
  const address = isResidential ? textField(formData, 'address') : textField(formData, 'businessAddress');
  const areaSize = isResidential ? textField(formData, 'areaSize') : textField(formData, 'squareFootage');
  const roomOrAreaCount = isResidential
    ? numericField(formData.get('rooms'))
    : numericField(formData.get('areas'));

  const customerName = companyName || contactName;
  const email = textField(formData, 'email');
  const phone = textField(formData, 'phone');

  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .insert({
      customer_type: type,
      name: customerName,
      company_name: companyName,
      email,
      phone,
      address
    })
    .select('id')
    .single();

  if (customerError) throw customerError;

  const { error: quoteError } = await supabase.from('quote_requests').insert({
    customer_id: customer.id,
    customer_type: type,
    contact_name: contactName,
    company_name: companyName,
    email,
    phone,
    address,
    area_size: areaSize,
    room_or_area_count: roomOrAreaCount,
    establishment_type: isResidential ? null : textField(formData, 'establishmentType'),
    last_professional_cleaning: textField(formData, 'lastCleaned'),
    preferred_service_date: textField(formData, 'preferredDate') || null,
    notes: textField(formData, 'notes')
  });

  if (quoteError) throw quoteError;
}
