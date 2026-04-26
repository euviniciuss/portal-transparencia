import React from 'react';

const FEATURES = [
  {
    title: 'Salários dos Servidores',
    description: 'Consulte a remuneração de quem trabalha para o Estado.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
    ),
    color: '#D81A21',
  },
  {
    title: 'Investimento em Pessoal',
    description: 'Veja o total de gastos com recursos humanos e equipes.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    color: '#006394',
  },
  {
    title: 'Contas e Despesas',
    description: 'Acompanhe os gastos detalhados de cada secretaria e órgão do governo.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
    ),
    color: '#1BA35A',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="app-container">
        <h2 className="text-2xl md:text-[24px] font-bold text-on-title text-center mb-12 md:mb-16">
          O que você encontra por aqui?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature) => (
            <div 
              key={feature.title}
              className="relative bg-white rounded-[12px] border border-outline-variant shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] p-6 md:p-8 overflow-hidden group hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              {/* Decorative Solid Circle in top right */}
              <div 
                className="absolute top-[-23px] right-[-23px] w-24 h-24 rounded-full pointer-events-none transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: feature.color }}
              />
              
              <div className="w-12 h-12 bg-[#F0EDED] rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-3">
                {feature.title}
              </h3>
              
              <p className="text-base text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
