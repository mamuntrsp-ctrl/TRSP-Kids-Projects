import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, Clock, MapPin, Check } from 'lucide-react';
import { TRSPLogo } from './TRSPLogo';

interface FooterProps {
  onOpenSampleModal: () => void;
  onOpenComplainModal: () => void;
  onOpenAboutModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSampleModal,
  onOpenComplainModal,
  onOpenAboutModal
}) => {
  const [subscriberInput, setSubscriberInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscriberInput('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-white border-t border-slate-200">
      
      {/* Newsletter Subscription Strip matching reference image exactly */}
      <div className="border-b border-slate-200 py-6 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="text-xs sm:text-sm font-extrabold text-[#3a8b27] uppercase tracking-wider">
              SUBSCRIBE US TO GET LATEST UPDATES.
            </span>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center max-w-md">
            <input
              type="text"
              required
              value={subscriberInput}
              onChange={(e) => setSubscriberInput(e.target.value)}
              placeholder="Enter your email or phone"
              className="w-full sm:w-80 px-4 py-2 text-xs sm:text-sm border border-slate-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#3a8b27] bg-white placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="bg-[#44a72d] hover:bg-[#3a8b27] text-white px-4 py-2 rounded-r-md flex items-center justify-center transition-colors font-bold"
              aria-label="Subscribe"
            >
              {subscribed ? <Check className="w-5 h-5 text-white" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Information Grid matching reference layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Brand, Address & Socials */}
          <div className="md:col-span-5 space-y-4">
            <TRSPLogo variant="header" />

            <div className="flex items-start gap-2 text-xs text-slate-600 pt-2">
              <MapPin className="w-4 h-4 text-[#961241] flex-shrink-0 mt-0.5" />
              <span>9th Floor, Sultan Ahmed Plaza, 32 Purana Paltan, Dhaka 1000</span>
            </div>

            {/* Social Icons matching reference: Facebook, Twitter, LinkedIn */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="TRSP Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="TRSP Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="TRSP LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Center Column: Useful Links matching reference */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Useful Links</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={onOpenComplainModal} className="hover:text-[#961241] transition-colors">
                  Complain & Feedback
                </button>
              </li>
              <li>
                <button onClick={onOpenAboutModal} className="hover:text-[#961241] transition-colors">
                  About Us (TRSP)
                </button>
              </li>
              <li>
                <button onClick={onOpenSampleModal} className="hover:text-[#961241] transition-colors">
                  School Sample Request
                </button>
              </li>
              <li>
                <span className="hover:text-[#961241] cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#961241] cursor-pointer transition-colors">
                  Terms & Conditions
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column: Contact & Support & Mobile Banking Logos */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Contact & Support</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <a
                href="tel:09639112211"
                className="flex items-center gap-2 hover:text-[#961241] transition-colors font-bold text-slate-800"
              >
                <Phone className="w-3.5 h-3.5 text-[#961241]" />
                <span className="tabular-nums">09639112211</span>
              </a>

              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Saturday - Thursday (9AM to 6PM)</span>
              </div>

              <a
                href="mailto:support@trsp.email"
                className="flex items-center gap-2 hover:text-[#961241] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>support@trsp.email</span>
              </a>
            </div>

            {/* Mobile Banking Payment Logos matching reference (bKash, Nagad, Rocket) */}
            <div className="pt-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Authorized Payment Partners
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {/* bKash */}
                <span className="px-2.5 py-1 bg-pink-50 border border-pink-200 text-[#e2136e] rounded text-xs font-black">
                  bKash
                </span>
                {/* Nagad */}
                <span className="px-2.5 py-1 bg-orange-50 border border-orange-200 text-[#f7931e] rounded text-xs font-black">
                  নগদ Nagad
                </span>
                {/* Rocket */}
                <span className="px-2.5 py-1 bg-purple-50 border border-purple-200 text-[#8c3494] rounded text-xs font-black">
                  Rocket
                </span>
                {/* COD */}
                <span className="px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs font-bold">
                  COD Available
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Line matching reference */}
      <div className="border-t border-slate-200 py-4 bg-slate-50 text-center text-xs text-slate-500">
        <p>The Royal Scientific Publications Ltd © 2026 | Developed by Bintel Future Tech</p>
      </div>

    </footer>
  );
};
