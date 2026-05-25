'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { submitQuoteRequest } from '../services/quotes';
import type { CustomerType } from '../types/fiberion';

type QuoteField = {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
};

const residentialFields: QuoteField[] = [
  { name: 'fullName', label: 'Full name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel' },
  { name: 'address', label: 'Property address' },
  { name: 'areaSize', label: 'Size of area to clean' },
  { name: 'rooms', label: 'Number of rooms or areas' },
  { name: 'lastCleaned', label: 'When was the last time this area was professionally cleaned?' },
  { name: 'preferredDate', label: 'Preferred cleaning date', type: 'date' },
  { name: 'notes', label: 'Additional notes', textarea: true }
];

const commercialFields: QuoteField[] = [
  { name: 'companyName', label: 'Company name' },
  { name: 'contactPerson', label: 'Contact person' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel' },
  { name: 'businessAddress', label: 'Business address' },
  { name: 'establishmentType', label: 'Type of establishment' },
  { name: 'squareFootage', label: 'Approximate square footage' },
  { name: 'areas', label: 'Number of areas' },
  { name: 'lastCleaned', label: 'When was the last time this area was professionally cleaned?' },
  { name: 'preferredDate', label: 'Preferred service date', type: 'date' },
  { name: 'notes', label: 'Additional notes', textarea: true }
];

export function QuoteForm({ type }: { type: CustomerType }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [error, setError] = useState('');
  const fields = type === 'residential' ? residentialFields : commercialFields;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('submitting');
    setError('');
    const formData = new FormData(form);

    try {
      await submitQuoteRequest(type, formData);
      console.log('Quote request saved in Supabase');
      setStatus('submitted');
      form.reset();
    } catch (submitError) {
      const message = submitError instanceof Error
        ? submitError.message
        : typeof submitError === 'object' && submitError !== null && 'message' in submitError
          ? String(submitError.message)
          : 'Unable to submit request.';
      console.error('Quote request failed:', message);
      setError(message);
      setStatus('error');
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className={field.textarea ? 'md:col-span-2' : ''}>
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-gray-400">
              {field.label}
            </span>
            {field.textarea ? (
              <textarea name={field.name} className="fiberion-input min-h-28 resize-y" />
            ) : (
              <input name={field.name} type={field.type ?? 'text'} className="fiberion-input" />
            )}
          </label>
        ))}
      </div>
      <button className="fiberion-button min-h-12 w-fit" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : `Send ${type === 'residential' ? 'Residential' : 'Commercial'} Request`}
        <ArrowRight className="h-4 w-4" />
      </button>
      {status === 'submitted' ? (
        <p className="rounded-2xl border border-lime/30 bg-lime/15 px-4 py-3 text-sm text-[#B8F08A]">
          Thank you! Fiberion Surface Care received your request. We&apos;ll contact you shortly with
          your quote.
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="rounded-2xl border border-red-400/30 bg-red-500/15 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}
    </form>
  );
}
