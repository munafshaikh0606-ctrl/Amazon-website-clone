import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    cartDrawerOpen,
    setCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    setCheckoutModalOpen,
    setCurrentView,
    setActiveProductDetail
  } = useApp();

  if (!cartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={() => setCartDrawerOpen(false)}
        className="fixed inset-0 bg-black/60 transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 bg-[#131921] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold">Your Cart ({cartCount})</h2>
          </div>
          <button
            onClick={() => setCartDrawerOpen(false)}
            className="text-gray-300 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
          {cart.length === 0 ? (
            <div className="py-16 text-center text-gray-500 text-xs">
              Your cart is empty.
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="py-3 flex gap-3">
                <div
                  onClick={() => {
                    setActiveProductDetail(item.product);
                    setCartDrawerOpen(false);
                  }}
                  className="w-16 h-16 bg-gray-50 rounded border border-gray-100 p-1 flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 
                    onClick={() => {
                      setActiveProductDetail(item.product);
                      setCartDrawerOpen(false);
                    }}
                    className="text-xs font-semibold text-gray-900 truncate hover:text-amber-800 cursor-pointer"
                  >
                    {item.product.title}
                  </h4>
                  <div className="text-xs font-bold text-gray-900 mt-0.5 tabular-nums">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-gray-100 text-gray-700"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold tabular-nums">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-gray-100 text-gray-700"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
            <div className="flex justify-between items-center text-sm font-bold text-gray-900">
              <span>Subtotal:</span>
              <span className="text-base tabular-nums">${cartSubtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                setCartDrawerOpen(false);
                setCheckoutModalOpen(true);
              }}
              className="w-full py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold text-xs rounded-full border border-[#fcd200] shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              Proceed to checkout
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCartDrawerOpen(false);
                setCurrentView('cart');
              }}
              className="w-full py-1 text-center text-xs text-sky-700 hover:underline"
            >
              View full cart & saved items
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
