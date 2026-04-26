import React from 'react';
import Link from 'next/link';
import { CategoryInsights } from '@lib/types/search';

interface DirectAnswerBentoProps {
  insights: CategoryInsights;
  firstExpenseId?: string;
}

export const DirectAnswerBento: React.FC<DirectAnswerBentoProps> = ({ insights, firstExpenseId }) => {
  // Formatters
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `R$ ${(value / 1000000000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} bi`;
    }
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} mi`;
    }
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
  };

  return (
    <div className="flex flex-col gap-6 mb-8 w-full">
      {/* Left Card: Summary Insights */}
      <div className="w-full bg-white rounded-[12px] border border-outline-variant shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] p-6 md:p-8 flex flex-col justify-between">
        
        {/* Top Section */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
            <h2 className="text-3xl font-bold text-on-surface">
              {insights.title}
            </h2>
            <div className="inline-flex items-center gap-2 bg-primary-container bg-opacity-20 text-on-primary-container px-3 py-1.5 rounded-full">
              {/* Badge Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
              <span className="text-sm font-semibold tracking-wider">Dado Oficial</span>
            </div>
          </div>

          <div>
            <div className="text-[40px] font-bold text-primary tracking-tight leading-tight">
              {formatCurrency(insights.mainValue)}
            </div>
            <div className="text-lg text-on-surface-variant mt-1">
              {insights.statusText}
            </div>
          </div>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
          
          {/* Box 1: Representatividade */}
          <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Representatividade</div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-on-surface">{formatPercentage(insights.representationPercent)}</span>
              <span className="text-base text-on-surface-variant mb-1">do orçamento</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-surface-container rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${Math.min(100, insights.representationPercent)}%` }}
              />
            </div>
          </div>

          {/* Box 2: Impacto per capita */}
          <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Impacto per capita</div>
            <div className="flex items-end gap-2 mt-auto">
              <span className="text-2xl font-bold text-on-surface">R$ {insights.perCapitaImpact}</span>
              <span className="text-base text-on-surface-variant mb-1">por habitante</span>
            </div>
          </div>

          {/* Box 3: Variação anual */}
          <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">Variação anual</div>
            <div className="flex items-end gap-2 mt-auto">
              <span className={`text-2xl font-bold ${insights.annualVariation > 0 ? 'text-primary' : 'text-error'}`}>
                {insights.annualVariation > 0 ? '↑' : '↓'} {formatPercentage(Math.abs(insights.annualVariation))}
              </span>
              <span className="text-base text-on-surface-variant mb-1">vs. 2025</span>
            </div>
          </div>

        </div>

        {/* Bottom Button */}
        <div className="pt-6 border-t border-outline-variant">
          <Link href={firstExpenseId ? `/payment/${firstExpenseId}` : '/search'}>
            <span className="flex items-center gap-2 px-6 py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary-container hover:bg-opacity-10 transition-colors w-full md:w-auto justify-center cursor-pointer">
              Ver dados técnicos completos
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </Link>
        </div>
      </div>

      {/* Right Card: Distribution Details */}
      <div className="w-full bg-white rounded-[12px] border border-outline-variant shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] p-6 flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <div className="text-secondary p-1 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
          </div>
          <h3 className="text-2xl font-semibold text-on-surface leading-tight">
            {insights.distributionTitle}
          </h3>
        </div>

        <div className="flex flex-col gap-5 mt-2">
          {insights.distribution.map((item, idx) => {
            // Calculate total sum for the distribution percentages
            const totalSum = insights.distribution.reduce((acc, d) => acc + d.amount, 0);
            const percentage = (item.amount / totalSum) * 100;
            
            // Diverse colors from design system for each item
            const barColors = [
              'bg-[#006394]', // primary blue
              'bg-[#4A90E2]', // secondary blue
              'bg-[#006394]', // primary blue
              'bg-[#e5a500]', // tertiary-container
              'bg-[#C2C7D0]', // outline-variant (gray-blue)
            ];
            const color = barColors[idx % barColors.length];
            
            return (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[14px]">
                  <span className="font-semibold text-on-surface">{item.label}</span>
                  <span className="font-bold text-on-surface">{formatCurrency(item.amount)}</span>
                </div>
                <div className="w-full h-2 bg-[#F0EDED] rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`} 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
