'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { SalaryHistoryChartProps } from '@flows/servidores/types';

const MONTH_LABELS = [
  '', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

const formatBRL = (value: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);

interface TooltipPayloadEntry {
  payload: { label: string; grossSalary: number; netSalary: number };
  dataKey: string;
  value: number;
  color: string;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
}) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-white p-3 border border-outline-variant rounded-xl shadow-lg text-sm">
      <p className="font-bold text-on-surface mb-1">{data.label}</p>
      <p className="text-primary">Bruto: {formatBRL(data.grossSalary)}</p>
      <p className="text-tertiary">Líquido: {formatBRL(data.netSalary)}</p>
    </div>
  );
};

export const SalaryHistoryChart: React.FC<SalaryHistoryChartProps> = ({ history }) => {
  const chartData = history.map((entry) => ({
    label: `${MONTH_LABELS[entry.month]}/${String(entry.year).slice(-2)}`,
    grossSalary: entry.grossSalary,
    netSalary: entry.netSalary,
  }));

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-on-surface">Histórico (Últimos 6 meses)</h4>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e2e1" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6c7a72', fontSize: 11 }}
              dy={6}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6c7a72', fontSize: 11 }}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f6f3f2' }} />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
              formatter={(value: string) =>
                value === 'grossSalary' ? 'Bruto' : 'Líquido'
              }
            />
            <Bar dataKey="grossSalary" fill="#006394" radius={[3, 3, 0, 0]} name="grossSalary" />
            <Bar dataKey="netSalary" fill="#4A90E2" radius={[3, 3, 0, 0]} name="netSalary" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
