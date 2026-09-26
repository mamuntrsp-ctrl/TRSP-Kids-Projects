import React from 'react';

interface TRSPLogoProps {
  variant?: 'header' | 'hero' | 'footer';
  className?: string;
}

export const TRSPLogo: React.FC<TRSPLogoProps> = ({ variant = 'header', className = '' }) => {
  if (variant === 'hero') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        {/* Red Framed Nib Box */}
        <div className="w-14 h-14 bg-white rounded-lg p-1.5 shadow-md flex flex-col items-center justify-center border-2 border-red-100 flex-shrink-0">
          <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#961241]" fill="currentColor">
            {/* Stylized Fountain Pen Nib */}
            <path d="M20 2L13 14V24L20 30L27 24V14L20 2Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="20" cy="18" r="2.2" fill="currentColor" />
            <line x1="20" y1="20.2" x2="20" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] font-black tracking-widest text-[#961241] mt-0.5 leading-none">TRSP</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-black text-white tracking-wider font-heading">
              TRSP
            </span>
            <span className="bg-amber-400 text-slate-900 text-xs font-black px-2 py-0.5 rounded uppercase tracking-wider">
              KIDS
            </span>
          </div>
          <p className="text-white/90 text-xs md:text-sm font-medium tracking-wide">
            World Class Publications in Bangladesh
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Red Framed Nib Logo as in reference */}
      <div className="w-11 h-11 border-2 border-[#b31435] rounded-md p-1 flex flex-col items-center justify-center bg-white shadow-xs flex-shrink-0">
        <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#b31435]" fill="currentColor">
          <path d="M20 3L14 14V24L20 29L26 24V14L20 3Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="20" cy="17.5" r="2" fill="currentColor" />
          <line x1="20" y1="19.5" x2="20" y2="29" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="text-[8px] font-black tracking-widest text-[#b31435] leading-none mt-0.5">TRSP</span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-base sm:text-lg font-extrabold text-[#b31435] tracking-tight leading-tight">
            The Royal Scientific Publications Ltd
          </span>
          <span className="bg-[#b31435] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            KIDS
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-bold text-slate-600 tracking-wider uppercase mt-0.5">
          WORLD CLASS PUBLICATIONS IN BANGLADESH
        </span>
      </div>
    </div>
  );
};
