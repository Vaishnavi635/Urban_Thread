'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    setMounted(true);
    // Generate a random order number like #UT-8492X
    const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomNums = Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(`#UT-${randomNums}${randomChars.substring(0, 1)}`);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-12 flex justify-center items-center">
        <div className="absolute inset-0 bg-green-500/20 dark:bg-green-500/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white z-10 shadow-2xl shadow-green-500/30">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <span className="px-5 py-2 rounded-full border border-zinc-100 dark:border-zinc-900 text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-8 inline-block bg-zinc-50 dark:bg-zinc-900/50">
          Order Confirmed
      </span>

      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-none mb-6">
          Payment <br/> Successful
      </h1>

      <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-md mx-auto mb-10 leading-relaxed">
        Your Purchase has been verified. The premium selection under order <span className="text-zinc-900 dark:text-white font-bold">{orderNumber}</span> is now being prepared by our assistant team.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
        <Link 
          href="/products" 
          className="premium-button px-12 py-5 text-[10px] uppercase tracking-[0.3em] min-w-[250px]"
        >
          Return to Shopping
        </Link>
        <Link 
          href="/" 
          className="premium-button px-12 py-5 text-[10px] uppercase tracking-[0.3em] min-w-[250px]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
