import React from 'react';
import { ExpenseDetail } from '@lib/types/search';
import { categories } from '@lib/mocks/search-data';

interface PaymentDetailsGridProps {
  expense: ExpenseDetail;
}

export const PaymentDetailsGrid: React.FC<PaymentDetailsGridProps> = ({ expense }) => {
  const categoryData = categories.find(c => c.type === expense.category);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Quem recebeu */}
      <div className="bg-white p-6 rounded-[12px] border border-outline-variant shadow-sm flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Quem recebeu</h3>
        <p className="text-lg font-bold text-on-surface">{expense.recipient}</p>
        <p className="text-sm text-on-surface-variant">CNPJ: {(Math.random() * 90000000000000).toFixed(0).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}</p>
      </div>

      {/* Quem pagou */}
      <div className="bg-white p-6 rounded-[12px] border border-outline-variant shadow-sm flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Quem pagou</h3>
        <p className="text-lg font-bold text-on-surface">Estado do Maranhão</p>
        <p className="text-sm text-on-surface-variant">Órgão gestor responsável pelos recursos da categoria {categoryData?.title || expense.category}.</p>
      </div>

      {/* Área de atuação */}
      <div className="bg-white p-6 rounded-[12px] border border-outline-variant shadow-sm flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Área de atuação</h3>
        <p className="text-lg font-bold text-on-surface">{categoryData?.title || expense.category}</p>
        <p className="text-sm text-on-surface-variant">{expense.subCategory || 'Categoria geral'}</p>
      </div>

      {/* Origem do recurso */}
      <div className="bg-white p-6 rounded-[12px] border border-outline-variant shadow-sm flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Origem do recurso</h3>
        <p className="text-lg font-bold text-on-surface">Tesouro Estadual / Repasses</p>
        <p className="text-sm text-on-surface-variant">Recursos destinados ao custeio de atividades relacionadas à {categoryData?.title?.toLowerCase() || 'área'}.</p>
      </div>
    </div>
  );
};
