'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-white dark:bg-black">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent animate-pulse" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="mb-6 inline-block">
            <span className="px-4 py-1.5 rounded-full border border-slate-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Spring Summer Collection 2026
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white leading-[0.9]">
            URBAN <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">THREAD</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Elevate your presence with our curated collection of minimalist essentials and statement pieces. Crafted for the modern individual.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/products" className="premium-button shadow-2xl shadow-accent/20 px-12 py-4">
              Explore Collection
            </Link>
            <Link href="/products" className="group flex items-center space-x-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-400 hover:text-accent transition-colors">
              <span>View Lookbook</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

      </section>

      {/* Featured Categories */}
      <section className="py-32 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">The Collection</h2>
            <p className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Shop by Category</p>
          </div>
          <Link href="/products" className="hidden md:block text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-accent border-b border-slate-200 dark:border-zinc-800 pb-1 transition-all">
            See all products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: 'Men', desc: 'Precision & Performance', count: 'Explore 42 Items', img: 'https://imagescdn.louisphilippe.com/img/app/product/4/40016093-22309797.jpg?auto=format&w=390' },
            { name: 'Women', desc: 'Modern Elegance', count: 'Explore 38 Items', img: 'https://5.imimg.com/data5/SELLER/Default/2022/5/UJ/KS/WE/144923424/0eee757c-507f-44ba-8f04-b05778b56ae7-500x500.jpg' },
            { name: 'Accessories', desc: 'Essential Tools', count: 'Explore 15 Items', img: 'https://ounass-ae.atgcdn.ae/contentful/b3xlytuyfm3e/4CEnplsFhY1u2DXk4qP7gK/d4cb5fcd039105581fbf78bb0386a52c/Women_Accessories_APP_PLP_Banner_copy.jpg?q=70' },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name}`}
              className="group premium-card p-12 flex flex-col justify-end min-h-[500px] relative overflow-hidden bg-white dark:bg-zinc-950"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent opacity-80" />
              </div>

              <div className="z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">{cat.count}</p>
                <h3 className="text-4xl font-black text-white mb-3 group-hover:translate-x-2 transition-transform duration-700">{cat.name}</h3>
                <p className="text-sm text-zinc-300 font-medium leading-relaxed">{cat.desc}</p>
              </div>

              <div className="absolute bottom-12 right-12 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-10">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-32 px-6 border-y border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { title: 'Quality', text: 'Finest materials sourced globally.' },
              { title: 'Design', text: 'Minimalist aesthetics, timeless appeal.' },
              { title: 'Ethics', text: 'Sustainable production, fair labor.' },
              { title: 'Agility', text: 'Designed for the urban movement.' },
            ].map((value) => (
              <div key={value.title} className="text-center md:text-left">
                <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-4">{value.title}</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Banner CTA */}
      <section className="py-32 px-6 flex items-center justify-center bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10 text-center max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">Master the <br /> Modern Landscape.</h2>
          <p className="text-zinc-400 text-lg mb-12 font-medium">Be the first to know about our next limited drop.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-zinc-900 border border-zinc-800 px-8 py-4 rounded-full text-sm outline-none focus:border-accent min-w-[300px]"
            />
            <button className="premium-button bg-white text-black">Notify Me</button>
          </div>
        </div>
      </section>
    </div>
  );
}
