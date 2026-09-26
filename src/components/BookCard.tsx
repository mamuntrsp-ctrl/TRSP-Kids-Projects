import React, { useState } from 'react';
import { Book } from '../types/book';
import { Heart, ShoppingBag, BookOpen, Volume2, Check } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book, quantity: number) => void;
  onOpenPreview: (book: Book) => void;
  isWishlisted: boolean;
  onToggleWishlist: (bookId: string) => void;
  onPlayAudioSample: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onAddToCart,
  onOpenPreview,
  isWishlisted,
  onToggleWishlist,
  onPlayAudioSample,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(book, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col h-full overflow-hidden">
      
      {/* 10% Discount Green Badge in top-left matching reference image */}
      {book.discountPercent > 0 && (
        <div className="absolute top-0 left-0 z-20 overflow-hidden w-16 h-16 pointer-events-none">
          <div className="absolute top-2 -left-6 w-24 bg-[#44a72d] text-white text-[11px] font-black text-center py-0.5 shadow-sm transform -rotate-45 uppercase tracking-wider">
            {book.discountPercent}%
          </div>
        </div>
      )}

      {/* Heart Wishlist Button in top-right matching reference */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(book.id);
        }}
        className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors shadow-xs"
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={`w-4 h-4 transition-transform active:scale-125 ${
            isWishlisted ? 'fill-rose-500 text-rose-500' : ''
          }`}
        />
      </button>

      {/* Book Cover Image Area */}
      <div 
        onClick={() => onOpenPreview(book)}
        className="relative bg-gradient-to-b from-slate-50 to-slate-100/50 p-4 pt-6 flex items-center justify-center cursor-pointer overflow-hidden group/img aspect-[4/5]"
      >
        {/* Book shadow & 3D styling */}
        <div className="relative w-4/5 max-w-[190px] aspect-[3/4] shadow-[0_12px_24px_rgba(0,0,0,0.12)] rounded-sm overflow-hidden transform group-hover/img:scale-105 transition-transform duration-300 border border-slate-300/40">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Book Spine crease */}
          <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenPreview(book);
            }}
            className="bg-white hover:bg-slate-50 text-slate-900 px-3 py-1.5 rounded-md text-xs font-bold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#961241]" />
            <span>Look Inside</span>
          </button>

          {book.audioSampleText && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayAudioSample(book);
              }}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 p-1.5 rounded-md text-xs font-bold shadow-md flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform"
              title="Listen to story audio clip"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Book Metadata & Title Area */}
      <div className="p-3.5 flex flex-col flex-grow justify-between border-t border-slate-100">
        
        <div className="space-y-1">
          {/* Muted category label from reference */}
          <p className="text-[11px] text-slate-500 font-medium font-bengali">
            {book.categoryLabel}
          </p>

          {/* Book Title */}
          <h3 
            onClick={() => onOpenPreview(book)}
            className="text-sm font-bold text-slate-900 line-clamp-1 hover:text-[#961241] cursor-pointer transition-colors"
            title={book.title}
          >
            {book.title}
          </h3>

          {/* Bengali Subtitle / Meaning */}
          <p className="text-xs text-slate-600 line-clamp-1 font-bengali">
            {book.bengaliTitle}
          </p>

          {/* Price matching reference: ৳225  ৳250 */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-base font-black text-slate-900 tabular-nums">
              ৳{book.price}
            </span>
            {book.originalPrice > book.price && (
              <span className="text-xs text-rose-500 line-through tabular-nums font-semibold">
                ৳{book.originalPrice}
              </span>
            )}
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold ml-auto">
              In Stock
            </span>
          </div>
        </div>

        {/* Bottom Action Controls Matching Reference */}
        <div className="pt-3 mt-2 border-t border-slate-100 flex items-center gap-2">
          
          {/* Stepper matching reference: [ - 1 + ] in green */}
          <div className="flex items-center border border-[#44a72d] rounded-md overflow-hidden bg-white text-xs">
            <button
              onClick={handleDecrease}
              className="w-6 h-7 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-6 text-center font-black tabular-nums text-slate-900 select-none">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="w-6 h-7 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Cart button matching reference */}
          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-md text-xs font-bold border transition-all ${
              justAdded
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-[#44a72d] text-[#44a72d] hover:bg-[#44a72d] hover:text-white active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Add To Cart</span>
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
};
