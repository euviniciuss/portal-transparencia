import React from 'react';
import Link from 'next/link';
import { CategorySummary } from '@lib/types/search';

interface CategoryCardProps {
  category: CategorySummary;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      href={`/search?category=${category.type}`}
      className="group p-6 rounded-2xl bg-white border border-outline-variant hover:border-primary hover:shadow-lg transition-all flex flex-col gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center text-2xl group-hover:bg-primary-container group-hover:scale-110 transition-transform">
        {category.icon}
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
          {category.title}
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="mt-auto pt-4 flex items-center text-primary font-bold text-sm">
        Acessar categoria
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </Link>
  );
};
