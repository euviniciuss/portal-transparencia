import React from 'react';

interface SearchActionBannerProps {
  onDownloadPDF?: () => void;
  onDownloadCSV?: () => void;
}

export const SearchActionBanner: React.FC<SearchActionBannerProps> = ({ 
  onDownloadPDF, 
  onDownloadCSV 
}) => {
  return (
    <div className="w-full bg-[#E6F9F5] border border-[#B3EBDC] rounded-xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 my-12">
      <div className="flex flex-col gap-1 text-center lg:text-left">
        <h3 className="text-lg md:text-xl font-medium text-[#1B1C1C]" style={{ fontFamily: 'Public Sans, sans-serif' }}>
          Precisa dos dados detalhados para análise?
        </h3>
      </div>

      <div className="flex flex-wrap justify-center lg:justify-end gap-3 w-full lg:w-auto">
        {/* PDF Button */}
        <button 
          onClick={onDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#BBCAC1] text-[14px] font-semibold text-[#1B1C1C] rounded-lg shadow-sm hover:bg-surface-container-low transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
          Baixar relatório PDF
        </button>

        {/* CSV Button */}
        <button 
          onClick={onDownloadCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#BBCAC1] text-[14px] font-semibold text-[#1B1C1C] rounded-lg shadow-sm hover:bg-surface-container-low transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><path d="M14 2v6h6"/><path d="M2 9h9v1h-9z"/><path d="M2 12h9v1h-9z"/><path d="M2 15h9v1h-9z"/></svg>
          Baixar CSV
        </button>

        {/* E-SIC Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-[#006C4F] text-white text-[14px] font-semibold rounded-lg shadow-sm hover:bg-opacity-90 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Pedir via E-SIC
        </button>
      </div>
    </div>
  );
};
