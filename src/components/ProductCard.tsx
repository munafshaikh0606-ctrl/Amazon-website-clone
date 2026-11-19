import React from 'react';
import { Star, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { PrimeBadge } from './AmazonLogo';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setActiveProductDetail, addToCart, user } = useApp();

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center text-[#de7921]" title={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? 'fill-[#de7921] text-[#de7921]'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const discountPercent = product.listPrice
    ? Math.round(((product.listPrice - product.price) / product.listPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between p-3 sm:p-4 group">
      <div>
        {/* Badges bar */}
        <div className="h-5 flex items-center justify-between gap-1 mb-2">
          {product.bestSeller ? (
            <span className="bg-[#e67a00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              #1 Best Seller
            </span>
          ) : product.amazonChoice ? (
            <span className="bg-[#232f3e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1">
              Amazon's <span className="text-[#f08804]">Choice</span>
            </span>
          ) : product.dealTag ? (
            <span className="bg-[#cc0c39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
              Limited time deal
            </span>
          ) : (
            <div />
          )}
        </div>

        {/* Product Image */}
        <div
          onClick={() => setActiveProductDetail(product)}
          className="relative aspect-square w-full bg-white flex items-center justify-center p-2 rounded cursor-pointer overflow-hidden mb-3"
        >
          <img
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Styled fallback container
              const target = e.currentTarget;
              target.onerror = null;
              target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        {/* Brand */}
        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
          {product.brand}
        </div>

        {/* Title */}
        <h3
          onClick={() => setActiveProductDetail(product)}
          className="text-sm font-medium text-gray-900 group-hover:text-[#c45500] cursor-pointer line-clamp-2 leading-snug mb-1.5"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Star Rating & Review Count */}
        <div className="flex items-center gap-1.5 mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-sky-700 hover:text-amber-700 hover:underline cursor-pointer tabular-nums">
            {product.reviewsCount.toLocaleString()}
          </span>
        </div>

        {/* Price block */}
        <div className="mb-2">
          {discountPercent > 0 && (
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-xs font-semibold text-[#cc0c39] bg-rose-50 px-1 rounded">
                -{discountPercent}%
              </span>
              <span className="text-xs text-gray-400 line-through tabular-nums">
                ${product.listPrice?.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex items-baseline">
            <span className="text-xs font-bold text-gray-900 self-start mt-0.5">$</span>
            <span className="text-2xl font-bold text-gray-900 tracking-tight tabular-nums">
              {Math.floor(product.price)}
            </span>
            <span className="text-xs font-bold text-gray-900 self-start mt-0.5 tabular-nums">
              {(product.price % 1).toFixed(2).substring(2)}
            </span>
          </div>
        </div>

        {/* Prime & Delivery info */}
        <div className="text-xs space-y-1 mb-3">
          {product.prime && (
            <div className="flex items-center gap-1">
              <PrimeBadge size="sm" />
              <span className="text-[11px] text-gray-600 font-medium">One-Day</span>
            </div>
          )}
          <div className="text-[11px] text-gray-600">
            FREE delivery <span className="font-bold text-gray-900">Tomorrow, by 10 PM</span>
          </div>
          {product.stockCount && product.stockCount < 10 && (
            <div className="text-[11px] font-semibold text-[#b12704]">
              Only {product.stockCount} left in stock - order soon.
            </div>
          )}
        </div>
      </div>

      {/* Add to Cart button */}
      <button
        onClick={() => addToCart(product, 1)}
        className="w-full py-2 px-3 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-gray-900 text-xs font-semibold rounded-full border border-[#fcd200] shadow-xs transition-all active:scale-98 flex items-center justify-center gap-1 cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  );
};
