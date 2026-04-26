import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExpenseDetail } from '@lib/types/search';
import { getRelatedExpenses } from '@lib/mocks/search-data';

interface RelatedPaymentsProps {
  expense: ExpenseDetail;
}

export const RelatedPayments: React.FC<RelatedPaymentsProps> = ({ expense }) => {
  const [related, setRelated] = useState<ExpenseDetail[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setRelated(getRelatedExpenses(expense.recipient, expense.id));
  }, [expense]);

  if (related.length === 0) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    // Add timezone offset to prevent day shifting
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    return d.toLocaleDateString('pt-BR');
  };

  return (
    <div className="w-full mt-12 mb-8">
      <h2 className="text-2xl font-bold text-on-surface mb-6">
        Outros pagamentos para o mesmo fornecedor em {expense.year}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map(item => (
          <Link href={`/payment/${item.id}`} key={item.id} className="block group">
            <div className="bg-white border border-outline-variant p-5 rounded-xl h-full flex flex-col hover:border-primary hover:shadow-md transition-all">
              <h3 className="font-semibold text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
                {item.description}
              </h3>
              <p className="text-sm text-on-surface-variant mt-1 mb-4">
                {formatDate(item.date)}
              </p>
              
              <div className="mt-auto flex items-end justify-between">
                <span className="font-bold text-lg text-primary">
                  {formatCurrency(item.amount)}
                </span>
                
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  item.status === 'pago' ? 'bg-primary-container bg-opacity-30 text-primary-fixed-variant' :
                  item.status === 'cancelado' ? 'bg-error-container text-on-error-container' :
                  'bg-secondary-container bg-opacity-30 text-on-secondary-container'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
