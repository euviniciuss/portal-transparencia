import React from 'react';

export const MunicipalRepassesSection: React.FC = () => {
  return (
    <section className="py-20 bg-primary-container bg-opacity-10">
      <div className="app-container text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Veja como o dinheiro público chega ao seu município
        </h2>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
          O TranspareCI facilita o acompanhamento de repasses e investimentos estaduais 
          diretamente na sua cidade, traduzindo termos técnicos para linguagem clara.
        </p>
        <button className="px-8 py-4 bg-primary text-on-primary font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-md">
          Consultar meu município
        </button>
      </div>
    </section>
  );
};
