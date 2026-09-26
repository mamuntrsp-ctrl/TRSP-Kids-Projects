import React, { useState, useMemo } from 'react';
import { TRSP_BOOKS } from './data/booksData';
import { Book, BookCategory, AgeGroup, CartItem } from './types/book';
import { HeaderBrand } from './components/HeaderBrand';
import { HeroBanner } from './components/HeroBanner';
import { BookFilterBar } from './components/BookFilterBar';
import { BookCard } from './components/BookCard';
import { BookReaderModal } from './components/BookReaderModal';
import { CartDrawer } from './components/CartDrawer';
import { PedagogyFeatures } from './components/PedagogyFeatures';
import { InstitutionalRequestModal } from './components/InstitutionalRequestModal';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { Footer } from './components/Footer';
import { ComplainModal, AboutModal } from './components/InfoModals';
import { Sparkles, BookOpen, RotateCcw } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>('all');
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('all');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Modal states
  const [activePreviewBook, setActivePreviewBook] = useState<Book | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [samplePreselectedBook, setSamplePreselectedBook] = useState<Book | null>(null);
  const [isComplainModalOpen, setIsComplainModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Audio playing indicator state
  const handlePlayAudioSample = (book: Book) => {
    if ('speechSynthesis' in window && book.audioSampleText) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(book.audioSampleText);
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    } else {
      setActivePreviewBook(book);
    }
  };

  // Cart operations
  const handleAddToCart = (book: Book, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { book, quantity }];
    });
  };

  const handleUpdateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(bookId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.book.id === bookId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (bookId: string) => {
    setWishlist((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  // Filtered books
  const filteredBooks = useMemo(() => {
    return TRSP_BOOKS.filter((book) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.bengaliTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || book.category === selectedCategory;

      const matchesAge = selectedAge === 'all' || book.ageGroup === selectedAge;

      return matchesSearch && matchesCategory && matchesAge;
    });
  }, [searchQuery, selectedCategory, selectedAge]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartAmount = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans">
      
      {/* 
        NO TOP MENU OR NAVBAR AS REQUESTED BY USER:
        "and there should not be menu or navbars at the top only a single portfolio but strong page."
        The header contains only the proud brand lockup, search, hotline, and cart bag.
      */}
      <HeaderBrand
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSampleModal={() => {
          setSamplePreselectedBook(null);
          setIsSampleModalOpen(true);
        }}
      />

      <main className="flex-1">
        
        {/* Majestic TRSP Kids Crimson Hero Banner */}
        <HeroBanner
          onExploreClick={scrollToPortfolio}
          onPreviewAmarBoi={() => {
            const amarBoi = TRSP_BOOKS.find((b) => b.id === 'amar-boi-bangla-1');
            if (amarBoi) setActivePreviewBook(amarBoi);
          }}
          onPreviewMyBook={() => {
            const myBook = TRSP_BOOKS.find((b) => b.id === 'my-book-english-1');
            if (myBook) setActivePreviewBook(myBook);
          }}
          onPreviewStory={() => {
            const slowSteady = TRSP_BOOKS.find((b) => b.id === 'slow-and-steady-story');
            if (slowSteady) setActivePreviewBook(slowSteady);
          }}
        />

        {/* Portfolio Section */}
        <section id="portfolio-grid" className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          
          {/* Section Heading styled exactly like the reference screenshot:
              Orange circle icon ○ Kids Books and subtle divider rule */}
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <span className="w-4 h-4 rounded-full border-[3px] border-amber-500 inline-block flex-shrink-0"></span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
              Kids Books
            </h2>
            <span className="text-xs text-slate-400 font-bengali ml-2 hidden sm:inline">
              বাচ্চাদের সচিত্র বই ও নীতিকথা
            </span>
          </div>

          {/* Interactive Filter Bar */}
          <BookFilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedAge={selectedAge}
            onSelectAge={setSelectedAge}
            booksCount={filteredBooks.length}
          />

          {/* Book Cards Grid matching reference layout */}
          {filteredBooks.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-slate-200 my-6">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No books found matching your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for another keyword or clear your filters to view all TRSP Kids publications.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedAge('all');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onAddToCart={handleAddToCart}
                  onOpenPreview={(b) => setActivePreviewBook(b)}
                  isWishlisted={wishlist.includes(book.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onPlayAudioSample={handlePlayAudioSample}
                />
              ))}
            </div>
          )}

        </section>

        {/* Educational Excellence / Why TRSP Section */}
        <PedagogyFeatures />

      </main>

      {/* Footer matching reference layout */}
      <Footer
        onOpenSampleModal={() => {
          setSamplePreselectedBook(null);
          setIsSampleModalOpen(true);
        }}
        onOpenComplainModal={() => setIsComplainModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
      />

      {/* Floating Red Chat Widget from reference */}
      <FloatingChatWidget
        onOpenSampleModal={() => {
          setSamplePreselectedBook(null);
          setIsSampleModalOpen(true);
        }}
      />

      {/* Interactive Look Inside / Sample Reader Modal */}
      <BookReaderModal
        book={activePreviewBook}
        onClose={() => setActivePreviewBook(null)}
        onAddToCart={handleAddToCart}
        onRequestSample={(book) => {
          setActivePreviewBook(null);
          setSamplePreselectedBook(book);
          setIsSampleModalOpen(true);
        }}
      />

      {/* Cart & Checkout Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Institutional / School Inspection Request Modal */}
      <InstitutionalRequestModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        preselectedBook={samplePreselectedBook}
        allBooks={TRSP_BOOKS}
      />

      {/* Complain / Feedback Modal */}
      <ComplainModal
        isOpen={isComplainModalOpen}
        onClose={() => setIsComplainModalOpen(false)}
      />

      {/* About TRSP Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

    </div>
  );
}
