import React, { useState } from 'react';
import { Book } from '../types/book';
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX, ShoppingBag, ShieldCheck, CheckCircle2, Bookmark, Sparkles } from 'lucide-react';

interface BookReaderModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToCart: (book: Book, quantity: number) => void;
  onRequestSample: (book: Book) => void;
}

export const BookReaderModal: React.FC<BookReaderModalProps> = ({
  book,
  onClose,
  onAddToCart,
  onRequestSample,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  if (!book) return null;

  const totalPages = book.samplePages.length;
  const currentPage = book.samplePages[currentPageIndex] || book.samplePages[0];

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      stopAudio();
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      stopAudio();
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopAudio();
      return;
    }

    if ('speechSynthesis' in window) {
      const textToRead = `${currentPage.title}. ${currentPage.content}. ${currentPage.bengaliContent || ''}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9;
      utterance.pitch = 1.05; // Slightly cheerful, gentle tone for kids storytelling
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 4000);
    }
  };

  const handleAddCart = () => {
    onAddToCart(book, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="bg-[#961241] text-white text-[11px] font-black px-2 py-0.5 rounded uppercase">
              TRSP Look Inside
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {book.title}
              </h2>
              <p className="text-xs text-slate-300 font-bengali line-clamp-1">
                {book.bengaliTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Read-Aloud Button */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isPlayingAudio
                  ? 'bg-amber-400 text-slate-950 animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Read aloud page content"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline">Pause Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-300" />
                  <span className="hidden sm:inline">Story Narration</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Two column layout (Left Book Page, Right Metadata/Order) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/50">
          
          {/* Left Column: Interactive Flip-Book Reader Screen */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative">
            
            {/* Page Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black uppercase tracking-wider text-[#961241]">
                Sample Page {currentPageIndex + 1} of {totalPages}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {book.language}
              </span>
            </div>

            {/* Book Page Content Display */}
            <div className="py-6 space-y-4">
              
              {/* Illustration banner / Visual Prompt */}
              <div className="w-full bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 border-2 border-dashed border-amber-200 rounded-xl p-5 text-center relative overflow-hidden">
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 rounded-full bg-white shadow-xs border border-amber-200 flex items-center justify-center text-amber-600">
                    <Sparkles className="w-8 h-8" />
                  </div>
                </div>
                <h4 className="text-lg font-black text-slate-900 font-heading">
                  {currentPage.title}
                </h4>
                {currentPage.bengaliTitle && (
                  <p className="text-base font-bold text-[#961241] font-bengali mt-0.5">
                    {currentPage.bengaliTitle}
                  </p>
                )}
              </div>

              {/* Page Main Text / English Prose */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif">
                  {currentPage.content}
                </p>
              </div>

              {/* Bengali Translation & Phonetics */}
              {currentPage.bengaliContent && (
                <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block mb-1">
                    বাংলা পাঠ ও ছন্দ:
                  </span>
                  <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-bengali font-medium">
                    {currentPage.bengaliContent}
                  </p>
                </div>
              )}

              {/* Interactive Child Question / Activity Prompt */}
              {currentPage.interactivePrompt && (
                <div className="flex items-start gap-2.5 p-3 bg-amber-50/80 rounded-lg border border-amber-200/80">
                  <span className="text-xs bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded mt-0.5">
                    Activity
                  </span>
                  <p className="text-xs font-semibold text-amber-900">
                    {currentPage.interactivePrompt}
                  </p>
                </div>
              )}

            </div>

            {/* Page Flipping Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Page</span>
              </button>

              {/* Page Dots Indicator */}
              <div className="flex items-center gap-1.5">
                {book.samplePages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      stopAudio();
                      setCurrentPageIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentPageIndex ? 'w-6 bg-[#961241]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to page ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPageIndex === totalPages - 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#961241] text-white text-xs font-bold hover:bg-[#800e36] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Book Specifications & Institutional Order */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Cover Thumbnail & Price Lockup */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-20 aspect-[3/4] rounded-md overflow-hidden shadow-sm border border-slate-200 flex-shrink-0">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                  {book.ageLabel}
                </span>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-xl font-black text-slate-900 tabular-nums">
                    ৳{book.price}
                  </span>
                  {book.originalPrice > book.price && (
                    <span className="text-xs text-rose-500 line-through tabular-nums font-semibold">
                      ৳{book.originalPrice}
                    </span>
                  )}
                  <span className="text-xs font-bold text-[#44a72d]">
                    ({book.discountPercent}% OFF)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {book.pagesCount} Full-Color Laminated Pages
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                About This Publication
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {book.fullDescription}
              </p>

              {/* Bullet Features */}
              <div className="pt-2 space-y-1.5">
                {book.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-xs space-y-1.5">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Publisher:</span>
                <span className="font-semibold text-slate-900">The Royal Scientific Publications Ltd</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Binding Type:</span>
                <span className="font-semibold text-slate-900">{book.binding}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">ISBN:</span>
                <span className="font-mono text-slate-800">{book.isbn}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Safety Standards:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Soy Ink · Round Corners</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleAddCart}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#44a72d] hover:bg-[#3d9828] text-white active:scale-98'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{added ? 'Added to Cart!' : `Add to Cart — ৳${book.price}`}</span>
              </button>

              <button
                onClick={() => {
                  stopAudio();
                  onRequestSample(book);
                }}
                className="w-full py-2 px-4 rounded-xl border border-slate-300 hover:border-[#961241] text-slate-700 hover:text-[#961241] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 bg-white"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#961241]" />
                <span>Request Free School Inspection Copy</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
