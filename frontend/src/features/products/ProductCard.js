'use client';

import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product._id}`} className="group h-full">
      <div className="premium-card flex flex-col h-full bg-white dark:bg-zinc-900 border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 dark:bg-zinc-800">
          <img
            src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop';
            }}
          />

          {/* Badge */}
          <div className="absolute top-6 left-6">
            <span className="bg-slate-900/90 backdrop-blur-md text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em]">
              {product.category}
            </span>
          </div>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-8 flex flex-col flex-grow bg-white dark:bg-black">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className={`w-1.5 h-1.5 rounded-full ${star <= Math.round(product.ratings || 0) ? 'bg-sky-500' : 'bg-slate-200 dark:bg-zinc-700'}`} />
              ))}
            </div>
            <p className="text-lg font-black text-slate-900 dark:text-zinc-50 tracking-tighter">₹{product.price * 20}</p>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-200 group-hover:text-sky-500 transition-colors leading-tight mb-3">
            {product.name}
          </h3>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-500 font-medium line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
