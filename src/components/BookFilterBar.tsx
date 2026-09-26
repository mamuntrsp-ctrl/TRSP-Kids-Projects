import React from 'react';
import { BookCategory, AgeGroup } from '../types/book';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface BookFilterBarProps {
  selectedCategory: BookCategory;
  onSelectCategory: (cat: BookCategory) => void;
  selectedAge: AgeGroup;
  onSelectAge: (age: AgeGroup) => void;
  booksCount: number;
}

export const BookFilterBar: React.FC<BookFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedAge,
  onSelectAge,
  booksCount
}) => {
  const categories: { id: BookCategory; label: string; bengali: string }[] = [
    { id: 'all', label: 'All Portfolio Books', bengali: 'সকল বই' },
    { id: 'early-learning', label: 'Early Learning & Rhymes', bengali: 'হাতেখড়ি ও ছড়া' },
    { id: 'moral-stories', label: 'Moral Storybooks', bengali: 'নীতিকথা ও গল্প' },
    { id: 'vocabulary', label: 'Vocabulary & Phonics', bengali: 'শব্দ ও ব্যাকরণ' },
  ];

  const ages: { id: AgeGroup; label: string }[] = [
    { id: 'all', label: 'All Age Groups' },
    { id: '2-4', label: 'Toddlers (2–4 Yrs)' },
    { id: '4-6', label: 'Early Readers (4–6 Yrs)' },
    { id: '6-8', label: 'Primary (6–9 Yrs)' },
  ];

  return (
    <div className="space-y-4 pt-4 pb-2">
      {/* Category Segmented Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Genre / Subject Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#961241] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] opacity-75 font-bengali ${isActive ? 'text-rose-100' : 'text-slate-500'}`}>
                  ({cat.bengali})
                </span>
              </button>
            );
          })}
        </div>

        {/* Age Filter Selector */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-100 p-1 rounded-lg border border-slate-200">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 ml-1.5 hidden sm:block" />
          <span className="text-[11px] font-bold text-slate-500 uppercase px-1 hidden sm:block">Age:</span>
          {ages.map((age) => {
            const isActive = selectedAge === age.id;
            return (
              <button
                key={age.id}
                onClick={() => onSelectAge(age.id)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {age.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Result Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong className="text-slate-800 tabular-nums">{booksCount}</strong> certified publications</span>
        <span className="hidden sm:inline-flex items-center gap-1 text-emerald-700 font-medium">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Non-toxic soy inks · Laminated tear-resistant pages</span>
        </span>
      </div>
    </div>
  );
};
