'use client';

import React, { useMemo } from 'react';
import { ServantDetail } from '@lib/types/servants';

interface ServantOverviewProps {
  results: ServantDetail[];
}

interface StatCard {
  label: string;
  value: string;
  highlight?: boolean;
}

const formatBRL = (value: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);

export const ServantOverview: React.FC<ServantOverviewProps> = ({ results }) => {
  const stats = useMemo<StatCard[]>(() => {
    if (results.length === 0) return [];

    const grossSalaries = results.map(
      (s) => s.salary.baseSalary + s.salary.gratuities
    );
    const avg = grossSalaries.reduce((a, b) => a + b, 0) / grossSalaries.length;
    const min = Math.min(...grossSalaries);
    const max = Math.max(...grossSalaries);

    return [
      {
        label: 'Servidores Encontrados',
        value: results.length.toLocaleString('pt-BR'),
      },
      {
        label: 'Remuneração Média',
        value: formatBRL(avg),
        highlight: true,
      },
      {
        label: 'Menor Remuneração',
        value: formatBRL(min),
      },
      {
        label: 'Maior Remuneração',
        value: formatBRL(max),
      },
    ];
  }, [results]);

  if (stats.length === 0) return null;

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6" aria-label="Visão geral dos servidores">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface border border-outline-variant rounded-xl p-4 shadow-sm flex flex-col gap-1"
        >
          <span className="text-xs text-secondary leading-snug">{stat.label}</span>
          <span
            className={`text-xl md:text-2xl lg:text-3xl font-bold leading-tight ${
              stat.highlight ? 'text-primary' : 'text-on-surface'
            }`}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </section>
  );
};
