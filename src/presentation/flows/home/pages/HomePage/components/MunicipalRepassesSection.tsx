import React from 'react';

export const MunicipalRepassesSection: React.FC = () => {
  return (
    <section className="py-20 bg-primary-container bg-opacity-10">
      <div className="app-container text-center">
        <h2 className="text-3xl md:text-[40px] font-bold text-on-title mb-6 leading-tight">
          Quer uma análise mais detalhada?
        </h2>
        
        <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed mb-10 max-w-2xl mx-auto">
          Para quem busca dados técnicos aprofundados, relatórios completos e uma visão voltada para especialistas, acesse a versão completa do nosso portal.
        </p>
        
        <a 
          href="https://www.transparencia.ma.gov.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-on-primary font-bold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all text-lg"
        >
          Acessar Portal da Transparência
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </section>
  );
};
