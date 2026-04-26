export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-900 px-6 py-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-xl font-bold tracking-tighter mb-4 text-zinc-900 dark:text-white">URBAN THREAD</h2>
          <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
            Redefining urban fashion with premium materials and timeless design. Ethically sourced, globally inspired.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">Shop</h3>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li><a href="/products?category=Men" className="hover:text-accent transition-colors">Men's Collection</a></li>
            <li><a href="/products?category=Women" className="hover:text-accent transition-colors">Women's Collection</a></li>
            <li><a href="/products?category=Accessories" className="hover:text-accent transition-colors">Accessories</a></li>
            <li><a href="/products" className="hover:text-accent transition-colors">New Arrivals</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">Customer Care</h3>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-accent transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Size Guide</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Track Your Order</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-900 dark:text-white">Newsletter</h3>
          <p className="text-sm text-zinc-500 mb-4">Stay updated on our latest releases.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-sm focus:border-accent outline-none flex-grow"
            />
            <button className="ml-4 text-xs font-bold uppercase tracking-widest text-accent">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-zinc-400 space-y-4 md:space-y-0">
        <p>© 2024 Urban Thread. Crafted for the modern individual.</p>
        <div className="flex space-x-8">
          <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-200">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-200">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
