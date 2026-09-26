import React from 'react';
import { ShieldCheck, GraduationCap, Languages, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { TRSP_CURRICULUM_PILLARS } from '../data/booksData';

export const PedagogyFeatures: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-[#961241]" />;
      case 'Languages':
        return <Languages className="w-6 h-6 text-blue-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-amber-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section className="py-14 sm:py-16 bg-gradient-to-b from-white to-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-black tracking-widest text-[#961241] uppercase">
            The TRSP Educational Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            World-Class Standards for Bangladeshi Children
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every page published under TRSP Kids undergoes rigorous child-development vetting to foster curiosity, strong values, and bilingual fluency.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRSP_CURRICULUM_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {getIcon(pillar.iconName)}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#961241] font-bengali mt-0.5">
                    {pillar.bengaliTitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Certified TRSP Quality</span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner callout for Schools and Daycares */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Institutional Programs
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
              Supplying Kindergartens, Madrasahs & Primary Schools Across All 64 Districts
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Specialized textbook pricing, teacher guide companions, and free inspection packs for school governing committees.
            </p>
          </div>

          <a
            href="tel:09639112211"
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center gap-2"
          >
            <span>Hotline: 09639112211</span>
          </a>
        </div>

      </div>
    </section>
  );
};
