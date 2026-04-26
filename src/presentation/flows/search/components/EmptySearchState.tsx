import React from 'react';
import { useRouter } from 'next/navigation';

export const EmptySearchState: React.FC<{ query: string }> = ({ query }) => {
  const router = useRouter();

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const suggestions = [
    'Gastos com saúde',
    'Educação 2026',
    'Obras públicas',
    'Contratos de infraestrutura'
  ];

  return (
    <div className="w-full bg-white rounded-[24px] border border-outline-variant p-12 flex flex-col items-center justify-center text-center shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]">
      <div className="w-20 h-20 bg-primary-container bg-opacity-20 text-primary rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>
      
      <h3 className="text-2xl font-bold text-on-title mb-4">
        Nenhum registro encontrado
      </h3>
      
      <p className="text-on-surface-variant text-lg max-w-lg mb-8 leading-relaxed">
        Não conseguimos encontrar resultados na nossa base para <strong>"{query}"</strong>. 
        Verifique se há erros de digitação ou tente usar termos mais genéricos.
      </p>

      <div className="w-full max-w-md">
        <h4 className="text-sm font-bold text-[#3C4A43] uppercase tracking-wider mb-4">
          Sugestões de pesquisa
        </h4>
        <div className="flex flex-wrap justify-center gap-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-5 py-2.5 bg-[#F8F9FA] border border-outline-variant rounded-full text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
