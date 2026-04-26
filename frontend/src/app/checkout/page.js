'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, cartCount, clearCart, mounted } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form States
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    if (mounted && cartItems.length === 0 && !isProcessing) {
      router.push('/cart');
    }
  }, [mounted, cartItems, router, isProcessing]);

  if (!mounted || cartItems.length === 0) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
    </div>
  );

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Network Request / Payment Gateway Processing
    setTimeout(() => {
      clearCart();
      router.push('/success');
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-40 px-6 max-w-7xl mx-auto w-full">
      <div className="mb-16">
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">
            <Link href="/cart" className="hover:text-zinc-900 dark:hover:text-white">Bag</Link>
            <div className="w-1 h-1 rounded-full bg-zinc-300" />
            <span className="text-zinc-900 dark:text-zinc-500">Secure Checkout</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            Final <span className="text-accent underline decoration-zinc-100 dark:decoration-zinc-900 underline-offset-8">Step</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        {/* Left: Payment Options */}
        <div className="lg:col-span-2 space-y-12">
          <form onSubmit={handleCheckout} id="checkout-form">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-8">Payment Method</h2>
            
            <div className="space-y-6">
              {/* Option: Card */}
              <div 
                className={`border rounded-[32px] overflow-hidden transition-all duration-500 ${paymentMethod === 'card' ? 'border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-900/50' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'}`}
              >
                <div 
                  className="p-8 cursor-pointer flex items-center justify-between"
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-zinc-900 dark:border-white' : 'border-zinc-300 dark:border-zinc-600'}`}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-zinc-900 dark:bg-white rounded-full transition-transform slide-in" />}
                    </div>
                    <span className="font-bold text-zinc-900 dark:text-white tracking-tight">Credit / Debit Card</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-zinc-200 dark:bg-zinc-800 rounded flex items-center justify-center text-[8px] font-black">VISA</div>
                    <div className="w-8 h-5 bg-zinc-200 dark:bg-zinc-800 rounded flex items-center justify-center text-[8px] font-black">MC</div>
                  </div>
                </div>

                <div className={`px-8 transition-all duration-500 overflow-hidden ${paymentMethod === 'card' ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Card Number</label>
                      <input 
                        type="text" 
                        required={paymentMethod === 'card'}
                        maxLength={19}
                        placeholder="0000 0000 0000 0000" 
                        className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-3 font-medium text-lg outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Expiry Date</label>
                        <input 
                          type="text" 
                          required={paymentMethod === 'card'}
                          placeholder="MM/YY" 
                          maxLength={5}
                          className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-3 font-medium text-lg outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">CVV</label>
                        <input 
                          type="password" 
                          required={paymentMethod === 'card'}
                          placeholder="•••" 
                          maxLength={4}
                          className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-3 font-medium text-lg outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Option: UPI */}
              <div 
                className={`border rounded-[32px] overflow-hidden transition-all duration-500 ${paymentMethod === 'upi' ? 'border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-900/50' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'}`}
              >
                <div 
                  className="p-8 cursor-pointer flex items-center justify-between"
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-zinc-900 dark:border-white' : 'border-zinc-300 dark:border-zinc-600'}`}>
                      {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 bg-zinc-900 dark:bg-white rounded-full transition-transform slide-in" />}
                    </div>
                    <span className="font-bold text-zinc-900 dark:text-white tracking-tight">UPI (Unified Payments Interface)</span>
                  </div>
                  <div className="w-8 h-5 bg-zinc-200 dark:bg-zinc-800 rounded flex items-center justify-center text-[8px] font-black">UPI</div>
                </div>

                <div className={`px-8 transition-all duration-500 overflow-hidden ${paymentMethod === 'upi' ? 'max-h-48 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Enter Virtual Payment Address (VPA)</label>
                    <input 
                      type="text" 
                      required={paymentMethod === 'upi'}
                      placeholder="username@bank" 
                      className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-3 font-medium text-lg outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Option: COD */}
              <div 
                className={`border rounded-[32px] overflow-hidden transition-all duration-500 ${paymentMethod === 'cod' ? 'border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-900/50' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'}`}
              >
                <div 
                  className="p-8 cursor-pointer flex items-center space-x-4"
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-zinc-900 dark:border-white' : 'border-zinc-300 dark:border-zinc-600'}`}>
                    {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-zinc-900 dark:bg-white rounded-full transition-transform slide-in" />}
                  </div>
                  <span className="font-bold text-zinc-900 dark:text-white tracking-tight flex-grow">Cash on Delivery</span>
                </div>

                <div className={`px-8 transition-all duration-500 overflow-hidden ${paymentMethod === 'cod' ? 'max-h-24 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm font-medium text-zinc-500">Pay directly to our Assistant upon delivery of your items.</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="premium-card p-12 bg-zinc-50/50 dark:bg-zinc-950 rounded-[50px] sticky top-32 border-zinc-100 dark:border-zinc-900">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-10">Valuation</h2>
            
            <div className="space-y-6 mb-12">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Items ({cartCount})</span>
                <span className="font-bold">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Secured Shipping</span>
                <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Free</span>
              </div>
            </div>

            <div className="pt-10 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-end mb-12">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Total Due</p>
              <p className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white underline decoration-accent/30 decoration-8 underline-offset-4">₹{cartTotal}</p>
            </div>

            <div className="space-y-4">
                <button 
                  type="submit"
                  form="checkout-form"
                  disabled={isProcessing}
                  className={`premium-button w-full py-6 text-[10px] uppercase tracking-[0.4em] shadow-2xl shadow-accent/20 flex items-center justify-center transition-all ${isProcessing ? 'opacity-80 scale-95' : 'hover:scale-[1.02]'}`}
                >
                    {isProcessing ? 'Authorizing...' : 'Authorize Payment'}
                </button>
                <div className="flex items-center justify-center space-x-2 pt-4">
                  <svg className="w-3 h-3 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-center text-[9px] font-bold text-zinc-400 tracking-widest uppercase">
                      256-bit Secure Encrypted Checkout
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
