import type { Invoice, PaymentPlan, QuoteRequest, ServiceJob, TeamMember } from '../types/fiberion';

export const quoteRequests: QuoteRequest[] = [
  {
    id: 'qr-1',
    name: 'Maya Torres',
    customerType: 'residential',
    email: 'maya@example.com',
    phone: '407-555-0123',
    address: 'Thornton Park, Orlando',
    areaSize: '4 rooms',
    lastCleaningDate: '2024',
    preferredDate: 'May 22',
    status: 'new_quote',
    createdDate: 'May 17'
  },
  {
    id: 'qr-2',
    name: 'Orlando CoWorks',
    customerType: 'commercial',
    email: 'ops@example.com',
    phone: '407-555-0199',
    address: 'Downtown Orlando',
    areaSize: '8,500 sqft',
    lastCleaningDate: '2025',
    preferredDate: 'May 24',
    status: 'contacted',
    createdDate: 'May 16'
  }
];

export const jobs: ServiceJob[] = [
  {
    id: 'job-1',
    customer: 'Aster Hotel',
    address: 'Orange Ave',
    serviceDate: 'May 20, 8:00 AM',
    serviceType: 'commercial',
    status: 'booked',
    assignedCleaner: 'Elena Cruz',
    durationMinutes: 180,
    travelBufferMinutes: 25
  },
  {
    id: 'job-2',
    customer: 'J. Miller',
    address: 'Lake Eola',
    serviceDate: 'May 21, 1:00 PM',
    serviceType: 'residential',
    status: 'in_progress',
    assignedCleaner: 'Andre Miles',
    durationMinutes: 120,
    travelBufferMinutes: 15,
    beforePhotos: [],
    afterPhotos: [],
    notes: 'Pet odor treatment requested.'
  }
];

export const invoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'FIB-1042',
    customer: 'North Quarter Dental',
    customerType: 'commercial',
    amount: '$940',
    dueDate: 'May 26',
    daysRemaining: 9,
    status: 'payment_pending'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'FIB-1038',
    customer: 'Lakefront Retail',
    customerType: 'commercial',
    amount: '$1,820',
    dueDate: 'May 14',
    daysRemaining: -3,
    status: 'overdue'
  }
];

export const paymentPlans: PaymentPlan[] = [
  {
    id: 'pp-1',
    customer: 'A. Bennett',
    status: 'payment_plan',
    totalAmount: '$620',
    deposit: '$180',
    remainingBalance: '$440',
    numberOfPayments: 4,
    nextPaymentDueDate: 'June 1'
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: 'tm-1',
    cleanerName: 'Elena Cruz',
    email: 'elena@fiberion.test',
    phone: '407-555-0101',
    role: 'cleaner',
    availability: 'Mon-Fri, 8 AM-4 PM',
    assignedJobs: 5,
    status: 'active'
  },
  {
    id: 'tm-2',
    cleanerName: 'Andre Miles',
    email: 'andre@fiberion.test',
    phone: '407-555-0102',
    role: 'cleaner',
    availability: 'Tue-Sat, 10 AM-6 PM',
    assignedJobs: 4,
    status: 'active'
  }
];
