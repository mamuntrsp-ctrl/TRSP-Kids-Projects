import React, { useState } from 'react';
import { Book } from '../types/book';
import { X, CheckCircle, Building2, Send, Phone, Mail, MapPin } from 'lucide-react';

interface InstitutionalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedBook?: Book | null;
  allBooks: Book[];
}

export const InstitutionalRequestModal: React.FC<InstitutionalRequestModalProps> = ({
  isOpen,
  onClose,
  preselectedBook,
  allBooks,
}) => {
  const [institutionName, setInstitutionName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [designation, setDesignation] = useState('Principal / Head Teacher');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [address, setAddress] = useState('');
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>(
    preselectedBook ? [preselectedBook.id] : []
  );
  const [studentCount, setStudentCount] = useState('50 - 150 Students');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleToggleBook = (id: string) => {
    if (selectedBookIds.includes(id)) {
      setSelectedBookIds(selectedBookIds.filter((item) => item !== id));
    } else {
      setSelectedBookIds([...selectedBookIds, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institutionName || !contactPerson || !phone) return;
    setIsSubmitted(true);
  };

  const districts = [
    'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 
    'Barisal', 'Rangpur', 'Mymensingh', 'Comilla', 'Bogura', 'Narayanganj'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#961241] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Request Free School Inspection Pack
              </h2>
              <p className="text-xs text-rose-100">
                The Royal Scientific Publications Ltd — Institutional Desk
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {isSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 font-heading">
                  Inspection Request Received!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{contactPerson}</strong>. Our institutional curriculum coordinator for <strong>{district}</strong> will contact <strong>{institutionName}</strong> at <strong>{phone}</strong> within 24 hours.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Selected Titles:</span>
                  <span className="font-bold text-slate-900">{selectedBookIds.length || 'Full Nursery Pack'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Institutional Hotline:</span>
                  <span className="font-bold text-[#961241]">09639112211</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dispatch Location:</span>
                  <span className="font-bold text-slate-800">Sultan Ahmed Plaza, Purana Paltan</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#961241] text-white rounded-xl font-bold text-xs hover:bg-[#800e36] transition-colors"
              >
                Close & Return to Portfolio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 leading-relaxed">
                Complimentary sample packs and institutional tier pricing (up to 35% discount) are available for verified preschools, English medium, Bangla medium, and madrasah institutions.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    School / Institution Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="e.g. Maple Leaf International / Dhaka Model Kindergarten"
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#961241] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Mrs. Sharmin Akhtar"
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#961241] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Designation
                  </label>
                  <select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#961241] focus:outline-none"
                  >
                    <option>Principal / Head Teacher</option>
                    <option>Curriculum Coordinator</option>
                    <option>Kindergarten In-charge</option>
                    <option>Library Director</option>
                    <option>Managing Committee Member</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 01712345678"
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#961241] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    District / Region
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#961241] focus:outline-none"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Campus / Delivery Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Plot/Road, Sector, Thana, District"
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#961241] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Books for Sample Evaluation Pack:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allBooks.map((b) => {
                    const isChecked = selectedBookIds.includes(b.id);
                    return (
                      <label
                        key={b.id}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-rose-50 border-[#961241] text-[#961241] font-bold' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleBook(b.id)}
                          className="rounded text-[#961241] focus:ring-[#961241]"
                        />
                        <span className="truncate">{b.title}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#961241] hover:bg-[#800e36] text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Sample Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
