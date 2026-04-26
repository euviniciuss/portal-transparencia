import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-secondary py-16 mt-auto">
      <div className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-on-secondary">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary font-bold">
                T
              </div>
              <span className="text-xl font-bold tracking-tight">TranspareCI</span>
            </div>
            <p className="max-w-md text-secondary-container opacity-80 leading-relaxed mb-6">
              O TranspareCI é uma camada cidadã do Portal da Transparência do Estado do Maranhão, 
              focada em levar clareza e acessibilidade aos dados públicos.
            </p>
            <div className="font-bold text-lg">São Luís - MA</div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Acesso Rápido</h4>
            <ul className="flex flex-col gap-4 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Institucional</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Transparência</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Dados Abertos</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Acessibilidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contato</h4>
            <ul className="flex flex-col gap-4 text-sm opacity-80">
              <li>
                <a href="mailto:transparencia@stc.ma.gov.br" className="flex items-center gap-2 hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  transparencia@stc.ma.gov.br
                </a>
              </li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Ouvidoria Geral</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacidade</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-on-secondary border-opacity-10 text-center text-sm opacity-60">
          © 2026 Estado do Maranhão. Secretaria de Transparência e Controle.
        </div>
      </div>
    </footer>
  );
};
