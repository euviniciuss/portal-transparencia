'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { ServantSearchFormValues } from '@lib/types/servants';
import { ServantSearchFormProps } from '@flows/servidores/types';

export const ServantSearchForm: React.FC<ServantSearchFormProps> = ({ onSearch, isLoading }) => {
  const { register, handleSubmit } = useForm<ServantSearchFormValues>({
    defaultValues: { query: '' },
  });

  const onSubmit = (data: ServantSearchFormValues) => {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    onSearch(data.query);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative w-full group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      <input
        type="text"
        {...register('query', { required: true, minLength: 2 })}
        placeholder="Buscar por nome, cargo ou órgão…"
        aria-label="Buscar servidor público"
        className="w-full h-14 md:h-16 pl-14 pr-28 md:pr-32 rounded-full bg-white border border-outline-variant focus:border-primary focus:outline-none text-on-surface text-base md:text-lg shadow-sm transition-all"
        disabled={isLoading}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="absolute right-2 top-2 bottom-2 px-6 md:px-8 bg-primary text-on-primary font-bold rounded-full hover:opacity-90 transition-all shadow-sm disabled:opacity-50"
      >
        {isLoading ? 'Buscando…' : 'Buscar'}
      </button>
    </form>
  );
};
