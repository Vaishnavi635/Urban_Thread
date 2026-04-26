'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, mounted } = useCart();

  // Prevent hydration flicker
  if (!mounted) return (
    <div className="min-h-screen pt-20 pb-40 px-6 max-w-7xl mx-auto w-full animate-pulse">
        <div className="h-20 w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded-3xl mb-20" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
                {[1,2,3].map(i => <div key={i} className="h-40 bg-zinc-100 dark:bg-zinc-900 rounded-3xl" />)}
            </div>
            <div className="h-96 bg-zinc-100 dark:bg-zinc-900 rounded-3xl" />
        </div>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
        <div className="mb-10 text-center">
            <span className="px-4 py-1.5 rounded-full border border-zinc-100 dark:border-zinc-900 text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6 inline-block">
                Status: Empty
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
                Shopping <br/> Bag
            </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12 max-w-xs text-center font-medium leading-relaxed">
          Your collection is currently empty. Explore the archive to find your next essential pieces.
        </p>
        <Link href="/products" className="premium-button px-14 py-4">
          Return to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-40 px-6 max-w-7xl mx-auto w-full">
      <div className="mb-24">
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-white">Home</Link>
            <div className="w-1 h-1 rounded-full bg-zinc-300" />
            <span className="text-zinc-900 dark:text-zinc-500">Shopping Bag</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            Cart <br/> <span className="text-accent underline decoration-zinc-100 dark:decoration-zinc-900 underline-offset-8">Bag</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-12">
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col sm:flex-row gap-10 pb-12 border-b border-zinc-100 dark:border-zinc-900 last:border-0 group">
              <div className="w-full sm:w-48 aspect-[3/4] bg-zinc-50 dark:bg-zinc-900/40 rounded-[32px] overflow-hidden flex-shrink-0 shadow-sm border border-zinc-100 dark:border-zinc-900">
                <img 
                  src={item.images?.[0]?.url || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop'} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
              </div>
              
              <div className="flex flex-col flex-grow py-2">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-2">{item.category}</p>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-none mb-1">{item.name}</h3>
                    <p className="text-xs text-zinc-400 font-medium tracking-widest mt-2 uppercase">Unit Price: ₹{item.price}</p>
                  </div>
                  <p className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">₹{item.price * item.quantity}</p>
                </div>

                <div className="mt-12 flex items-center justify-between">
                   <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 p-1.5 rounded-full border border-zinc-100 dark:border-zinc-800">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-all font-bold"
                      aria-label="Decrease quantity">-</button>
                      <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-all font-bold"
                      aria-label="Increase quantity">+</button>
                   </div>
                   
                   <button 
                     onClick={() => removeFromCart(item._id)}
                     className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 hover:text-red-500 font-bold transition-colors"
                   >
                     Remove Piece —
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="premium-card p-12 bg-zinc-50/50 dark:bg-zinc-950 rounded-[50px] sticky top-32 border-zinc-100 dark:border-zinc-900">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-10">Valuation</h2>
            
            <div className="space-y-6 mb-12">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Cart Total ({cartCount} pieces)</span>
                <span className="font-bold">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Secured Shipping</span>
                <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Free</span>
              </div>
            </div>

            <div className="pt-10 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-end mb-12">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Total Value</p>
              <p className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white underline decoration-accent/30 decoration-8 underline-offset-4">₹{cartTotal}</p>
            </div>

            <div className="space-y-4">
                <button 
                  onClick={() => router.push('/checkout')}
                  className="premium-button w-full py-6 text-[10px] uppercase tracking-[0.4em] shadow-2xl shadow-accent/20"
                >
                    Claim Selections
                </button>
                <p className="text-center text-[9px] font-bold text-zinc-400 tracking-widest uppercase px-6">
                    By proceeding, you agree to our premium service protocols.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
