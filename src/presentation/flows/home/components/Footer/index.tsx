import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-[#E4E2E1] py-12 md:py-16 mt-auto">
      <div className="app-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
          {/* Brand & Logos Section */}
          <div className="flex flex-col items-center md:items-start gap-6 max-w-[420px]">
            <img 
              src="/assets/footer/stc-logo.png" 
              alt="Secretaria de Transparência e Controle" 
              className="h-10 md:h-12 w-auto object-contain"
            />
            <p className="text-[12px] text-[#3C4A43] leading-relaxed text-center md:text-left">
              © Governo do Estado do Maranhão - Secretaria de Transparência e Controle.
            </p>
          </div>

          {/* Contact & Gov Logo Section */}
          <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
            <img 
              src="/assets/footer/gov-logo.png" 
              alt="Governo do Maranhão" 
              className="h-12 md:h-[52px] w-auto object-contain"
            />
            
            <div className="flex flex-col items-center md:items-end">
              <address className="not-italic text-sm md:text-base text-[#3C4A43] leading-relaxed text-center md:text-right mb-4">
                Av. Professor Carlos Cunha s/n, Edifício Nagib Haickel<br />
                Bairro: Calhau, São Luís - Maranhão.
              </address>
              
              <a 
                href="mailto:transparencia@stc.ma.gov.br" 
                className="flex items-center gap-2 text-sm text-[#3C4A43] hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                transparencia@stc.ma.gov.br
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
