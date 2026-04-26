'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { user, signup, loading } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await signup(formData.name, formData.email, formData.password);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || user) return null;

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 bg-white dark:bg-black">
       <div className="w-full max-w-md">
         <div className="text-center mb-16">
           <span className="px-4 py-1.5 rounded-full border border-zinc-100 dark:border-zinc-900 text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6 inline-block">
             Join the Collection
           </span>
           <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
             Create <br/> Account
           </h1>
         </div>

         <div className="premium-card p-1 bg-white dark:bg-black shadow-2xl shadow-zinc-200/50 dark:shadow-none !rounded-[40px]">
           <form onSubmit={handleSignup} className="p-8 space-y-8">
             {error && (
               <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-600 text-[10px] font-bold rounded-2xl border border-red-100 dark:border-red-900/50 uppercase tracking-widest text-center">
                 {error}
               </div>
             )}
             
             <div className="space-y-4">
               <div className="space-y-2">
                 <label htmlFor="signup-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-4">Full Name</label>
                 <input 
                   id="signup-name"
                   name="name"
                   type="text" 
                   required 
                   value={formData.name}
                   onChange={handleChange}
                   placeholder="Your full name"
                   className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-transparent px-6 py-4 rounded-3xl outline-none focus:border-accent transition-all text-sm font-medium"
                 />
               </div>

               <div className="space-y-2">
                 <label htmlFor="signup-email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-4">Email Address</label>
                 <input 
                   id="signup-email"
                   name="email"
                   type="email" 
                   required 
                   value={formData.email}
                   onChange={handleChange}
                   placeholder="name@example.com"
                   className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-transparent px-6 py-4 rounded-3xl outline-none focus:border-accent transition-all text-sm font-medium"
                 />
               </div>

               <div className="space-y-2">
                 <label htmlFor="signup-password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-4">Password</label>
                 <input 
                   id="signup-password"
                   name="password"
                   type="password" 
                   required 
                   value={formData.password}
                   onChange={handleChange}
                   placeholder="At least 6 characters"
                   className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-transparent px-6 py-4 rounded-3xl outline-none focus:border-accent transition-all text-sm font-medium"
                 />
               </div>
             </div>

             <button 
               disabled={submitting}
               className="premium-button w-full py-5 text-[10px] sm:text-xs uppercase tracking-[0.4em] shadow-2xl shadow-accent/20 disabled:opacity-50"
             >
               {submitting ? 'Creating Account...' : 'Create Account'}
             </button>
           </form>
         </div>

         <p className="mt-12 text-center text-xs font-bold text-zinc-400 tracking-widest uppercase">
           Already a member? <Link href="/login" className="text-accent ml-2 border-b-2 border-accent/20 hover:border-accent transition-all pb-1">Sign In</Link>
         </p>
       </div>
    </div>
  );
}
