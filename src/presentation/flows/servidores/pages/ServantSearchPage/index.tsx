'use client';

import React, { useState, useCallback } from 'react';
import { Header } from '@flows/home/components/Header';
import { Footer } from '@flows/home/components/Footer';
import { ServantSearchForm } from '@flows/servidores/components/ServantSearchForm';
import { ServantCard } from '@flows/servidores/components/ServantCard';
import { ServantOverview } from '@flows/servidores/components/ServantOverview';
import { ServantGlossary } from '@flows/servidores/components/ServantGlossary';
import { searchServants } from '@lib/mocks/servants-data';
import { ServantDetail } from '@lib/types/servants';

export const ServantSearchPage: React.FC = () => {
  const [results, setResults] = useState<ServantDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback((query: string) => {
    setSearchTerm(query);
    setHasSearched(true);
    const found = searchServants(query);
    setResults(found);
  }, []);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    setHasSearched(false);
    setResults([]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="w-full py-12 md:py-20 bg-gradient-to-b from-primary/5 to-surface">
          <div className="app-container">
            <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-3">
                Consulte servidores públicos do Maranhão
              </h1>
              <p className="text-base md:text-lg text-on-surface-variant mb-8 max-w-xl">
                Busque por nome, cargo ou órgão para visualizar informações sobre remuneração de forma clara e transparente.
              </p>

              <div className="w-full max-w-2xl">
                <ServantSearchForm onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-8 md:py-12">
          <div className="app-container max-w-3xl mx-auto">
            {hasSearched && (
              <>
                {/* Result count + Clear */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <p className="text-on-surface-variant text-sm md:text-base">
                    {results.length > 0 ? (
                      <>
                        Resultados para <strong className="text-on-surface">&quot;{searchTerm}&quot;</strong>
                        {' '}— <strong>{results.length}</strong> servidor{results.length !== 1 ? 'es' : ''} encontrado{results.length !== 1 ? 's' : ''}
                      </>
                    ) : (
                      <>
                        Nenhum servidor encontrado para <strong className="text-on-surface">&quot;{searchTerm}&quot;</strong>
                      </>
                    )}
                  </p>

                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex items-center gap-1.5 text-sm font-semibold text-error hover:text-error/80 transition-colors whitespace-nowrap"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    Limpar busca
                  </button>
                </div>

                {/* Overview Stats (Figma: Section - Visão Geral) */}
                <ServantOverview results={results} />

                {/* Cards */}
                {results.length > 0 ? (
                  <div className="space-y-4">
                    {results.map((servant, index) => (
                      <ServantCard
                        key={servant.id}
                        servant={servant}
                        defaultExpanded={index === 0}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border border-outline-variant">
                    <div className="w-16 h-16 rounded-full bg-surface-container mx-auto flex items-center justify-center mb-4" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                    </div>
                    <h3 className="font-bold text-on-surface mb-2">Nenhum resultado encontrado</h3>
                    <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
                      Tente buscar por outro nome, cargo ou órgão. Exemplo: &quot;professor&quot;, &quot;enfermeira&quot; ou &quot;Secretaria de Saúde&quot;.
                    </p>
                  </div>
                )}

                {/* Glossary */}
                <div className="mt-8">
                  <ServantGlossary />
                </div>
              </>
            )}

            {/* Initial state (before search) */}
            {!hasSearched && (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-primary/5 mx-auto flex items-center justify-center mb-5" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <h3 className="font-bold text-on-surface text-lg mb-2">Faça uma busca para começar</h3>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto mb-6">
                  Digite o nome, cargo ou órgão de um servidor público no campo acima para consultar as informações de remuneração.
                </p>

                {/* Quick search suggestions */}
                <div className="flex flex-wrap justify-center gap-2">
                  {['professor', 'enfermeira', 'auditor', 'analista'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleSearch(term)}
                      className="px-4 py-2 bg-white border border-outline-variant rounded-full text-sm font-semibold text-on-surface-variant hover:border-primary hover:text-primary transition-all shadow-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
