export type CustomerType = 'residential' | 'commercial';

export type JobStatus =
  | 'new_quote'
  | 'contacted'
  | 'quoted'
  | 'booked'
  | 'in_progress'
  | 'completed'
  | 'payment_pending'
  | 'overdue'
  | 'cancelled';

export type CustomerLifecycleStage =
  | 'lead'
  | 'contacted'
  | 'quoted'
  | 'booked'
  | 'in_progress'
  | 'completed'
  | 'invoiced'
  | 'paid'
  | 'follow_up';

export type TeamRole = 'admin' | 'cleaner' | 'office_staff';

export type CalendarView = 'daily' | 'weekly' | 'monthly';

export type QuoteEstimatorInput = {
  squareFootage: number;
  roomCount: number;
  stainLevel: 'light' | 'moderate' | 'heavy';
  odorTreatment: boolean;
  stairs: boolean;
  customerType: CustomerType;
  urgency: 'standard' | 'rush' | 'after_hours';
};

export type QuoteRequest = {
  id: string;
  name: string;
  customerType: CustomerType;
  email: string;
  phone: string;
  address: string;
  areaSize: string;
  lastCleaningDate: string;
  preferredDate: string;
  status: JobStatus;
  createdDate: string;
};

export type ServiceJob = {
  id: string;
  customer: string;
  address: string;
  serviceDate: string;
  serviceType: CustomerType;
  status: JobStatus;
  assignedCleaner: string;
  durationMinutes: number;
  travelBufferMinutes: number;
  beforePhotos?: string[];
  afterPhotos?: string[];
  notes?: string;
  attachments?: string[];
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  customer: string;
  customerType: CustomerType;
  amount: string;
  dueDate: string;
  daysRemaining: number;
  status: Extract<JobStatus, 'payment_pending' | 'overdue' | 'completed'>;
};

export type PaymentPlan = {
  id: string;
  customer: string;
  status: 'paid' | 'unpaid' | 'payment_plan';
  totalAmount: string;
  deposit: string;
  remainingBalance: string;
  numberOfPayments: number;
  nextPaymentDueDate: string;
};

export type TeamMember = {
  id: string;
  cleanerName: string;
  email: string;
  phone: string;
  role: TeamRole;
  availability: string;
  assignedJobs: number;
  status: 'active' | 'off_duty' | 'unavailable';
  profilePhoto?: string;
};

export type NotificationType =
  | 'quote_confirmation'
  | 'booking_confirmation'
  | 'appointment_reminder'
  | 'invoice_reminder'
  | 'overdue_notice'
  | 'payment_confirmation'
  | 'follow_up_reminder';
