'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  // Don't render the form if already authenticated
  if (loading || user) return null;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 bg-white dark:bg-black">
       <div className="w-full max-w-md">
         <div className="text-center mb-16">
           <span className="px-4 py-1.5 rounded-full border border-zinc-100 dark:border-zinc-900 text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6 inline-block">
             Member Portal
           </span>
           <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
             Welcome <br/> Back
           </h1>
         </div>

         <div className="premium-card p-1 bg-white dark:bg-black shadow-2xl shadow-zinc-200/50 dark:shadow-none !rounded-[40px]">
           <form onSubmit={handleLogin} className="p-8 space-y-8">
             {error && (
               <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-600 text-[10px] font-bold rounded-2xl border border-red-100 dark:border-red-900/50 uppercase tracking-widest text-center">
                 {error}
               </div>
             )}
             
             <div className="space-y-4">
               <div className="space-y-2">
                 <label htmlFor="login-email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-4">Email</label>
                 <input 
                   id="login-email"
                   type="email" 
                   required 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="name@example.com"
                   className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-transparent px-6 py-4 rounded-3xl outline-none focus:border-accent transition-all text-sm font-medium"
                 />
               </div>

               <div className="space-y-2">
                 <label htmlFor="login-password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-4">Password</label>
                 <input 
                   id="login-password"
                   type="password" 
                   required 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Your password"
                   className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-transparent px-6 py-4 rounded-3xl outline-none focus:border-accent transition-all text-sm font-medium"
                 />
               </div>
             </div>

             <button 
               disabled={submitting}
               className="premium-button w-full py-5 text-[10px] sm:text-xs uppercase tracking-[0.4em] shadow-2xl shadow-accent/20 disabled:opacity-50"
             >
               {submitting ? 'Signing in...' : 'Sign In'}
             </button>
           </form>
         </div>

         <p className="mt-12 text-center text-xs font-bold text-zinc-400 tracking-widest uppercase">
           New to Urban Thread? <Link href="/signup" className="text-accent ml-2 border-b-2 border-accent/20 hover:border-accent transition-all pb-1">Create Account</Link>
         </p>
       </div>
    </div>
  );
}
