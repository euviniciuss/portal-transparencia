import React from 'react';
import { ExpenseDetail } from '@lib/types/search';

interface ResultCardProps {
  expense: ExpenseDetail;
}

export const ResultCard: React.FC<ResultCardProps> = ({ expense }) => {
  const formattedAmount = new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(expense.amount);

  const formattedDate = new Date(expense.date).toLocaleDateString('pt-BR');

  const statusColors = {
    pago: 'bg-[#00c896] text-[#004d38]', // primary-container
    empenhado: 'bg-[#ffdea8] text-[#271900]', // tertiary-fixed
    liquidado: 'bg-[#d2e0fd] text-[#55637b]', // secondary-container
    cancelado: 'bg-[#ffdad6] text-[#93000a]' // error-container
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-outline-variant hover:border-primary transition-all shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] flex flex-col h-full">
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-3">
            {expense.category}
          </span>
          <h2 className="text-xl font-bold text-on-surface">{expense.recipient}</h2>
        </div>
        <div className="text-left md:text-right">
          <div className="text-2xl font-bold text-primary">
            {formattedAmount}
          </div>
        </div>
      </div>

      <p className="text-on-surface-variant mb-6 leading-relaxed flex-grow">
        {expense.description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-outline-variant mt-auto">
        <div className="flex gap-4 text-sm text-on-surface-variant">
          <span><strong>Data:</strong> {formattedDate}</span>
          <span className="flex items-center gap-2">
            <strong>Status:</strong> 
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${statusColors[expense.status]}`}>
              {expense.status}
            </span>
          </span>
        </div>
        <button className="text-primary font-bold text-sm flex items-center hover:underline bg-surface-container-low px-4 py-2 rounded-lg transition-colors hover:bg-surface-container">
          Ver detalhes
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  );
};
