'use client';

import React, { useState } from 'react';
import { ServantCardProps } from '@flows/servidores/types';
import { SalaryComposition } from '@flows/servidores/components/SalaryComposition';
import { SalaryHistoryChart } from '@flows/servidores/components/SalaryHistoryChart';

const EMPLOYMENT_LABELS: Record<string, { label: string; className: string }> = {
  efetivo: { label: 'Efetivo', className: 'bg-primary/10 text-primary' },
  comissionado: { label: 'Comissionado', className: 'bg-warning/10 text-warning' },
  temporario: { label: 'Temporário', className: 'bg-tertiary/10 text-tertiary' },
};

const formatBRL = (value: number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const ServantCard: React.FC<ServantCardProps> = ({ servant, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const grossSalary = servant.salary.baseSalary + servant.salary.gratuities;
  const badge = EMPLOYMENT_LABELS[servant.employmentType] ?? EMPLOYMENT_LABELS.efetivo;

  return (
    <article className="bg-white rounded-2xl border border-outline-variant shadow-sm overflow-hidden transition-all">
      {/* Header — always visible */}
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
          {/* Avatar circle */}
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-lg" aria-hidden="true">
            {servant.name.charAt(0)}
          </div>

          {/* Info */}
          <div className="flex-grow min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-base md:text-lg font-bold text-on-surface truncate">
                {servant.name}
              </h3>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${badge.className}`}>
                {badge.label}
              </span>
            </div>

            <p className="text-sm text-on-surface-variant">
              {servant.position} {servant.level} • {servant.department}
            </p>

            <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Lotação: {servant.location}
            </p>
          </div>

          {/* Salary summary (right side) */}
          <div className="text-left sm:text-right flex-shrink-0 mt-2 sm:mt-0">
            <p className="text-xs text-on-surface-variant">Remuneração Líquida</p>
            <p className="text-lg md:text-xl font-bold text-primary">{formatBRL(servant.netSalary)}</p>
            <p className="text-xs text-on-surface-variant">
              Bruta: {formatBRL(grossSalary)}
            </p>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          {isExpanded ? 'Ocultar detalhes' : 'Ver detalhes completos'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Expandable detail section */}
      {isExpanded && (
        <div className="border-t border-outline-variant px-4 md:px-6 py-5 space-y-6 bg-surface/50">
          <SalaryComposition salary={servant.salary} />
          <SalaryHistoryChart history={servant.history} />
        </div>
      )}
    </article>
  );
};
