'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const COMMON_QUESTIONS = [
  'Gastos com saúde',
  'Gastos com educação',
  'Salário de servidores',
  'Contratos do estado',
  'Obras públicas',
  'Emendas parlamentares'
];

export const HeroSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent, customQuery?: string) => {
    e?.preventDefault();
    const finalQuery = customQuery || query;
    if (finalQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(finalQuery.trim())}`);
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-surface">
      <div className="app-container">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4 text-center">
            O que você quer descobrir hoje?
          </h1>
          <p className="text-lg md:text-xl text-[#333333] mb-10 text-center max-w-2xl">
            Consulte os gastos, contratos e servidores do Estado do Maranhão em linguagem simples.
          </p>

          <div className="w-full max-w-3xl mb-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: Quanto o estado gastou em saúde em 2026?"
                className="w-full h-16 pl-14 pr-32 rounded-full bg-white border border-outline-variant focus:border-primary focus:outline-none text-on-surface text-lg shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-8 bg-primary text-on-primary font-bold rounded-full hover:bg-opacity-90 transition-all shadow-sm"
              >
                Buscar
              </button>
            </form>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {COMMON_QUESTIONS.map((question) => (
              <button
                key={question}
                onClick={(e) => handleSearch(undefined, question)}
                className="px-5 py-2.5 bg-white border border-outline-variant rounded-full text-sm font-semibold text-[#3C4A43] hover:border-primary hover:text-primary transition-all shadow-sm"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
