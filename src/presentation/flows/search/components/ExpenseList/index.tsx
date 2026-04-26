import React, { useState, useMemo, useEffect } from 'react';
import { ExpenseListProps } from './types';
import { ResultCard } from '../ResultCard';
import Fuse from 'fuse.js';

const ITEMS_PER_PAGE = 10;

export const ExpenseList: React.FC<ExpenseListProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when data or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data, searchQuery]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    const fuse = new Fuse(data, {
      keys: ['recipient', 'description'],
      threshold: 0.3,
    });
    
    return fuse.search(searchQuery).map(result => result.item);
  }, [data, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* List Header & Internal Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[12px] border border-outline-variant shadow-sm">
        <div>
          <h3 className="text-xl font-bold text-on-surface">Lista de Despesas</h3>
          <p className="text-sm text-on-surface-variant mt-1">
            Exibindo {paginatedData.length} de {filteredData.length} registros
          </p>
        </div>
        
        <div className="w-full sm:w-auto relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-on-surface-variant">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="Buscar por nome ou descrição..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px] pl-10 pr-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* List Content */}
      <div className="grid grid-cols-1 gap-6 w-full">
        {paginatedData.length > 0 ? (
          paginatedData.map((item) => (
            <ResultCard key={item.id} expense={item} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-outline-variant">
            <h3 className="text-xl font-bold text-on-surface mb-2">Nenhum registro encontrado nesta listagem</h3>
            <p className="text-on-surface-variant max-w-sm mx-auto">
              Sua busca por "{searchQuery}" não retornou resultados na página atual de filtros.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredData.length > 0 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-[12px] border border-outline-variant shadow-sm mt-2">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary disabled:text-outline disabled:cursor-not-allowed hover:bg-primary-container hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Anterior
          </button>

          <div className="text-sm font-medium text-on-surface-variant">
            Página <span className="font-bold text-on-surface">{currentPage}</span> de <span className="font-bold text-on-surface">{totalPages}</span>
          </div>

          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary disabled:text-outline disabled:cursor-not-allowed hover:bg-primary-container hover:bg-opacity-20 rounded-lg transition-colors"
          >
            Próxima
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      )}
    </div>
  );
};
