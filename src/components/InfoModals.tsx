import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, BookOpen, MapPin, Phone, Mail } from 'lucide-react';
import { TRSPLogo } from './TRSPLogo';

interface ComplainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplainModal: React.FC<ComplainModalProps> = ({ isOpen, onClose }) => {
  const [ticketType, setTicketType] = useState('Damaged or Missing Page');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="px-5 py-4 bg-[#961241] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-sm sm:text-base">Customer Complain & Feedback</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 text-xs">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">Feedback Ticket Logged</h4>
              <p className="text-slate-600 max-w-xs mx-auto">
                Ticket #TRSP-C{Math.floor(1000 + Math.random() * 9000)} has been registered. Our Quality Assurance team in Purana Paltan will review and contact you.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-slate-900 text-white rounded-lg font-bold"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <p className="text-slate-600">
                At The Royal Scientific Publications Ltd, we adhere to the highest publishing and material safety standards. Please let us know if you encountered any issues.
              </p>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Issue Category</label>
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#961241]"
                >
                  <option>Damaged or Misprinted Page</option>
                  <option>Delayed Courier Delivery</option>
                  <option>Incorrect Book Received</option>
                  <option>Content / Educational Feedback</option>
                  <option>School Bulk Order Query</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017xxxxxxxx"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#961241]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Details & Description *</label>
                <textarea
                  required
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Please describe the book name and issue..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#961241]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#961241] text-white rounded-lg font-bold hover:bg-[#800e36]"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl max-h-[85vh] rounded-2xl shadow-2xl overflow-y-auto border border-slate-200">
        <div className="px-6 py-4 bg-[#961241] text-white flex items-center justify-between sticky top-0 z-10">
          <TRSPLogo variant="hero" />
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              About The Royal Scientific Publications Ltd.
            </h3>
            <p className="font-semibold text-[#961241]">
              World Class Publications in Bangladesh
            </p>
          </div>

          <p>
            Established as a pioneer in quality educational and scientific literature, <strong>The Royal Scientific Publications Ltd (TRSP)</strong> has been shaping learning journeys in Bangladesh for over 35 years. From elementary schools and kindergartens to national reference texts, TRSP is a household name trusted by generations of students, parents, and educators.
          </p>

          <h4 className="font-bold text-slate-900 text-sm pt-2">
            TRSP Kids Division
          </h4>
          <p>
            Our dedicated <strong>TRSP Kids</strong> division was established to modernize early childhood education across Bangladesh. We pair international pedagogical methods (phonics, sensory touch, bilingual cognitive associations) with deep cultural storytelling rooted in Bangladeshi folklore and timeless moral fables.
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h5 className="font-bold text-slate-900">Headquarters & Distribution Center</h5>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-[#961241] flex-shrink-0" />
              <span>9th Floor, Sultan Ahmed Plaza, 32 Purana Paltan, Dhaka 1000</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="w-4 h-4 text-[#961241] flex-shrink-0" />
              <span>09639112211 (Saturday – Thursday, 9:00 AM to 6:00 PM)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="w-4 h-4 text-[#961241] flex-shrink-0" />
              <span>support@trsp.email</span>
            </div>
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
