import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, BookOpen } from 'lucide-react';
import { TRSPLogo } from './TRSPLogo';

interface HeroBannerProps {
  onExploreClick: () => void;
  onPreviewAmarBoi: () => void;
  onPreviewMyBook: () => void;
  onPreviewStory: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onPreviewAmarBoi,
  onPreviewMyBook,
  onPreviewStory,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#880d3b] via-[#a8144b] to-[#b91757] text-white py-12 md:py-16 lg:py-20 shadow-inner">
      {/* Decorative playful geometric & star accents in background */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="absolute top-6 left-10 w-24 h-24 rounded-full bg-amber-300 blur-2xl"></div>
        <div className="absolute bottom-10 right-1/4 w-36 h-36 rounded-full bg-pink-300 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-12 right-20 w-8 h-8 rotate-45 border-2 border-white/30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Brand Lockup, Typography & CTAs */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* TRSP Official Brand Lockup */}
            <div className="inline-flex items-center gap-3 bg-black/15 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/10 shadow-xs">
              <TRSPLogo variant="hero" />
            </div>

            {/* Main Headline replicating reference banner */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight leading-tight font-heading text-white">
                TRSP KIDS BOOKS
              </h1>

              {/* Tagline with underline divider as in reference */}
              <div className="flex flex-col items-center lg:items-start">
                <p className="text-lg sm:text-xl font-medium tracking-wide text-rose-100 font-serif italic">
                  World Class Publications in Bangladesh
                </p>
                <div className="w-48 sm:w-64 h-0.5 bg-white/40 mt-2"></div>
              </div>

              <p className="text-sm sm:text-base text-rose-50/90 max-w-xl mx-auto lg:mx-0 leading-relaxed pt-2">
                Nurturing curious young minds with authentic bilingual Bengali & English early learning materials, moral fables, and phonetics. Printed on certified saliva-resistant board with smoothed child-safe rounded corners.
              </p>
            </div>

            {/* Action Buttons replicating the "Purchase Now" button from reference */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreClick}
                className="bg-white hover:bg-rose-50 text-[#880d3b] hover:text-[#70092f] px-6 sm:px-8 py-3 rounded-full font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2 group"
              >
                <span>Purchase Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onPreviewAmarBoi}
                className="bg-black/20 hover:bg-black/30 border border-white/30 text-white px-5 sm:px-6 py-3 rounded-full font-bold text-sm transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Look Inside "আমার বই ১"</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/15 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col text-center lg:text-left">
                <span className="text-xl sm:text-2xl font-black text-amber-300 tabular-nums">35+ Yrs</span>
                <span className="text-[11px] text-rose-100 leading-tight">Publishing Heritage</span>
              </div>
              <div className="flex flex-col text-center lg:text-left">
                <span className="text-xl sm:text-2xl font-black text-amber-300 tabular-nums">500+</span>
                <span className="text-[11px] text-rose-100 leading-tight">Partner Schools</span>
              </div>
              <div className="flex flex-col text-center lg:text-left">
                <span className="text-xl sm:text-2xl font-black text-amber-300 tabular-nums">100%</span>
                <span className="text-[11px] text-rose-100 leading-tight">Child-Safe Non-Toxic</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Floating Book Showcase Replicating Reference */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
            
            {/* Visual Halo Glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

            {/* 3D Angled Fan Composition of 3 signature books */}
            <div className="relative w-[320px] sm:w-[380px] h-[360px] sm:h-[420px] select-none">
              
              {/* Back Book: Green Story/Fable Book (Slow & Steady / Cowboy) */}
              <div 
                onClick={onPreviewStory}
                className="absolute right-2 top-4 w-[160px] sm:w-[190px] h-[220px] sm:h-[260px] rounded-xl shadow-2xl transform rotate-12 hover:rotate-6 transition-all duration-300 cursor-pointer overflow-hidden border-2 border-white/40 hover:scale-105 z-10 bg-slate-900 group"
                title="Click to preview Slow and Steady"
              >
                <img
                  src="/src/assets/images/book_slow_steady_1790400552179.jpg"
                  alt="Slow and Steady Wins the Race Book Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>

              {/* Left/Middle Book: "আমার বই ১" (Vibrant Red Bangla Book) */}
              <div 
                onClick={onPreviewAmarBoi}
                className="absolute left-2 top-8 w-[170px] sm:w-[200px] h-[240px] sm:h-[280px] rounded-xl shadow-2xl transform -rotate-12 hover:-rotate-4 transition-all duration-300 cursor-pointer overflow-hidden border-2 border-white/50 hover:scale-105 z-20 bg-slate-900 group"
                title="Click to preview আমার বই ১"
              >
                <img
                  src="/src/assets/images/book_amar_boi_bangla_1790400513012.jpg"
                  alt="Amar Boi 1 Bangla Book Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold py-1 px-2 rounded text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to Look Inside
                </div>
              </div>

              {/* Front Center Book: "MY BOOK 1" (Pink/Magenta English Book) */}
              <div 
                onClick={onPreviewMyBook}
                className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[185px] sm:w-[215px] h-[260px] sm:h-[300px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border-4 border-white z-30 bg-slate-900 group"
                title="Click to preview My Book 1"
              >
                <img
                  src="/src/assets/images/book_my_book_english_1790400577712.jpg"
                  alt="My Book 1 English Alphabet Cover"
                  className="w-full h-full object-cover"
                />
                
                {/* 3D Spine & Page Sheen Effect */}
                <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/40 via-white/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 bg-amber-400 text-slate-950 text-xs font-black py-1.5 px-2 rounded-md text-center shadow-md flex items-center justify-center gap-1 group-hover:bg-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Preview Pages</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
