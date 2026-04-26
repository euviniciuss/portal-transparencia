import React from 'react';
import Link from 'next/link';
import { ExpenseDetail } from '@lib/types/search';
import { categories } from '@lib/mocks/search-data';

interface PaymentHeaderProps {
  expense: ExpenseDetail;
}

export const PaymentHeader: React.FC<PaymentHeaderProps> = ({ expense }) => {
  const categoryData = categories.find(c => c.type === expense.category);
  
  return (
    <div className="mb-8 flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center flex-wrap gap-2 text-sm text-on-surface-variant font-medium">
        <Link href="/" className="hover:text-primary transition-colors hover:underline">
          Início
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        
        <Link href="/search" className="hover:text-primary transition-colors hover:underline">
          Gastos por área
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        
        {categoryData && (
          <>
            <Link href={`/search?category=${expense.category}`} className="hover:text-primary transition-colors hover:underline">
              {categoryData.title}
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </>
        )}
        
        <span className="text-on-surface">Detalhe do pagamento</span>
      </nav>

      {/* Main Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
        {expense.description}
      </h1>
    </div>
  );
};
