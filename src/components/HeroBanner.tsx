import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HERO_BANNER_IMAGE, INITIAL_PRODUCTS } from '../data/products';

export const HeroBanner: React.FC = () => {
  const {
    setActiveProductDetail,
    setSelectedCategory,
    setCurrentView,
    addToCart
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Upgrade Your World',
      subtitle: 'Exclusive discounts on smart home, personal audio, and bestselling books.',
      image: HERO_BANNER_IMAGE,
      cta: 'Explore Tech Deals',
      category: 'Electronics' as const
    }
  ];

  const quadCards = [
    {
      title: 'Hi-Fi Smart Audio',
      product: INITIAL_PRODUCTS[0], // Echo Studio
      actionText: 'Explore Echo Studio',
      badge: 'Best Seller'
    },
    {
      title: 'Kindle & Bestsellers',
      product: INITIAL_PRODUCTS[1], // Kindle Paperwhite
      actionText: 'Shop Kindle Paperwhite',
      badge: 'Editors\' Choice'
    },
    {
      title: 'Premium Noise-Cancelling',
      product: INITIAL_PRODUCTS[2], // Sony Headphones
      actionText: 'View Wireless Headphones',
      badge: 'Top Rated'
    },
    {
      title: 'Espresso & Coffee Bar',
      product: INITIAL_PRODUCTS[3], // Espresso Maker
      actionText: 'Discover Breville Barista',
      badge: 'Save $100'
    }
  ];

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Hero Visual Area with Gradient Mask */}
      <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] bg-slate-900">
        <img
          src={heroSlides[currentSlide].image}
          alt="Amazon Store Showcase"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />

        {/* Amazon Signature Bottom Fade into page background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#e3e6e6] via-[#e3e6e6]/30 to-transparent" />
        
        {/* Subtle Side Scrim */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

        {/* Hero Tagline on larger screens */}
        <div className="absolute top-8 left-6 sm:left-12 max-w-lg text-white drop-shadow-md z-10 hidden sm:block">
          <div className="inline-block bg-[#cc0c39] text-white text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-2">
            Limited Time Offers
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Next-Gen Personal Tech & Home Comforts
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-100 max-w-md line-clamp-2">
            Free Two-Day Shipping for Prime members. Huge savings across audio, kitchen, and digital devices.
          </p>
        </div>
      </div>

      {/* Amazon 4-Card Quad Overlay */}
      <div className="max-w-[1440px] mx-auto px-4 -mt-20 sm:-mt-36 md:-mt-44 relative z-20 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {quadCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-gray-200/80"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                    {card.title}
                  </h3>
                </div>

                {/* Clickable Image Container */}
                <div
                  onClick={() => setActiveProductDetail(card.product)}
                  className="relative cursor-pointer group bg-gray-50 rounded overflow-hidden aspect-[4/3] flex items-center justify-center mb-3"
                >
                  <img
                    src={card.product.image}
                    alt={card.product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {card.badge && (
                    <span className="absolute top-2 left-2 bg-[#cc0c39] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm">
                      {card.badge}
                    </span>
                  )}
                </div>

                <div 
                  onClick={() => setActiveProductDetail(card.product)}
                  className="text-xs text-gray-700 hover:text-amber-800 font-medium cursor-pointer line-clamp-2 mb-2"
                >
                  {card.product.title}
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900 tabular-nums">
                    ${card.product.price.toFixed(2)}
                  </span>
                  {card.product.listPrice && (
                    <span className="text-xs text-gray-400 line-through tabular-nums">
                      ${card.product.listPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Link & Quick Add */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveProductDetail(card.product)}
                  className="text-xs text-sky-700 hover:text-amber-700 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {card.actionText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => addToCart(card.product, 1)}
                  className="px-2.5 py-1 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 text-[11px] font-semibold rounded border border-[#fcd200] cursor-pointer shadow-xs active:scale-95 transition-transform"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
