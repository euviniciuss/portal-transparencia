import React from 'react';

interface BrandStripProps {
  className?: string;
}

export const BrandStrip: React.FC<BrandStripProps> = ({ className = '' }) => {
  return (
    <div className={`flex h-[8px] rounded-none ${className}`}>
      <div className="flex-1 h-full bg-[#006394]" />
      <div className="flex-1 h-full bg-[#009B47]" />
      <div className="flex-1 h-full bg-[#D81A21]" />
      <div className="flex-1 h-full bg-[#FDBC11]" />
    </div>
  );
};
