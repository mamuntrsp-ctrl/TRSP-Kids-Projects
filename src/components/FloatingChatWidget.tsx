import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone, BookOpen, Truck, HelpCircle } from 'lucide-react';

interface FloatingChatWidgetProps {
  onOpenSampleModal: () => void;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({ onOpenSampleModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'আসসালামু আলাইকুম! Welcome to TRSP Kids Books help desk. How can we assist you with our children\'s publications today?',
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    { text: 'Which books are best for age 3-5?', reply: 'For ages 2-5, we highly recommend "আমার বই ১" (Bangla alphabet & rhymes) and "My Book 1" (English phonics). Both feature safe rounded corners and tear-proof board pages!' },
    { text: 'How to order for school / kindergarten?', reply: 'We offer special institutional discounts (up to 35%) and complimentary inspection packs for schools. Click the "Request School Sample Pack" button above!' },
    { text: 'What are the delivery charges?', reply: 'Courier delivery inside Dhaka is ৳60 (24-48 hours), outside Dhaka is ৳110. Delivery is completely FREE on orders over ৳1,000!' },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = { sender: 'user' as const, text, time: 'Now' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Generate responsive bot reply
    setTimeout(() => {
      let botReply = 'Thank you for reaching out! You can also connect directly with our support team at 09639112211 or support@trsp.email.';
      
      const lower = text.toLowerCase();
      if (lower.includes('age') || lower.includes('3') || lower.includes('4') || lower.includes('5')) {
        botReply = 'For early learners (ages 2–5), "আমার বই ১" and "My Book 1" are our flagship foundation books. For ages 5–8, "Opposite Words" and "Liar Cowboy" storybook are favorites!';
      } else if (lower.includes('school') || lower.includes('institution') || lower.includes('sample')) {
        botReply = 'You can request free evaluation copies for your kindergarten or school committee by clicking the "School Sample Pack" button!';
      } else if (lower.includes('delivery') || lower.includes('courier')) {
        botReply = 'We dispatch daily via Steadfast & Sundarban couriers. Delivery is free for orders over ৳1,000!';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply, time: 'Now' }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Red Chat Button from Reference Screenshot */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 rounded-full bg-[#d61138] hover:bg-[#b50c2d] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border-2 border-white"
          aria-label="Open TRSP Support Chat"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6 fill-current" />
          )}
        </button>
      </div>

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[460px] animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#961241] p-3.5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                TRSP
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">TRSP Kids Assistance</h4>
                <p className="text-[10px] text-rose-100">Hotline: 09639112211 (Sat-Thu)</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-50 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-2.5 rounded-xl ${
                    m.sender === 'user'
                      ? 'bg-[#961241] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-xs rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.time}</span>
              </div>
            ))}

            {/* Quick action chips */}
            <div className="pt-2 space-y-1.5">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Quick Questions:</p>
              {quickPrompts.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q.text)}
                  className="w-full text-left text-[11px] p-2 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-700 transition-colors truncate block"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-1.5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about books, age, delivery..."
              className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#961241]"
            />
            <button
              type="submit"
              className="p-2 bg-[#961241] hover:bg-[#800e36] text-white rounded-lg transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
