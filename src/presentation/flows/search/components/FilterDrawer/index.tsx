'use client';

import React from 'react';
import { CategoryType } from '@lib/types/search';
import { categories } from '@lib/mocks/search-data';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    category: string;
    year: string;
    status: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange,
  onClearFilters
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const years = ['2026', '2025', '2024', '2023'];
  const statuses = ['pago', 'empenhado', 'liquidado', 'cancelado'];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
          onClick={handleBackdropClick}
        />
      )}

      {/* Drawer / Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:w-full lg:shadow-none lg:bg-transparent lg:z-auto
        flex flex-col h-full lg:h-auto overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-bold text-on-surface">Filtros</h2>
            <button onClick={onClose} className="text-on-surface-variant p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className="hidden lg:flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-on-surface">Filtros</h2>
            <button onClick={onClearFilters} className="text-sm font-semibold text-primary hover:underline">
              Limpar
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4">Categoria</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="category" 
                  value=""
                  checked={filters.category === ''}
                  onChange={() => onFilterChange('category', '')}
                  className="w-5 h-5 text-primary focus:ring-primary border-outline-variant"
                />
                <span className="text-on-surface group-hover:text-primary transition-colors">Todas as áreas</span>
              </label>
              {categories.map((cat) => (
                <label key={cat.type} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    value={cat.type}
                    checked={filters.category === cat.type}
                    onChange={() => onFilterChange('category', cat.type)}
                    className="w-5 h-5 text-primary focus:ring-primary border-outline-variant"
                  />
                  <span className="text-on-surface group-hover:text-primary transition-colors">{cat.title}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4">Ano do Exercício</h3>
            <select 
              value={filters.year}
              onChange={(e) => onFilterChange('year', e.target.value)}
              className="w-full p-3 rounded-xl border border-outline-variant focus:border-primary focus:outline-none bg-white text-on-surface"
            >
              <option value="">Todos os anos</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4">Situação (Status)</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => onFilterChange('status', '')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${filters.status === '' ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface-variant border-outline-variant hover:border-primary'}`}
              >
                Todos
              </button>
              {statuses.map(status => (
                <button 
                  key={status}
                  onClick={() => onFilterChange('status', status)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all border ${filters.status === status ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface-variant border-outline-variant hover:border-primary'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile Sticky Footer */}
        <div className="lg:hidden p-4 border-t border-outline-variant bg-surface sticky bottom-0">
          <div className="flex gap-4">
            <button 
              onClick={onClearFilters}
              className="flex-1 py-3 px-4 bg-white border border-outline-variant text-on-surface-variant font-bold rounded-xl"
            >
              Limpar
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-primary text-white font-bold rounded-xl shadow-md"
            >
              Ver resultados
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
