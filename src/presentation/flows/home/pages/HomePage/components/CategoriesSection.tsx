import React from 'react';
import { CategoryCard } from '@flows/home/components/CategoryCard';
import { categories } from '@lib/mocks/search-data';

export const CategoriesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="app-container">
        <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-8 md:mb-12">
          Explore por categorias
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.type} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
