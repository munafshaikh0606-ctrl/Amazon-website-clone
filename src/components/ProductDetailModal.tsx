import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Lock, 
  Share2, 
  Heart,
  ChevronDown,
  Sparkles,
  MessageSquarePlus
} from 'lucide-react';
import { Product, ProductReview } from '../types';
import { useApp } from '../context/AppContext';
import { PrimeBadge } from './AmazonLogo';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, setCheckoutModalOpen, showToast, user } = useApp();
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [couponApplied, setCouponApplied] = useState(false);
  const [wishlistSaved, setWishlistSaved] = useState(false);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState(user?.name || 'Alex Morgan');

  const discountPercent = product.listPrice
    ? Math.round(((product.listPrice - product.price) / product.listPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedQty, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedQty, selectedColor, selectedSize);
    onClose();
    setCheckoutModalOpen(true);
  };

  const handleToggleWishlist = () => {
    setWishlistSaved(!wishlistSaved);
    showToast(wishlistSaved ? 'Removed from Wish List' : 'Added to your Wish List');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim()) return;

    const review: ProductReview = {
      id: 'rev-' + Date.now(),
      author: newAuthor.trim() || 'Amazon Customer',
      rating: newRating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title: newTitle.trim(),
      comment: newComment.trim(),
      verified: true,
      helpfulCount: 0
    };

    const updated = [review, ...reviewsList];
    setReviewsList(updated);

    // Update product rating and reviews count dynamically
    const totalRating = updated.reduce((sum, r) => sum + r.rating, 0);
    product.rating = Math.round((totalRating / updated.length) * 10) / 10;
    product.reviewsCount = updated.length;
    product.reviews = updated;

    setShowReviewForm(false);
    setNewTitle('');
    setNewComment('');
    showToast('Thank you! Your customer review has been published.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-start justify-center p-2 sm:p-4 md:p-6 backdrop-blur-xs">
      <div className="relative w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden my-6 border border-gray-200">
        
        {/* Top bar with close button */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-500 font-medium truncate">
            <span>Department: </span>
            <span className="text-gray-900 font-semibold">{product.category}</span>
            <span className="mx-1.5">/</span>
            <span className="text-gray-700">{product.brand}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 3-column Layout (Image | Details | Buy Box) */}
        <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Column 1: Image Showcase (md: 4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="relative w-full aspect-square bg-white border border-gray-100 rounded-lg p-4 flex items-center justify-center shadow-xs">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
              {product.bestSeller && (
                <span className="absolute top-3 left-3 bg-[#e67a00] text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase">
                  #1 Best Seller
                </span>
              )}
            </div>

            {/* Quick Share / Wishlist buttons */}
            <div className="mt-4 flex items-center gap-3 w-full justify-center">
              <button
                onClick={handleToggleWishlist}
                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-amber-800 font-medium py-1.5 px-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlistSaved ? 'fill-red-500 text-red-500' : ''}`} />
                {wishlistSaved ? 'In Wish List' : 'Add to List'}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('Product link copied to clipboard');
                }}
                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-amber-800 font-medium py-1.5 px-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
            </div>
          </div>

          {/* Column 2: Center Details (md: 5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <span className="text-xs font-semibold text-sky-700 hover:underline cursor-pointer">
                Visit the {product.brand} Store
              </span>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mt-1 leading-snug">
                {product.title}
              </h1>
            </div>

            {/* Ratings & reviews */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200 text-xs">
              <div className="flex items-center text-[#de7921]">
                <span className="font-bold text-gray-900 mr-1.5 text-sm">{product.rating}</span>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= Math.round(product.rating)
                        ? 'fill-[#de7921] text-[#de7921]'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-sky-700 hover:underline cursor-pointer">
                {reviewsList.length} ratings
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">Search this page</span>
            </div>

            {/* Price section */}
            <div className="space-y-1">
              {discountPercent > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#cc0c39] bg-rose-50 px-1.5 py-0.5 rounded">
                    -{discountPercent}%
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    Typical price: ${product.listPrice?.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex items-baseline">
                <span className="text-sm font-bold text-gray-900 mr-0.5">$</span>
                <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  {Math.floor(product.price)}
                </span>
                <span className="text-sm font-bold text-gray-900 align-super">
                  {(product.price % 1).toFixed(2).substring(2)}
                </span>
              </div>

              {/* Coupon toggle */}
              <div className="pt-2">
                <label className="inline-flex items-center gap-2 text-xs text-gray-800 bg-amber-50/70 p-2 rounded border border-amber-200/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={couponApplied}
                    onChange={(e) => setCouponApplied(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span>
                    Apply <strong className="text-emerald-700">$10.00 coupon</strong> at checkout.
                  </span>
                </label>
              </div>
            </div>

            {/* Color variants if any */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <div className="text-xs font-semibold text-gray-700">
                  Color: <span className="font-bold text-gray-900">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`text-xs px-3 py-1.5 rounded border transition-all ${
                        selectedColor === color
                          ? 'border-amber-600 bg-amber-50 font-semibold shadow-xs'
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size variants if any */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <div className="text-xs font-semibold text-gray-700">
                  Size / Capacity: <span className="font-bold text-gray-900">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`text-xs px-3 py-1.5 rounded border transition-all ${
                        selectedSize === size
                          ? 'border-amber-600 bg-amber-50 font-semibold shadow-xs'
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <hr className="border-gray-200" />

            {/* About this item features */}
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-2">About this item</h2>
              <ul className="space-y-1.5 text-xs text-gray-700 list-disc list-outside pl-4">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs Table */}
            {product.specs && (
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Product Specifications
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs border-t border-gray-100 pt-2">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <React.Fragment key={key}>
                      <span className="text-gray-500 font-medium">{key}</span>
                      <span className="text-gray-900 font-semibold truncate">{val}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Column 3: The Contiguous Purchase Box (md: 3 cols) */}
          <div className="md:col-span-3">
            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-xs space-y-3 sticky top-4">
              
              <div className="text-2xl font-bold text-gray-900 tabular-nums">
                ${(couponApplied ? Math.max(0, product.price - 10) : product.price).toFixed(2)}
              </div>

              {product.prime && (
                <div className="flex items-center gap-1.5">
                  <PrimeBadge size="md" />
                  <span className="text-xs text-gray-700">Two-Day</span>
                </div>
              )}

              <div className="text-xs text-gray-700 leading-snug">
                FREE delivery <strong className="text-gray-900">Tomorrow</strong>. Order within{' '}
                <span className="text-emerald-700 font-bold">4 hrs 12 mins</span>.
              </div>

              {/* Stock Status */}
              <div className="text-sm font-bold text-emerald-700">
                In Stock
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600 font-medium">Quantity:</label>
                <select
                  value={selectedQty}
                  onChange={(e) => setSelectedQty(Number(e.target.value))}
                  className="bg-gray-100 border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-800 focus:ring-1 focus:ring-amber-500 outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 px-4 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-gray-900 text-xs font-semibold rounded-full border border-[#fcd200] shadow-xs transition-colors cursor-pointer"
              >
                Add to Cart
              </button>

              {/* Buy Now button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-2.5 px-4 bg-[#ffa41c] hover:bg-[#fa8900] active:bg-[#e87a00] text-gray-900 text-xs font-semibold rounded-full border border-[#ff8f00] shadow-xs transition-colors cursor-pointer"
              >
                Buy Now
              </button>

              {/* Secure transaction notice */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-1">
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span>Secure transaction</span>
              </div>

              {/* Fulfillment info */}
              <div className="text-[11px] text-gray-600 space-y-0.5 border-t border-gray-100 pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Ships from</span>
                  <span className="font-medium text-gray-800">Amazon.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sold by</span>
                  <span className="font-medium text-gray-800">{product.brand} Official</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Returns</span>
                  <span className="font-medium text-sky-700">Eligible for 30-day refund</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Customer Reviews & Feedback Section */}
        <div className="bg-gray-50 border-t border-gray-200 p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Customer Reviews</h3>
              <p className="text-xs text-gray-500">
                {product.rating} out of 5 stars · {reviewsList.length} global ratings
              </p>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold text-xs rounded border border-gray-300 shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-600" />
              <span>{showReviewForm ? 'Cancel Review' : 'Write a customer review'}</span>
            </button>
          </div>

          {/* Write a Review Form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="bg-white p-5 rounded-lg border border-gray-300 shadow-sm space-y-4 max-w-2xl">
              <h4 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">
                Create Review
              </h4>

              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Overall rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(star)}
                      className="p-1 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || newRating)
                            ? 'fill-[#de7921] text-[#de7921]'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-semibold text-gray-700">
                    {newRating} out of 5 stars
                  </span>
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 rounded focus:border-amber-500 outline-none"
                  placeholder="e.g. Alex Morgan"
                />
              </div>

              {/* Review Headline */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Add a headline</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 rounded focus:border-amber-500 outline-none"
                  placeholder="What's most important to know?"
                />
              </div>

              {/* Review Body */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Add a written review</label>
                <textarea
                  required
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 text-xs border border-gray-300 rounded focus:border-amber-500 outline-none"
                  placeholder="What did you like or dislike? What did you use this product for?"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium text-xs rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold text-xs rounded border border-[#fcd200] shadow-xs cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}

          {/* Existing & New Reviews List */}
          {reviewsList.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">
              No customer reviews yet. Be the first to write a review!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="bg-white p-4 rounded border border-gray-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-xs text-gray-900">{rev.author}</div>
                    <span className="text-[11px] text-gray-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#de7921]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-[#de7921]' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-xs text-gray-900">{rev.title}</span>
                  </div>
                  {rev.verified && (
                    <div className="text-[10px] font-bold text-[#c45500] flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Verified Purchase
                    </div>
                  )}
                  <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
