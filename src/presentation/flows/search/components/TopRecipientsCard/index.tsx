import React, { useMemo } from 'react';
import { TopRecipientsCardProps } from './types';

export const TopRecipientsCard: React.FC<TopRecipientsCardProps> = ({ data, activeCategory }) => {
  const topRecipients = useMemo(() => {
    // 1. Group by recipient and sum amounts
    const recipientTotals: Record<string, number> = {};
    data.forEach(expense => {
      if (!recipientTotals[expense.recipient]) {
        recipientTotals[expense.recipient] = 0;
      }
      recipientTotals[expense.recipient] += expense.amount;
    });

    // 2. Convert to array and sort descending
    const sorted = Object.entries(recipientTotals)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);

    // 3. Take top 5
    return sorted.slice(0, 5);
  }, [data]);

  const formatCurrencyCompact = (value: number) => {
    if (value >= 1000000000) {
      return `R$ ${(value / 1000000000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} bi`;
    }
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} mi`;
    }
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
  };

  if (topRecipients.length === 0) return null;

  const subtitleCategory = activeCategory ? activeCategory.title.toUpperCase() : 'VISÃO GERAL';

  return (
    <div className="w-full bg-white rounded-[12px] border border-[#E4E2E1] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] p-6 md:p-8 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h3 className="text-2xl font-semibold text-[#1B1C1C]" style={{ fontFamily: 'Public Sans, sans-serif' }}>
          Quem recebeu mais?
        </h3>
        <div className="text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m19 12-7-7-7 7"/></svg>
        </div>
      </div>

      {/* Subtitle */}
      <div className="w-full">
        <p className="text-[#3C4A43] text-xs uppercase tracking-widest" style={{ fontFamily: 'Public Sans, sans-serif' }}>
          TOP 5 FORNECEDORES ({subtitleCategory})
        </p>
      </div>

      {/* List */}
      <div className="flex flex-col w-full mt-2">
        {topRecipients.map((recipient, index) => {
          const isLast = index === topRecipients.length - 1;
          return (
            <div 
              key={recipient.name} 
              className={`flex flex-row justify-between items-center py-4 ${!isLast ? 'border-b border-[#EAE8E7]' : ''}`}
            >
              <div className="pr-4 flex-1">
                <p className="text-[#1B1C1C] text-base" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                  {recipient.name}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-[#006C4F] text-sm font-semibold tracking-wide" style={{ fontFamily: 'Public Sans, sans-serif' }}>
                  {formatCurrencyCompact(recipient.total)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
