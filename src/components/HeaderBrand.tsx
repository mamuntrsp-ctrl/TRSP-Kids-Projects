import React from 'react';
import { Search, PhoneCall, ShoppingBag, Heart, BookOpenCheck } from 'lucide-react';
import { TRSPLogo } from './TRSPLogo';

interface HeaderBrandProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSampleModal: () => void;
}

export const HeaderBrand: React.FC<HeaderBrandProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenSampleModal
}) => {
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3.5">
        
        {/* Brand identity: strictly single authoritative brand lockup */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <TRSPLogo variant="header" />
          
          {/* Mobile Cart Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 bg-[#44a72d] text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-sm"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{cartCount}</span>
              <span className="text-[10px] opacity-90">৳{cartTotal}</span>
            </button>
          </div>
        </div>

        {/* Search Bar for Kids Book Portfolio - Matches reference layout */}
        <div className="w-full md:max-w-md lg:max-w-lg relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by book name (Ex. Opposite Words, Liar Cowboy, আমার বই)..."
              className="w-full pl-3.5 pr-11 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#961241] focus:border-transparent transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-0 top-0 bottom-0 px-3 bg-slate-100 border-l border-slate-300 flex items-center justify-center rounded-r-md text-slate-500 hover:text-slate-800">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Right Action Tray: Hotline & Green Cart Badge from reference */}
        <div className="hidden md:flex items-center gap-4">
          {/* Hotline / Customer Care */}
          <a
            href="tel:09639112211"
            className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-[#961241] font-medium transition-colors"
            title="Publisher Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#961241]" />
            <span className="tabular-nums font-bold">09639112211</span>
          </a>

          {/* School Sample Pack Trigger */}
          <button
            onClick={onOpenSampleModal}
            className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#961241] transition-colors py-1.5 px-2.5 rounded border border-slate-200 hover:border-[#961241]/30"
          >
            <BookOpenCheck className="w-3.5 h-3.5 text-[#961241]" />
            <span>School Sample Pack</span>
          </button>

          {/* Wishlist Indicator */}
          <div className="relative text-slate-600 hover:text-[#961241] transition-colors cursor-pointer p-1" title="Saved Wishlist">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#961241] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>

          {/* Reference Green Cart Box: "0 Items - ৳0" */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#44a72d] hover:bg-[#3d9828] text-white px-3.5 py-2 rounded-md text-xs font-bold shadow-xs transition-transform active:scale-95"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <div className="flex flex-col text-left leading-tight">
              <span className="tabular-nums text-[11px] font-extrabold">{cartCount} Items</span>
              <span className="tabular-nums text-xs font-black">৳{cartTotal}</span>
            </div>
          </button>
        </div>

      </div>
    </header>
  );
};
