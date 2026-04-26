import React from 'react';
import { ExpenseDetail } from '@lib/types/search';
import { exportToCSV, exportToPDF } from '@lib/utils/exportData';

interface PaymentActionsProps {
  expense: ExpenseDetail;
}

export const PaymentActions: React.FC<PaymentActionsProps> = ({ expense }) => {
  const handleDownloadPDF = () => {
    exportToPDF([expense], `comprovante-${expense.id}`, 'Comprovante de Pagamento');
  };

  const handleDownloadCSV = () => {
    exportToCSV([expense], `dados-${expense.id}`);
  };

  const handleReport = () => {
    // In a real app, this would open a modal or navigate to e-sic
    alert('Redirecionando para o portal E-SIC para registro de denúncia...');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <button 
        onClick={handleDownloadPDF}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-outline-variant text-primary font-bold rounded-lg hover:border-primary hover:bg-surface-container-low transition-colors shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
        Baixar comprovante PDF
      </button>

      <button 
        onClick={handleDownloadCSV}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-outline-variant text-primary font-bold rounded-lg hover:border-primary hover:bg-surface-container-low transition-colors shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></svg>
        Baixar dados CSV
      </button>

      <button 
        onClick={handleReport}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-error-container text-on-error-container font-bold rounded-lg hover:bg-opacity-80 transition-colors shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        Denunciar via E-SIC
      </button>
    </div>
  );
};
