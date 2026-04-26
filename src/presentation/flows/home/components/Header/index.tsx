import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-surface border-b border-outline-variant py-4">
      <div className="app-container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary font-bold">
            T
          </div>
          <span className="text-xl font-bold text-primary tracking-tight">TranspareCI</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
          <a href="#" className="hover:text-primary transition-colors">Institucional</a>
          <a href="#" className="hover:text-primary transition-colors">Transparência</a>
          <a href="#" className="hover:text-primary transition-colors">Acessibilidade</a>
        </nav>

        <button className="md:hidden p-2 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </header>
  );
};
