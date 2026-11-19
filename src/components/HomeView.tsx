import React from 'react';
import { useApp } from '../context/AppContext';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles, Tag, ShieldCheck, History, Trash2 } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    products, 
    setCurrentView, 
    setSelectedCategory, 
    setPrimeOnly, 
    recommendedProducts, 
    browsingHistory, 
    clearBrowsingHistory,
    setActiveProductDetail 
  } = useApp();

  const techProducts = products.filter(
    (p) => p.category === 'Electronics' || p.category === 'Smart Home' || p.category === 'Computers & Accessories'
  );

  const homeAndBooks = products.filter(
    (p) => p.category === 'Home & Kitchen' || p.category === 'Books'
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Hero with 4-card quad overlay */}
      <HeroBanner />

      {/* Recommended for You Section (Dynamic based on browsing history) */}
      <section className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF9900]" />
                Personalized Recommendations
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                Recommended for You
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {browsingHistory.length > 0
                  ? `Dynamically suggested based on your recent views in ${browsingHistory[0].category} & ${browsingHistory[0].brand}.`
                  : 'Popular bestseller picks tailored for your shopping interests.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed History Strip (if any) */}
      {browsingHistory.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4">
          <div className="bg-white rounded border border-gray-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                <History className="w-4 h-4 text-sky-700" />
                <span>Your Recently Viewed Items ({browsingHistory.length})</span>
              </div>
              <button
                onClick={clearBrowsingHistory}
                className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear history</span>
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {browsingHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveProductDetail(item)}
                  className="w-44 shrink-0 bg-gray-50 hover:bg-amber-50/40 border border-gray-200 rounded p-3 cursor-pointer transition-all group flex flex-col justify-between"
                >
                  <div className="aspect-square bg-white rounded p-2 flex items-center justify-center mb-2 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 line-clamp-1 group-hover:text-amber-800">
                      {item.title}
                    </h4>
                    <div className="text-sm font-bold text-gray-900 mt-1 tabular-nums">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 1: Best Sellers in Personal Tech & Smart Living */}
      <section className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                Trending Deals in Tech & Smart Audio
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Top rated audio gear, smart displays, and portable computing with Prime One-Day delivery.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('Electronics');
                setCurrentView('search');
              }}
              className="text-xs text-sky-700 hover:text-amber-800 font-semibold flex items-center gap-1 hover:underline cursor-pointer shrink-0"
            >
              See all tech
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {techProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Strip: Prime Delivery & Guarantee */}
      <section className="max-w-[1440px] mx-auto px-4">
        <div className="bg-gradient-to-r from-[#131921] via-[#232f3e] to-[#131921] rounded-lg p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Member Benefits Included
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Fast, FREE delivery on millions of essential items
            </h3>
            <p className="text-xs text-gray-300 max-w-xl">
              Enjoy hassle-free returns, exclusive Prime lightning discounts, and award-winning customer support.
            </p>
          </div>
          <button
            onClick={() => {
              setPrimeOnly(true);
              setCurrentView('search');
            }}
            className="px-6 py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold text-xs rounded-full border border-[#fcd200] shadow-sm shrink-0 cursor-pointer transition-all active:scale-95"
          >
            Explore Prime Deals
          </button>
        </div>
      </section>

      {/* Section 2: Home, Kitchen & Bestselling Books */}
      <section className="max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded border border-gray-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                Customer Favorites: Kitchen & Reading Essentials
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Up to 30% off barista machines, bestselling books, and apparel.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('Home & Kitchen');
                setCurrentView('search');
              }}
              className="text-xs text-sky-700 hover:text-amber-800 font-semibold flex items-center gap-1 hover:underline cursor-pointer shrink-0"
            >
              See all home
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {homeAndBooks.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
