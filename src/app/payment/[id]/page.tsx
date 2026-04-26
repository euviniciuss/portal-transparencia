'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@flows/home/components/Header';
import { Footer } from '@flows/home/components/Footer';
import { getExpenseById } from '@lib/mocks/search-data';
import { PaymentHeader } from '@flows/payment/components/PaymentHeader';
import { PaymentTimeline } from '@flows/payment/components/PaymentTimeline';
import { PaymentDetailsGrid } from '@flows/payment/components/PaymentDetailsGrid';
import { PaymentActions } from '@flows/payment/components/PaymentActions';
import { PaymentComparisons } from '@flows/payment/components/PaymentComparisons';
import { RelatedPayments } from '@flows/payment/components/RelatedPayments';

export default function PaymentPage() {
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const expenseId = typeof params?.id === 'string' ? params.id : '';
  const expense = getExpenseById(expenseId);

  if (!expense) {
    return (
      <div className="min-h-screen flex flex-col bg-surface">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">Pagamento não encontrado</h1>
            <p className="text-on-surface-variant">Não foi possível localizar as informações deste pagamento.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="flex-grow py-8 md:py-12">
        <div className="app-container max-w-5xl mx-auto">
          <PaymentHeader expense={expense} />
          
          <div className="flex flex-col gap-8">
            <PaymentTimeline expense={expense} />
            
            <div className="mt-4">
              <PaymentDetailsGrid expense={expense} />
            </div>

            <PaymentActions expense={expense} />

            <PaymentComparisons expense={expense} />
            
            <RelatedPayments expense={expense} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
