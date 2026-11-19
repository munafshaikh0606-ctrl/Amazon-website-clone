import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  Truck, 
  Check, 
  ChevronRight, 
  Lock,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AmazonLogo, PrimeBadge } from './AmazonLogo';
import { Address } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    checkoutModalOpen,
    setCheckoutModalOpen,
    cart,
    cartSubtotal,
    activeAddress,
    setActiveAddress,
    addAddress,
    user,
    placeOrder
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'two-day' | 'one-day'>('two-day');
  const [paymentMethod, setPaymentMethod] = useState('Amazon Prime Visa ending in 4092');
  
  // New address form state
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: user?.name || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    isDefault: false
  });

  if (!checkoutModalOpen) return null;

  const shippingCost = (user?.primeMember || cartSubtotal >= 35 || shippingSpeed === 'standard') 
    ? (shippingSpeed === 'one-day' ? 5.99 : 0) 
    : 7.99;
  const tax = Math.round(cartSubtotal * 0.08875 * 100) / 100;
  const total = Math.round((cartSubtotal + shippingCost + tax) * 100) / 100;

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.name || !newAddr.street || !newAddr.city || !newAddr.zipCode) return;
    addAddress(newAddr);
    setShowNewAddress(false);
  };

  const handlePlaceOrder = () => {
    placeOrder(shippingSpeed, paymentMethod);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 flex flex-col">
      {/* Checkout Minimal Clean Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-4 sm:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <AmazonLogo light={false} className="h-7" />
          <h1 className="text-xl sm:text-2xl font-normal text-gray-800">
            Checkout <span className="text-sm text-sky-700">({cart.length} items)</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">256-Bit SSL Encrypted</span>
          </div>
          <button
            onClick={() => setCheckoutModalOpen(false)}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
            title="Return to shopping"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Checkout Grid */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Steps Column (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Step 1: Shipping Address */}
          <div className="bg-white rounded border border-gray-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#131921] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-base font-bold text-gray-900">Choose a shipping address</h2>
              </div>
              {step !== 1 && (
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-sky-700 hover:underline font-semibold"
                >
                  Change
                </button>
              )}
            </div>

            {step === 1 ? (
              <div className="mt-4 space-y-3">
                <div className="space-y-2">
                  {user?.addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`block p-3 rounded border text-xs cursor-pointer transition-all ${
                        activeAddress.id === addr.id
                          ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <input
                          type="radio"
                          name="address"
                          checked={activeAddress.id === addr.id}
                          onChange={() => setActiveAddress(addr)}
                          className="mt-0.5 text-amber-600 focus:ring-amber-500"
                        />
                        <div>
                          <div className="font-bold text-gray-900">{addr.name}</div>
                          <div className="text-gray-600">{addr.street}</div>
                          <div className="text-gray-600">
                            {addr.city}, {addr.state} {addr.zipCode}, {addr.country}
                          </div>
                          <div className="text-gray-500 mt-0.5">Phone: {addr.phone}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Add new address toggle */}
                {!showNewAddress ? (
                  <button
                    onClick={() => setShowNewAddress(true)}
                    className="flex items-center gap-1.5 text-xs text-sky-700 hover:text-amber-800 font-semibold pt-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add a new delivery address
                  </button>
                ) : (
                  <form onSubmit={handleAddNewAddress} className="border border-gray-200 p-4 rounded bg-gray-50 space-y-3 text-xs">
                    <h3 className="font-bold text-gray-800">Add New Address</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">Full name</label>
                        <input
                          type="text"
                          required
                          value={newAddr.name}
                          onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded bg-white text-xs"
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">Phone number</label>
                        <input
                          type="text"
                          required
                          value={newAddr.phone}
                          onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded bg-white text-xs"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Street address</label>
                      <input
                        type="text"
                        required
                        value={newAddr.street}
                        onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded bg-white text-xs"
                        placeholder="Street and house number, P.O. box"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={newAddr.city}
                          onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">State</label>
                        <input
                          type="text"
                          required
                          value={newAddr.state}
                          onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded bg-white text-xs"
                          placeholder="NY"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">ZIP Code</label>
                        <input
                          type="text"
                          required
                          value={newAddr.zipCode}
                          onChange={(e) => setNewAddr({ ...newAddr, zipCode: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded bg-white text-xs"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#ffd814] font-semibold rounded text-xs border border-[#fcd200]"
                      >
                        Save & Use this address
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNewAddress(false)}
                        className="px-3 py-1.5 border border-gray-300 rounded text-xs hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="pt-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold text-xs rounded-full border border-[#fcd200] shadow-xs"
                  >
                    Use this address
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-2 text-xs text-gray-600">
                <span className="font-semibold text-gray-900">{activeAddress.name}</span>, {activeAddress.street}, {activeAddress.city}, {activeAddress.state} {activeAddress.zipCode}
              </div>
            )}
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-white rounded border border-gray-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#131921] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base font-bold text-gray-900">Payment method</h2>
              </div>
              {step !== 2 && (
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-sky-700 hover:underline font-semibold"
                >
                  Change
                </button>
              )}
            </div>

            {step === 2 ? (
              <div className="mt-4 space-y-3">
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'Amazon Prime Visa ending in 4092', label: 'Prime Visa ending in 4092 (Earn 5% Back)', extra: 'Alex Morgan · Exp 09/29' },
                    { id: 'Mastercard ending in 8812', label: 'Mastercard ending in 8812', extra: 'Alex Morgan · Exp 12/28' },
                    { id: 'Amazon Pay Balance ($120.00)', label: 'Use Amazon Gift Card or Store Balance ($120.00 available)', extra: 'Applied automatically' },
                    { id: 'Cash on Delivery (COD)', label: 'Cash on Delivery / Pay on Delivery', extra: 'Pay upon courier arrival' }
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`block p-3 rounded border cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <div className="flex-1 flex justify-between items-center">
                          <span className="font-semibold text-gray-900">{method.label}</span>
                          <span className="text-gray-500 text-[11px]">{method.extra}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => setStep(3)}
                    className="px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold text-xs rounded-full border border-[#fcd200] shadow-xs"
                  >
                    Use this payment method
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-2 text-xs text-gray-600">
                Paying with <span className="font-semibold text-gray-900">{paymentMethod}</span>
              </div>
            )}
          </div>

          {/* Step 3: Review Items & Delivery Options */}
          <div className="bg-white rounded border border-gray-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#131921] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="text-base font-bold text-gray-900">Review items and shipping</h2>
              </div>
              {step !== 3 && (
                <button
                  onClick={() => setStep(3)}
                  className="text-xs text-sky-700 hover:underline font-semibold"
                >
                  Review
                </button>
              )}
            </div>

            {step === 3 && (
              <div className="mt-4 space-y-5">
                {/* Choose Delivery Speed */}
                <div className="bg-gray-50 p-3.5 rounded border border-gray-200 space-y-2">
                  <div className="text-xs font-bold text-gray-800 mb-1 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    Choose your Amazon delivery option:
                  </div>

                  <label className="flex items-center justify-between text-xs p-2 rounded hover:bg-white cursor-pointer border border-transparent hover:border-gray-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="speed"
                        checked={shippingSpeed === 'two-day'}
                        onChange={() => setShippingSpeed('two-day')}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>
                        <strong className="text-emerald-700">FREE Prime Two-Day Delivery</strong> — Get it in 2 business days
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">$0.00</span>
                  </label>

                  <label className="flex items-center justify-between text-xs p-2 rounded hover:bg-white cursor-pointer border border-transparent hover:border-gray-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="speed"
                        checked={shippingSpeed === 'one-day'}
                        onChange={() => setShippingSpeed('one-day')}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>
                        <strong className="text-gray-900">Priority Next-Morning Delivery</strong> — Get it Tomorrow by 10 AM
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">$5.99</span>
                  </label>

                  <label className="flex items-center justify-between text-xs p-2 rounded hover:bg-white cursor-pointer border border-transparent hover:border-gray-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="speed"
                        checked={shippingSpeed === 'standard'}
                        onChange={() => setShippingSpeed('standard')}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span>
                        <strong className="text-gray-700">Standard Shipping</strong> — 4-5 business days
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">$0.00</span>
                  </label>
                </div>

                {/* Items preview list */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Package Items ({cart.length})
                  </h4>
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3 text-xs border-b border-gray-100 pb-3">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-contain bg-gray-50 rounded border p-1 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 line-clamp-1">{item.product.title}</div>
                        <div className="text-gray-500 text-[11px]">
                          Qty: {item.quantity} · ${item.product.price.toFixed(2)} each
                        </div>
                      </div>
                      <div className="font-bold text-gray-900 tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Order Summary Box (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded border border-gray-200 p-5 shadow-xs sticky top-4 space-y-4">
            
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-gray-900 font-bold text-sm rounded-full border border-[#fcd200] shadow-sm transition-all cursor-pointer active:scale-98"
            >
              Place your order
            </button>

            <div className="text-[11px] text-gray-500 text-center leading-relaxed">
              By placing your order, you agree to Amazon's privacy notice and conditions of use.
            </div>

            <hr className="border-gray-200" />

            {/* Price breakdown */}
            <div className="space-y-2 text-xs">
              <h3 className="font-bold text-sm text-gray-900 mb-2">Order Summary</h3>
              
              <div className="flex justify-between text-gray-700">
                <span>Items:</span>
                <span className="tabular-nums font-medium">${cartSubtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Shipping & handling:</span>
                <span className="tabular-nums font-medium">
                  {shippingCost === 0 ? '$0.00' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              {shippingCost === 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Free Prime Shipping discount:</span>
                  <span className="tabular-nums">-$7.99</span>
                </div>
              )}

              <div className="flex justify-between text-gray-700">
                <span>Total before tax:</span>
                <span className="tabular-nums font-medium">${(cartSubtotal + shippingCost).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Estimated tax to be collected:</span>
                <span className="tabular-nums font-medium">${tax.toFixed(2)}</span>
              </div>

              <hr className="border-gray-200 my-2" />

              <div className="flex justify-between text-base font-bold text-[#b12704]">
                <span>Order total:</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Guarantee note */}
            <div className="bg-sky-50/60 p-3 rounded text-[11px] text-sky-900 flex items-start gap-2 border border-sky-100">
              <ShieldCheck className="w-4 h-4 text-[#00A8E1] shrink-0 mt-0.5" />
              <span>
                Amazon A-to-z Guarantee protects your purchase every step of the way.
              </span>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};
