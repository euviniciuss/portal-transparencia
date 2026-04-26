import React, { useState, useEffect } from 'react';
import { ExpenseDetail } from '@lib/types/search';

interface PaymentComparisonsProps {
  expense: ExpenseDetail;
}

const MINIMUM_WAGE = 1412; // Salário mínimo em 2024/2025

export const PaymentComparisons: React.FC<PaymentComparisonsProps> = ({ expense }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const amount = expense.amount;
  const salariosMinimos = Math.round(amount / MINIMUM_WAGE);

  let categoryEquivalent = {
    value: 0,
    label: ''
  };

  switch (expense.category) {
    case 'saude':
      categoryEquivalent = {
        value: Math.max(1, Math.round(amount / 500000)),
        label: 'Meses de funcionamento de uma UPA média'
      };
      break;
    case 'educacao':
      categoryEquivalent = {
        value: Math.max(1, Math.round(amount / 5)),
        label: 'Refeições escolares servidas'
      };
      break;
    case 'seguranca':
      categoryEquivalent = {
        value: Math.max(1, Math.round(amount / 150000)),
        label: 'Viaturas policiais equipadas'
      };
      break;
    case 'obras':
      categoryEquivalent = {
        value: Math.max(1, Math.round(amount / 1000000)),
        label: 'Km de rodovias pavimentadas'
      };
      break;
    default:
      categoryEquivalent = {
        value: Math.max(1, Math.round(amount / 600)),
        label: 'Bolsas de auxílio social mensais'
      };
      break;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="bg-surface-container-low border border-outline-variant p-6 md:p-8 rounded-[12px] flex flex-col gap-6 w-full mt-8">
      <h2 className="text-2xl font-bold text-primary">Para você entender melhor</h2>
      <p className="text-lg text-on-surface">
        O valor de <strong className="text-primary">{formatCurrency(amount)}</strong> equivale aproximadamente a:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Box 1: Salários Mínimos */}
        <div className="bg-white border border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center text-center gap-2 shadow-sm">
          <span className="text-4xl font-bold text-primary">~{salariosMinimos.toLocaleString('pt-BR')}</span>
          <span className="text-base text-on-surface-variant font-medium">Salários mínimos</span>
        </div>

        {/* Box 2: Equivalência de Categoria */}
        <div className="bg-white border border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center text-center gap-2 shadow-sm">
          <span className="text-4xl font-bold text-primary">~{categoryEquivalent.value.toLocaleString('pt-BR')}</span>
          <span className="text-base text-on-surface-variant font-medium">{categoryEquivalent.label}</span>
        </div>

        {/* Box 3: Porcentagem (Random for mock) */}
        <div className="bg-white border border-outline-variant rounded-lg p-6 flex flex-col items-center justify-center text-center gap-2 shadow-sm sm:col-span-2 lg:col-span-1">
          <span className="text-4xl font-bold text-primary">{(amount / 1500000000).toFixed(4)}%</span>
          <span className="text-base text-on-surface-variant font-medium">Do total gasto nesta área em {expense.year}</span>
        </div>

      </div>
    </div>
  );
};
