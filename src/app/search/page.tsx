'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { Header } from '@flows/home/components/Header';
import { Footer } from '@flows/home/components/Footer';
import { mockExpenses, categories, mockCategoryInsights } from '@lib/mocks/search-data';
import { parseNaturalLanguageQuery } from '@lib/utils/queryParser';
import { FilterDrawer } from '@flows/search/components/FilterDrawer';
import { ExpenseChart } from '@flows/search/components/ExpenseChart';
import { ResultCard } from '@flows/search/components/ResultCard';
import { DirectAnswerBento } from '@flows/search/components/DirectAnswerBento';
import { SearchActionBanner } from '@flows/search/components/SearchActionBanner';
import { TopRecipientsCard } from '@flows/search/components/TopRecipientsCard';
import { TopMunicipalityCard } from '@flows/search/components/TopMunicipalityCard';
import { ExpenseList } from '@flows/search/components/ExpenseList';
import { EmptySearchState } from '@flows/search/components/EmptySearchState';
import { CategoryType } from '@lib/types/search';
import { exportToCSV, exportToPDF } from '@lib/utils/exportData';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawQuery = searchParams.get('q') || '';
  const paramCategory = searchParams.get('category') || '';
  const paramYear = searchParams.get('year') || '';
  const paramStatus = searchParams.get('status') || '';
  const paramMunicipality = searchParams.get('municipality') || '';

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const parsedInitial = useMemo(() => parseNaturalLanguageQuery(rawQuery), [rawQuery]);

  const [filters, setFilters] = useState({
    category: paramCategory || parsedInitial.category || '',
    year: paramYear || (parsedInitial.year ? parsedInitial.year.toString() : ''),
    status: paramStatus || '',
    municipality: paramMunicipality || '',
    term: parsedInitial.term || ''
  });

  useEffect(() => {
    const newParsed = parseNaturalLanguageQuery(rawQuery);
    setFilters({
      category: paramCategory || newParsed.category || '',
      year: paramYear || (newParsed.year ? newParsed.year.toString() : ''),
      status: paramStatus || '',
      municipality: paramMunicipality || '',
      term: newParsed.term || ''
    });
  }, [rawQuery, paramCategory, paramYear, paramStatus, paramMunicipality]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Rebuild params from scratch to avoid stale params from the original query URL
    const params = new URLSearchParams();
    if (rawQuery) params.set('q', rawQuery);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.year) params.set('year', newFilters.year);
    if (newFilters.status) params.set('status', newFilters.status);
    if (newFilters.municipality) params.set('municipality', newFilters.municipality);

    router.replace(`/search?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setFilters({ category: '', year: '', status: '', municipality: '', term: '' });
    router.replace('/search');
  };

  const filteredResults = useMemo(() => {
    let results = mockExpenses;

    if (filters.category) {
      results = results.filter(item => item.category === filters.category);
    }
    if (filters.year) {
      results = results.filter(item => item.year.toString() === filters.year);
    }
    if (filters.status) {
      results = results.filter(item => item.status === filters.status);
    }
    if (filters.municipality) {
      results = results.filter(item => item.municipality === filters.municipality);
    }

    if (filters.term) {
      const fuse = new Fuse(results, {
        keys: ['recipient', 'description', 'municipality'],
        threshold: 0.3,
      });
      results = fuse.search(filters.term).map(result => result.item);
    }

    return results;
  }, [filters]);

  const activeCategory = useMemo(() => {
    return categories.find(c => c.type === filters.category);
  }, [filters.category]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const activeInsights = useMemo(() => {
    if (filters.category && mockCategoryInsights[filters.category as CategoryType]) {
      return mockCategoryInsights[filters.category as CategoryType];
    }
    return mockCategoryInsights.global;
  }, [filters.category]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      <main className="flex-grow py-8 md:py-12">
        <div className="app-container">
          
          {/* Header Area */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {activeCategory ? `Resultados: ${activeCategory.title}` : 'Resultados da Busca'}
              </h1>
              <p className="text-on-surface-variant text-lg">
                {rawQuery && <span className="block mb-1">Buscando por: <strong>&quot;{rawQuery}&quot;</strong></span>}
                {filters.municipality && (
                  <span className="inline-flex items-center gap-1.5 mb-1 bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {filters.municipality}
                  </span>
                )}
                Encontrados <strong>{filteredResults.length}</strong> registros
              </p>
            </div>
            
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 py-3 px-6 bg-white border border-outline-variant rounded-xl font-bold text-on-surface shadow-sm hover:border-primary transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filtrar Resultados
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar / Drawer */}
            <div className="lg:w-1/4 flex-shrink-0">
              <FilterDrawer 
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4 flex-col flex gap-8">
              {filteredResults.length === 0 ? (
                <EmptySearchState query={rawQuery || filters.term} />
              ) : (
                <>
                  {/* Direct Answer Bento */}
                  <DirectAnswerBento insights={activeInsights} firstExpenseId={filteredResults[0]?.id} />
                  
                  {/* Chart Section */}
                  <ExpenseChart data={filteredResults} />

                  {/* Recipients + Municipality side by side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TopRecipientsCard data={filteredResults} activeCategory={activeCategory} />
                    <TopMunicipalityCard data={filteredResults} />
                  </div>

                  {/* Paginated Results List */}
                  <ExpenseList data={filteredResults} />

                  {/* Action Banner (Feedback/Downloads) */}
                  <SearchActionBanner 
                    onDownloadCSV={() => exportToCSV(filteredResults, 'stc-export-dados')}
                    onDownloadPDF={() => exportToPDF(
                      filteredResults, 
                      'stc-relatorio-dados', 
                      activeCategory ? `Relatório: ${activeCategory.title}` : 'Relatório de Dados Abertos'
                    )}
                  />
                </>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center text-primary font-bold">Carregando dados...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
