import React from 'react';
import { 
  CheckCircle, 
  Trash2, 
  Bookmark, 
  ArrowRight, 
  ShoppingBag, 
  Gift, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrimeBadge } from './AmazonLogo';

export const CartView: React.FC = () => {
  const {
    cart,
    savedForLater,
    updateCartQuantity,
    removeFromCart,
    toggleGift,
    saveItemForLater,
    moveToCartFromSaved,
    cartSubtotal,
    cartCount,
    setCheckoutModalOpen,
    setCurrentView,
    setActiveProductDetail,
    user
  } = useApp();

  const freeShippingThreshold = 35;
  const qualifiesForFreeShipping = user?.primeMember || cartSubtotal >= freeShippingThreshold;
  const remainingForFree = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-6">
      
      {/* Free Shipping Progress Notification */}
      <div className="bg-white p-4 rounded border border-gray-200 mb-6 flex items-center gap-3">
        <CheckCircle className={`w-5 h-5 ${qualifiesForFreeShipping ? 'text-emerald-600' : 'text-amber-500'}`} />
        <div className="text-xs">
          {qualifiesForFreeShipping ? (
            <span className="text-gray-800">
              <strong className="text-emerald-700">Part of your order qualifies for FREE Shipping.</strong> Choose this option at checkout.
            </span>
          ) : (
            <span className="text-gray-700">
              Add <strong className="text-amber-700 font-bold">${remainingForFree.toFixed(2)}</strong> of eligible items to get <strong>FREE One-Day Delivery</strong>.
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Cart Items Column (lg: 8 cols) */}
        <div className="lg:col-span-8 bg-white p-4 sm:p-6 rounded border border-gray-200">
          <div className="flex items-baseline justify-between pb-3 border-b border-gray-200">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Shopping Cart</h1>
            <span className="text-xs text-gray-500 hidden sm:inline">Price</span>
          </div>

          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Your Amazon Cart is empty</h2>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Check your Saved for later items below or discover today's top deals and bestsellers.
              </p>
              <button
                onClick={() => setCurrentView('home')}
                className="px-6 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold text-xs rounded-full border border-[#fcd200] shadow-xs"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.product.id} className="py-5 flex flex-col sm:flex-row gap-4">
                  {/* Thumbnail */}
                  <div
                    onClick={() => setActiveProductDetail(item.product)}
                    className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 bg-gray-50 rounded border border-gray-100 p-2 flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Item Description & Actions */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3
                          onClick={() => setActiveProductDetail(item.product)}
                          className="text-sm sm:text-base font-semibold text-gray-900 hover:text-amber-800 cursor-pointer line-clamp-2"
                        >
                          {item.product.title}
                        </h3>
                        <div className="text-right shrink-0">
                          <span className="text-base font-bold text-gray-900 tabular-nums">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <div className="text-[11px] text-gray-500">
                              (${item.product.price.toFixed(2)} each)
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stock & Prime badges */}
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <span className="text-emerald-700 font-medium">In Stock</span>
                        {item.product.prime && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-300">·</span>
                            <PrimeBadge size="sm" />
                          </div>
                        )}
                      </div>

                      {/* Variant tags */}
                      {(item.selectedColor || item.selectedSize) && (
                        <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                          {item.selectedColor && <span>Color: <strong>{item.selectedColor}</strong></span>}
                          {item.selectedSize && <span>Size: <strong>{item.selectedSize}</strong></span>}
                        </div>
                      )}

                      {/* Gift checkbox */}
                      <label className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.isGift || false}
                          onChange={() => toggleGift(item.product.id)}
                          className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
                        />
                        <span className="flex items-center gap-1">
                          <Gift className="w-3.5 h-3.5 text-gray-400" />
                          This is a gift
                        </span>
                      </label>
                    </div>

                    {/* Quantity & Actions Bar */}
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                      {/* Quantity Selector */}
                      <div className="flex items-center bg-gray-100 border border-gray-300 rounded shadow-xs">
                        <span className="px-2 text-gray-600 font-medium">Qty:</span>
                        <select
                          value={item.quantity}
                          onChange={(e) => updateCartQuantity(item.product.id, Number(e.target.value))}
                          className="bg-transparent py-1 pr-2 text-gray-900 font-semibold outline-none cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>

                      <span className="text-gray-300">|</span>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-sky-700 hover:text-amber-700 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>

                      <span className="text-gray-300">|</span>

                      <button
                        onClick={() => saveItemForLater(item.product.id)}
                        className="text-sky-700 hover:text-amber-700 hover:underline cursor-pointer"
                      >
                        Save for later
                      </button>

                      <span className="text-gray-300">|</span>

                      <button
                        onClick={() => setActiveProductDetail(item.product)}
                        className="text-sky-700 hover:text-amber-700 hover:underline cursor-pointer"
                      >
                        Compare with similar items
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Subtotal row inside cart column */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-gray-200 text-right">
              <span className="text-base text-gray-800">
                Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):{' '}
                <strong className="text-lg font-bold text-gray-900 tabular-nums">
                  ${cartSubtotal.toFixed(2)}
                </strong>
              </span>
            </div>
          )}
        </div>

        {/* Subtotal Checkout Box (lg: 4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded border border-gray-200 shadow-xs space-y-4">
            <div>
              <div className="text-lg text-gray-900">
                Subtotal ({cartCount} items):{' '}
                <strong className="font-extrabold text-xl tabular-nums">
                  ${cartSubtotal.toFixed(2)}
                </strong>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Encrypted 256-bit secure checkout</span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutModalOpen(true)}
              disabled={cart.length === 0}
              className={`w-full py-2.5 px-4 font-semibold text-xs rounded-full shadow-sm transition-all flex items-center justify-center gap-2 ${
                cart.length === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 border border-[#fcd200] cursor-pointer active:scale-98'
              }`}
            >
              Proceed to checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-gray-500 text-center leading-relaxed">
              By placing your order, you agree to Amazon's conditions of use and privacy notice.
            </div>
          </div>
        </div>

      </div>

      {/* Saved for Later Section */}
      {savedForLater.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Saved for later ({savedForLater.length} {savedForLater.length === 1 ? 'item' : 'items'})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedForLater.map(({ product, dateAdded }) => (
              <div key={product.id} className="border border-gray-200 rounded p-3 flex flex-col justify-between">
                <div>
                  <div
                    onClick={() => setActiveProductDetail(product)}
                    className="aspect-square bg-gray-50 rounded flex items-center justify-center p-2 mb-2 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h4
                    onClick={() => setActiveProductDetail(product)}
                    className="text-xs font-semibold text-gray-900 hover:text-amber-800 cursor-pointer line-clamp-2 mb-1"
                  >
                    {product.title}
                  </h4>
                  <div className="text-sm font-bold text-gray-900 mb-1 tabular-nums">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-gray-400 mb-3">Saved on {dateAdded}</div>
                </div>
                <button
                  onClick={() => moveToCartFromSaved(product.id)}
                  className="w-full py-1.5 px-3 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 text-xs font-semibold rounded-full border border-[#fcd200] cursor-pointer"
                >
                  Move to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
