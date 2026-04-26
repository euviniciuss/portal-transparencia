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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Parse the query once on mount or when URL changes
  const parsedInitial = useMemo(() => parseNaturalLanguageQuery(rawQuery), [rawQuery]);

  const [filters, setFilters] = useState({
    category: paramCategory || parsedInitial.category || '',
    year: paramYear || (parsedInitial.year ? parsedInitial.year.toString() : ''),
    status: paramStatus || '',
    term: parsedInitial.term || ''
  });

  // Sync state if URL changes (like when clicking a badge on Home again)
  useEffect(() => {
    const newParsed = parseNaturalLanguageQuery(rawQuery);
    setFilters({
      category: paramCategory || newParsed.category || '',
      year: paramYear || (newParsed.year ? newParsed.year.toString() : ''),
      status: paramStatus || '',
      term: newParsed.term || ''
    });
  }, [rawQuery, paramCategory, paramYear, paramStatus]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Sync to URL
    const params = new URLSearchParams(searchParams.toString());
    if (newFilters.category) params.set('category', newFilters.category);
    else params.delete('category');

    if (newFilters.year) params.set('year', newFilters.year);
    else params.delete('year');

    if (newFilters.status) params.set('status', newFilters.status);
    else params.delete('status');

    router.replace(`/search?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setFilters({ category: '', year: '', status: '', term: '' });
    router.replace('/search');
  };

  const filteredResults = useMemo(() => {
    let results = mockExpenses;

    // 1. Exact matches (Hard filters)
    if (filters.category) {
      results = results.filter(item => item.category === filters.category);
    }
    if (filters.year) {
      results = results.filter(item => item.year.toString() === filters.year);
    }
    if (filters.status) {
      results = results.filter(item => item.status === filters.status);
    }

    // 2. Fuzzy Search for remaining term
    if (filters.term) {
      const fuse = new Fuse(results, {
        keys: ['recipient', 'description'],
        threshold: 0.3, // 0.0 is exact, 1.0 is very loose
      });
      results = fuse.search(filters.term).map(result => result.item);
    }

    return results;
  }, [filters]);

  const activeCategory = useMemo(() => {
    return categories.find(c => c.type === filters.category);
  }, [filters.category]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Determine which insights to show in the Bento Grid
  const activeInsights = useMemo(() => {
    if (filters.category && mockCategoryInsights[filters.category as CategoryType]) {
      return mockCategoryInsights[filters.category as CategoryType];
    }
    return mockCategoryInsights.global;
  }, [filters.category]);

  if (!isMounted) {
    return null; // Evita erro de hydration
  }

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
                {rawQuery && <span className="block mb-1">Buscando por: <strong>"{rawQuery}"</strong></span>}
                Encontrados <strong>{filteredResults.length}</strong> registros
              </p>
            </div>
            
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 py-3 px-6 bg-white border border-outline-variant rounded-xl font-bold text-on-surface shadow-sm hover:border-primary transition-colors"
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
                  {/* Direct Answer Bento (Always visible, adapts to category or global) */}
                  <DirectAnswerBento insights={activeInsights} firstExpenseId={filteredResults[0]?.id} />
                  
                  {/* Chart Section */}
                  <ExpenseChart data={filteredResults} />

                  {/* Top 5 Recipients */}
                  <TopRecipientsCard data={filteredResults} activeCategory={activeCategory} />

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
