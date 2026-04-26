import React from 'react';

const INDICATORS = [
  { label: 'Total despesas 2025', value: 'R$ 12,4 bi' },
  { label: 'Servidores ativos', value: '42 mil' },
  { label: 'Contratos vigentes', value: '1.250' },
  { label: 'Obras em andamento', value: '342' },
];

interface IndicatorsSectionProps {
  className?: string;
}

export const IndicatorsSection: React.FC<IndicatorsSectionProps> = ({ className }) => {
  return (
    <section className={`w-full ${className}`}>
      <div className="app-container">
        <div className="bg-white rounded-[12px] border border-outline-variant shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-outline-variant">
            {INDICATORS.map((indicator) => (
              <div
                key={indicator.label}
                className="flex flex-col items-center justify-center p-6 md:p-8"
              >
                <span className="text-3xl md:text-[32px] font-bold text-primary leading-tight mb-2">
                  {indicator.value}
                </span>
                <span className="text-sm font-semibold text-on-surface-variant text-center max-w-[150px]">
                  {indicator.label}
                </span>
              </div>
            ))}
          </div>
          <div className="py-4 px-6 text-center border-t border-outline-variant/30">
            <p className="text-[12px] font-semibold text-[#BBCAC1]">
              Dados atualizados em tempo real. Última atualização: 25/04/2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
