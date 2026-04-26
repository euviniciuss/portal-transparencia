'use client';

import React from 'react';
import { SalaryCompositionProps } from '@flows/servidores/types';

const formatBRL = (value: number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const SalaryComposition: React.FC<SalaryCompositionProps> = ({ salary }) => {
  const grossSalary = salary.baseSalary + salary.gratuities;
  const basePercent = Math.round((salary.baseSalary / grossSalary) * 100);
  const gratPercent = Math.round((salary.gratuities / grossSalary) * 100);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-on-surface mb-3">Composição Salarial</h4>

      {/* Stacked bar */}
      <div className="w-full h-3 rounded-full overflow-hidden flex bg-surface-container">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${basePercent}%` }}
          aria-label={`Vencimento base: ${basePercent}%`}
        />
        <div
          className="h-full bg-tertiary transition-all"
          style={{ width: `${gratPercent}%` }}
          aria-label={`Gratificações: ${gratPercent}%`}
        />
      </div>

      {/* Legend items */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="w-3 h-3 rounded-full bg-primary inline-block" />
            Vencimento Base
          </span>
          <span className="font-bold text-on-surface">{formatBRL(salary.baseSalary)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="w-3 h-3 rounded-full bg-tertiary inline-block" />
            Gratificações (+)
          </span>
          <span className="font-bold text-tertiary">{formatBRL(salary.gratuities)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-on-surface-variant">
            <span className="w-3 h-3 rounded-full bg-error inline-block" />
            Descontos (−)
          </span>
          <span className="font-bold text-error">{formatBRL(salary.discounts)}</span>
        </div>
      </div>
    </div>
  );
};
