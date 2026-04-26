import React from 'react';
import { BrandStrip } from '@flows/home/components/BrandStrip';

export const AboutPortalSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-surface">
      <div className="app-container">
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-4xl">
          <BrandStrip className="w-[198px] md:w-[265px] mb-6 md:mb-8" />
          
          <h2 className="text-3xl md:text-[40px] font-bold text-on-title leading-tight md:leading-[1.32] tracking-[0.7%] mb-6 md:mb-10">
            Portal da Transparência: O Governo do Maranhão aberto para você
          </h2>
          
          <p className="text-lg md:text-xl text-on-title font-normal leading-relaxed md:leading-[1.42] tracking-[1.4%] max-w-3xl">
            O Portal da Transparência é a sua ferramenta para acompanhar, de forma clara e direta, como o Governo do Estado utiliza os recursos públicos. Nosso compromisso é garantir que você saiba exatamente onde e como o dinheiro dos impostos está sendo investido.
          </p>
        </div>
      </div>
    </section>
  );
};
