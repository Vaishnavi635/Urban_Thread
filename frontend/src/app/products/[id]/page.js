'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/products/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        } else {
          setError('The requested piece could not be found.');
        }
      } catch (err) {
        setError('Server synchronization error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-[40px]" />
          <div className="space-y-8">
            <div className="h-12 w-2/3 bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-2xl" />
            <div className="h-24 w-full bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen py-40 text-center flex flex-col items-center">
        <p className="text-zinc-500 font-medium mb-8 uppercase tracking-widest">{error || 'Piece not found'}</p>
        <Link href="/products" className="premium-button text-[10px] tracking-widest uppercase">Return to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-40 px-6 max-w-7xl mx-auto w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-16">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
        <div className="w-1 h-1 rounded-full bg-zinc-300" />
        <Link href="/products" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Catalog</Link>
        <div className="w-1 h-1 rounded-full bg-zinc-300" />
        <span className="text-zinc-900 dark:text-zinc-500 truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
        {/* Left: Product Media */}
        <div className="space-y-6">
          <div className="premium-card bg-zinc-50 dark:bg-zinc-900/40 aspect-[3/4] overflow-hidden rounded-[50px] shadow-sm border-zinc-100 dark:border-zinc-900">
            <img 
              src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop'} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop';
              }}
            />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="aspect-square bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-100 dark:border-zinc-900" />
            <div className="aspect-square bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-100 dark:border-zinc-900" />
            <div className="aspect-square bg-accent/5 rounded-3xl border border-accent/20 flex items-center justify-center text-accent text-[10px] font-bold uppercase tracking-widest">
              Gallery
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col pt-4">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">{product.category}</p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white mb-6 uppercase leading-[0.9]">
              {product.name}
            </h1>
            <div className="flex items-center space-x-6">
              <span className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white">₹{product.price}</span>
              <div className={`px-5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] ${product.stock > 0 ? 'bg-green-50 text-green-600 dark:bg-green-950/20' : 'bg-red-50 text-red-600 dark:bg-red-950/20'}`}>
                {product.stock > 0 ? 'Available in Archive' : 'Sold Out - Request Restock'}
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Configurator Placeholder */}
            {product.stock > 0 && (
              <div className="space-y-8 py-8 border-y border-zinc-100 dark:border-zinc-900">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Select Volume</span>
                  <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 rounded-full p-1.5">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-all font-bold"
                     aria-label="Decrease quantity">-</button>
                    <span className="w-12 h-10 flex items-center justify-center font-black text-sm">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-all font-bold"
                    aria-label="Increase quantity">+</button>
                  </div>
                </div>

                <div className="space-y-4">
                    <button 
                      onClick={() => {
                        addToCart(product, quantity);
                        setAdded(true);
                        setTimeout(() => setAdded(false), 2000);
                      }}
                      className={`premium-button w-full py-6 text-[10px] uppercase tracking-[0.3em] transition-all duration-300 ${added ? 'bg-green-600 dark:bg-green-600 text-white' : ''}`}
                    >
                      {added ? 'Added to Archive' : 'Add to Archive Bag'}
                    </button>
                    <button 
                      onClick={() => {
                        addToCart(product, quantity);
                        router.push('/checkout');
                      }}
                      className={`premium-button w-full py-6 text-[10px] uppercase tracking-[0.3em] transition-all duration-300 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100`}
                    >
                      Buy Now
                    </button>
                    <p className="text-center text-[9px] font-bold text-zinc-400 tracking-widest uppercase">
                      Free express delivery on all premium orders
                    </p>
                </div>
              </div>
            )}

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-10 pt-4">
               <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Craftsmanship</h4>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">Milanese Tailoring</p>
               </div>
               <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Shipping</h4>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">Complimentary Global</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
