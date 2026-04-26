'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/features/products/ProductCard';

function ProductGrid() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = 'http://localhost:5001/api/products?';
        if (category) url += `category=${category}&`;
        if (searchTerm) url += `search=${searchTerm}`;
        
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.success) {
          setProducts(data.products);
        } else {
          setError('The collection is currently unavailable.');
        }
      } catch (err) {
        setError('Connection error. Please ensure the backend server is active.');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchProducts, 500);
    return () => clearTimeout(timeoutId);
  }, [category, searchTerm]);

  // Loading State
  if (loading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="flex flex-col space-y-4">
            <div className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 rounded-3xl animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="py-40 text-center flex flex-col items-center">
         <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
         </div>
         <p className="text-zinc-500 font-medium mb-6">{error}</p>
         <button onClick={() => window.location.reload()} className="premium-button text-[10px] uppercase tracking-widest px-8">Refresh Gallery</button>
      </div>
    );
  }

  // Empty State
  if (products.length === 0) {
    return (
      <div className="py-40 text-center border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-[40px]">
         <p className="text-xl font-bold text-zinc-400">No pieces found in this category.</p>
         <Link href="/products" className="text-xs font-bold uppercase tracking-widest text-accent mt-4 inline-block border-b border-accent">View Full Catalog</Link>
      </div>
    );
  }

  // Default Grid State
  return (
    <>
      <div className="mb-12 max-w-md">
        <div className="relative group">
          <input 
            type="text"
            placeholder="Search our archive..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-12 py-4 rounded-3xl outline-none focus:border-accent transition-all text-sm font-medium"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-20 pb-40 px-6 max-w-7xl mx-auto w-full">
      <header className="mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">
              <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
              <div className="w-1 h-1 rounded-full bg-zinc-300" />
              <span className="text-zinc-900 dark:text-zinc-500">Catalog</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white">
              Collections
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {['All', 'Men', 'Women', 'Accessories'].map((cat) => (
               <Link 
                 key={cat}
                 href={cat === 'All' ? '/products' : `/products?category=${cat}`}
                 className="px-6 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-all"
               >
                 {cat}
               </Link>
            ))}
          </div>
        </div>
      </header>

      <Suspense fallback={<div className="h-96 w-full bg-zinc-50 dark:bg-zinc-900 rounded-[40px] animate-pulse" />}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
