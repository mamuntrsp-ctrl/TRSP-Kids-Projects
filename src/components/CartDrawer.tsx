import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types/book';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<'inside-dhaka' | 'outside-dhaka'>('inside-dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'rocket'>('cod');
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  const deliveryFee = subtotal >= 1000 ? 0 : deliveryArea === 'inside-dhaka' ? 60 : 110;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    const orderId = `TRSP-KD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      orderId,
      customerName: name,
      phone,
      address,
      city: deliveryArea === 'inside-dhaka' ? 'Dhaka City' : 'Outside Dhaka',
      paymentMethod,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    setCompletedOrder(newOrder);
    setStep('success');
    onClearCart();
  };

  const handleResetAndClose = () => {
    setStep('cart');
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-slate-200 animate-in slide-in-from-right duration-200"
        role="dialog"
      >
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-base">
              {step === 'cart' ? 'Your Book Basket' : step === 'checkout' ? 'Order Verification' : 'Order Confirmed'}
            </span>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700">Your basket is empty</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Explore our vibrant children's books and add your favorites to checkout directly.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.book.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80"
                    >
                      <div className="w-14 aspect-[3/4] rounded-md overflow-hidden border border-slate-200 flex-shrink-0 bg-white">
                        <img
                          src={item.book.coverImage}
                          alt={item.book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.book.title}
                        </h4>
                        <p className="text-[11px] text-[#961241] font-semibold tabular-nums">
                          ৳{item.book.price} × {item.quantity} = ৳{item.book.price * item.quantity}
                        </p>

                        {/* Stepper */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex items-center border border-slate-300 rounded bg-white text-xs">
                            <button
                              onClick={() => onUpdateQuantity(item.book.id, item.quantity - 1)}
                              className="px-2 py-0.5 hover:bg-slate-100 text-slate-600 font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 text-[11px] font-bold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.book.id, item.quantity + 1)}
                              className="px-2 py-0.5 hover:bg-slate-100 text-slate-600 font-bold"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.book.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Free delivery bar */}
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>
                      {subtotal >= 1000
                        ? '🎉 You unlocked Free Delivery nationwide!'
                        : `Add ৳${1000 - subtotal} more for Free Delivery!`}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-3.5 text-xs">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 leading-tight">
                Cash on Delivery (COD) or instant Mobile Banking (bKash/Nagad) available across all 64 districts in Bangladesh.
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Parent / Customer Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mohammad Mamun"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#961241]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number (Active for Courier SMS) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017xxxxxxxx or 018xxxxxxxx"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#961241] font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Delivery Location</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryArea('inside-dhaka')}
                    className={`p-2 rounded-lg border text-left font-medium ${
                      deliveryArea === 'inside-dhaka'
                        ? 'bg-rose-50 border-[#961241] text-[#961241] font-bold'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>Inside Dhaka</span>
                    <span className="block text-[10px] text-slate-500">৳60 (Free &gt; ৳1000)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryArea('outside-dhaka')}
                    className={`p-2 rounded-lg border text-left font-medium ${
                      deliveryArea === 'outside-dhaka'
                        ? 'bg-rose-50 border-[#961241] text-[#961241] font-bold'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>Outside Dhaka</span>
                    <span className="block text-[10px] text-slate-500">৳110 (Free &gt; ৳1000)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/Holding no, Road, Area/Thana, City"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#961241]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'cod', label: 'Cash on Delivery (COD)' },
                    { id: 'bkash', label: 'bKash Mobile Pay' },
                    { id: 'nagad', label: 'Nagad Pay' },
                    { id: 'rocket', label: 'Rocket DBBL' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${
                        paymentMethod === method.id
                          ? 'bg-slate-900 text-white font-bold border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id as any)}
                        className="text-[#961241]"
                      />
                      <span className="text-[11px] truncate">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          )}

          {step === 'success' && completedOrder && (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Success! Order Placed
                </span>
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  Reference: #{completedOrder.orderId}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Thank you, <strong>{completedOrder.customerName}</strong>. A confirmation SMS will be sent to <strong>{completedOrder.phone}</strong>.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping Address:</span>
                  <span className="font-semibold text-slate-800 text-right">{completedOrder.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment:</span>
                  <span className="font-semibold uppercase text-slate-800">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-slate-200 pt-1.5 text-sm">
                  <span>Payable Total:</span>
                  <span className="text-[#961241]">৳{completedOrder.total}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500">
                Shipped directly from TRSP Headquarters, Sultan Ahmed Plaza, Purana Paltan, Dhaka.
              </p>

              <button
                onClick={handleResetAndClose}
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800"
              >
                Continue Browsing Books
              </button>
            </div>
          )}

        </div>

        {/* Footer Summary / CTAs */}
        {cart.length > 0 && step !== 'success' && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Books Subtotal:</span>
                <span className="font-bold tabular-nums">৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Courier Delivery:</span>
                <span className="font-bold tabular-nums">
                  {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : `৳${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-1.5">
                <span>Total Amount:</span>
                <span className="text-[#961241] tabular-nums">৳{total}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="w-full py-3 bg-[#44a72d] hover:bg-[#3d9828] text-white rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <span>Proceed to Delivery & Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-100"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-2.5 bg-[#44a72d] hover:bg-[#3d9828] text-white rounded-xl font-black text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Order (৳{total})</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
