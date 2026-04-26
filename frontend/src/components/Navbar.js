'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { theme, toggleTheme } = useAccessibility();
  const { cartCount } = useCart();
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <nav className="glass-nav px-6 py-4 dark:bg-black/90">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
          URBAN<span className="text-accent">THREAD</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
          <Link href="/products" className="hover:text-accent transition-all">Collections</Link>
          <Link href="/products?category=Men" className="hover:text-accent transition-all">Men</Link>
          <Link href="/products?category=Women" className="hover:text-accent transition-all">Women</Link>
          <Link href="/products?category=Accessories" className="hover:text-accent transition-all">Accessories</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* Cart */}
          <Link href="/cart" className="p-2 relative group" aria-label="Shopping Cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth: Show user info or login button */}
          {!loading && (
            user ? (
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {user.name.split(' ')[0]}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-xs font-bold uppercase tracking-widest border border-zinc-200 dark:border-zinc-800 px-5 py-2 rounded-full hover:bg-red-500 hover:border-red-500 hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="hidden md:block text-xs font-bold uppercase tracking-widest border border-zinc-200 dark:border-zinc-800 px-5 py-2 rounded-full hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-900 transition-all"
              >
                Login
              </Link>
            )
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2"
            aria-label="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-4">
          <Link href="/products" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium uppercase tracking-widest py-2 hover:text-accent">Collections</Link>
          <Link href="/products?category=Men" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium uppercase tracking-widest py-2 hover:text-accent">Men</Link>
          <Link href="/products?category=Women" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium uppercase tracking-widest py-2 hover:text-accent">Women</Link>
          <Link href="/products?category=Accessories" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium uppercase tracking-widest py-2 hover:text-accent">Accessories</Link>
          
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
            {user ? (
              <button onClick={handleLogout} className="text-sm font-bold uppercase tracking-widest text-red-500">Logout ({user.name.split(' ')[0]})</button>
            ) : (
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-accent">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
