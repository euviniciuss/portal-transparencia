'use client';

import React, { useState } from 'react';

interface GlossaryItem {
  term: string;
  definition: string;
}

const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'Remuneração Bruta',
    definition:
      'Valor total do salário antes de qualquer desconto oficial (IRRF, previdência, etc).',
  },
  {
    term: 'Remuneração Líquida',
    definition:
      'Valor que o servidor efetivamente recebe após os descontos legais obrigatórios.',
  },
  {
    term: 'Efetivo',
    definition: 'Servidor aprovado em concurso público com estabilidade funcional.',
  },
  {
    term: 'Comissionado',
    definition:
      'Cargo de livre nomeação e exoneração, sem necessidade de concurso público.',
  },
  {
    term: 'Temporário',
    definition:
      'Contratado por tempo determinado para atender necessidade temporária de excepcional interesse público.',
  },
  {
    term: 'Gratificações',
    definition:
      'Adicionais ao salário base como insalubridade, periculosidade, tempo de serviço e gratificação de função.',
  },
];

export const ServantGlossary: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 md:p-5 text-left hover:bg-surface/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
        </span>
        <span className="font-bold text-on-surface text-sm md:text-base flex-grow">
          O que significam esses termos?
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-on-surface-variant transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-outline-variant px-4 md:px-5 py-4 space-y-4">
          {GLOSSARY_ITEMS.map((item) => (
            <div key={item.term}>
              <dt className="text-sm font-bold text-primary">{item.term}</dt>
              <dd className="text-sm text-on-surface-variant mt-0.5">
                {item.definition}
              </dd>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
