export type BookCategory = 
  | 'all'
  | 'early-learning'
  | 'moral-stories'
  | 'vocabulary'
  | 'activity'
  | 'values';

export type AgeGroup = 'all' | '2-4' | '4-6' | '6-8' | '8-10';

export interface SamplePage {
  pageNumber: number;
  title: string;
  bengaliTitle?: string;
  imagePrompt?: string;
  content: string;
  bengaliContent?: string;
  interactivePrompt?: string;
  illustrationType: 'alphabet' | 'story' | 'vocab' | 'activity' | 'fable';
}

export interface Book {
  id: string;
  title: string;
  bengaliTitle: string;
  category: BookCategory;
  categoryLabel: string;
  ageGroup: AgeGroup;
  ageLabel: string;
  coverImage: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  language: 'Bilingual (Bangla & English)' | 'Bangla' | 'English' | 'Trilingual (Bangla, English & Arabic)';
  pagesCount: number;
  binding: string;
  isbn: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  learningOutcomes: string[];
  audioSampleText?: string;
  samplePages: SamplePage[];
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'rocket';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  date: string;
}
