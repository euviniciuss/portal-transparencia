import React from 'react';
import { Header } from '@flows/home/components/Header';
import { HeroSection } from '@flows/home/components/HeroSection';
import { Footer } from '@flows/home/components/Footer';
import { MunicipalRepassesSection } from './components/MunicipalRepassesSection';
import { IndicatorsSection } from './components/IndicatorsSection';
import { AboutPortalSection } from './components/AboutPortalSection';
import { FeaturesSection } from './components/FeaturesSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <IndicatorsSection className="mt-[115px]" />
        <AboutPortalSection />
        <FeaturesSection />
        <MunicipalRepassesSection />
      </main>

      <Footer />
    </div>
  );
};
