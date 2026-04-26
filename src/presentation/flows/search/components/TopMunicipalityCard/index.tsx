'use client';

import React, { useMemo } from 'react';
import { ExpenseDetail } from '@lib/types/search';
import { getMunicipalityStats } from '@lib/mocks/municipalities-data';

interface TopMunicipalityCardProps {
  data: ExpenseDetail[];
}

const formatCurrency = (value: number): string => {
  if (value >= 1_000_000_000) return `R$ ${(value / 1_000_000_000).toFixed(1).replace('.', ',')} bi`;
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1).replace('.', ',')} mi`;
  return `R$ ${value.toLocaleString('pt-BR')}`;
};

export const TopMunicipalityCard: React.FC<TopMunicipalityCardProps> = ({ data }) => {
  const stats = useMemo(() => getMunicipalityStats(data).slice(0, 6), [data]);

  if (stats.length === 0) return null;

  const [top, ...rest] = stats;
  const maxAmount = top.totalAmount;

  return (
    <div className="bg-white rounded-3xl border border-outline-variant shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4 flex items-start gap-4">
        <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-primary">
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-on-surface leading-tight">Gastos por Município</h2>
          <p className="text-sm text-on-surface-variant mt-0.5">Distribuição de despesas por localidade</p>
        </div>
      </div>

      {/* Top Municipality Highlight */}
      <div className="mx-6 mb-5 rounded-2xl bg-primary/5 border border-primary/15 p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Mais requisitado</span>
          <span className="text-xs font-semibold text-on-surface-variant bg-white border border-outline-variant rounded-full px-2 py-0.5">
            {top.count} registros
          </span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-on-surface">{top.municipality}</p>
            <p className="text-sm text-on-surface-variant">{top.percentage.toFixed(1)}% do total filtrado</p>
          </div>
          <p className="text-lg font-bold text-primary">{formatCurrency(top.totalAmount)}</p>
        </div>
        {/* Bar reflects actual % of total */}
        <div className="mt-3 h-2 bg-primary/15 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(top.percentage, 100)}%` }} />
        </div>
      </div>

      {/* Remaining municipalities */}
      <div className="px-6 pb-6 flex flex-col gap-3">
        {rest.map((item) => (
          <div key={item.municipality}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-on-surface truncate max-w-[60%]">{item.municipality}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant">{item.count} reg.</span>
                <span className="text-sm font-bold text-on-surface">{formatCurrency(item.totalAmount)}</span>
              </div>
            </div>
            <div className="h-1.5 bg-outline-variant/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary/50 rounded-full transition-all duration-500"
                style={{ width: `${(item.totalAmount / maxAmount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
