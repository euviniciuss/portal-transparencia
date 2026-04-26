'use client';

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ExpenseDetail } from '@lib/types/search';

interface ExpenseChartProps {
  data: ExpenseDetail[];
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    // Group by month/year for the current dataset
    const grouped = data.reduce((acc, curr) => {
      const key = `${curr.year}-${curr.month.toString().padStart(2, '0')}`;
      if (!acc[key]) {
        acc[key] = { name: key, total: 0, count: 0 };
      }
      acc[key].total += curr.amount;
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, { name: string; total: number; count: number }>);

    return Object.values(grouped)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(item => ({
        ...item,
        // Format label: "2026-01" -> "Jan/26"
        label: new Date(`${item.name}-01T12:00:00Z`).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }).replace('.', ''),
        totalFormatted: item.total / 1000000 // In millions for better display
      }));
  }, [data]);

  if (data.length === 0) return null;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-outline-variant rounded-xl shadow-lg">
          <p className="font-bold text-on-surface mb-2">{payload[0].payload.label}</p>
          <p className="text-primary font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(payload[0].payload.total)}
          </p>
          <p className="text-sm text-on-surface-variant mt-1">
            {payload[0].payload.count} registros
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm mb-8">
      <h3 className="text-lg font-bold text-on-surface mb-6">Evolução dos Valores (em milhões de R$)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e2e1" />
            <XAxis 
              dataKey="label" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6c7a72', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6c7a72', fontSize: 12 }}
              tickFormatter={(value) => `R$ ${value}M`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f6f3f2' }} />
            <Bar dataKey="totalFormatted" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#006394" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
