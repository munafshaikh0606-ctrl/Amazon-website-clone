import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  RotateCcw, 
  Search, 
  ExternalLink, 
  ChevronRight,
  Clock,
  MapPin,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order, OrderTrackingStep } from '../types';

export const OrdersView: React.FC = () => {
  const {
    orders,
    addToCart,
    setActiveProductDetail,
    setCurrentView,
    activeTrackOrder,
    setActiveTrackOrder
  } = useApp();

  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'not-shipped' | 'delivered'>('all');

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'delivered' && order.status !== 'Delivered') return false;
    if (activeTab === 'not-shipped' && order.status === 'Delivered') return false;
    if (!orderSearchQuery.trim()) return true;

    const query = orderSearchQuery.toLowerCase();
    const matchesId = order.id.toLowerCase().includes(query);
    const matchesItem = order.items.some(
      (item) =>
        item.product.title.toLowerCase().includes(query) ||
        item.product.brand.toLowerCase().includes(query)
    );
    return matchesId || matchesItem;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      
      {/* Title & Tabs */}
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-normal text-gray-900 mb-4">Your Orders</h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-6 text-sm border-b sm:border-b-0 border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-2 font-semibold transition-colors ${
                activeTab === 'all'
                  ? 'border-b-2 border-amber-600 text-amber-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('delivered')}
              className={`pb-2 font-semibold transition-colors ${
                activeTab === 'delivered'
                  ? 'border-b-2 border-amber-600 text-amber-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Delivered
            </button>
            <button
              onClick={() => setActiveTab('not-shipped')}
              className={`pb-2 font-semibold transition-colors ${
                activeTab === 'not-shipped'
                  ? 'border-b-2 border-amber-600 text-amber-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              In Transit / Processing
            </button>
          </div>

          {/* Search inside orders */}
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              value={orderSearchQuery}
              onChange={(e) => setOrderSearchQuery(e.target.value)}
              placeholder="Search all orders..."
              className="w-full bg-white border border-gray-300 rounded px-3 py-1.5 pl-8 text-xs outline-none focus:border-amber-500"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="mt-6 space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded border border-gray-200 p-12 text-center space-y-3">
            <Package className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="text-base font-bold text-gray-800">No orders placed yet</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Looking for something? Explore recommendations on the home page or browse today's deals.
            </p>
            <button
              onClick={() => setCurrentView('home')}
              className="px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold text-xs rounded-full border border-[#fcd200]"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded border border-gray-200 overflow-hidden shadow-xs">
              
              {/* Order Meta Bar */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-500">Order Placed</div>
                    <div className="font-semibold text-gray-800">{order.date}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-500">Total</div>
                    <div className="font-semibold text-gray-800 tabular-nums">${order.total.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-500">Ship To</div>
                    <div className="font-semibold text-sky-700 hover:underline cursor-pointer">
                      {order.shippingAddress.name}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wider text-gray-500">Order # {order.id}</div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <button
                      onClick={() => setActiveTrackOrder(order)}
                      className="text-sky-700 hover:underline font-semibold"
                    >
                      View order details
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => setActiveTrackOrder(order)}
                      className="text-sky-700 hover:underline font-semibold"
                    >
                      Invoice
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Status & Progress Strip */}
              <div className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
                  <div>
                    <div className="text-base font-bold text-gray-900 flex items-center gap-2">
                      {order.status === 'Delivered' ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>Delivered on {order.deliveryDate}</span>
                        </>
                      ) : (
                        <>
                          <Truck className="w-5 h-5 text-amber-600" />
                          <span>Arriving {order.deliveryDate}</span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {order.status === 'Delivered' 
                        ? 'Package was left near the front door or porch.'
                        : 'Your package is on its way with Amazon Logistics.'}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTrackOrder(order)}
                    className="px-4 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold text-xs rounded-full border border-[#fcd200] shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
                  >
                    Track package
                  </button>
                </div>

                {/* Items in this order */}
                <div className="divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      <div className="flex gap-4 items-center">
                        <div
                          onClick={() => setActiveProductDetail(item.product)}
                          className="w-16 h-16 bg-gray-50 rounded border border-gray-100 p-1 flex items-center justify-center shrink-0 cursor-pointer"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div>
                          <h4
                            onClick={() => setActiveProductDetail(item.product)}
                            className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-amber-800 cursor-pointer line-clamp-1"
                          >
                            {item.product.title}
                          </h4>
                          <div className="text-xs text-gray-500 mt-0.5">
                            Qty: {item.quantity} · ${item.product.price.toFixed(2)} each
                          </div>
                          <div className="mt-2 flex gap-3 text-xs">
                            <button
                              onClick={() => addToCart(item.product, 1)}
                              className="px-3 py-1 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold text-xs rounded-full border border-[#fcd200]"
                            >
                              Buy it again
                            </button>
                            <button
                              onClick={() => setActiveProductDetail(item.product)}
                              className="px-3 py-1 bg-white hover:bg-gray-50 text-gray-800 font-medium text-xs rounded-full border border-gray-300"
                            >
                              View your item
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-right text-xs space-y-1 w-full sm:w-auto pt-2 sm:pt-0">
                        <button
                          onClick={() => setActiveProductDetail(item.product)}
                          className="w-full sm:w-44 py-1.5 px-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded text-xs block text-center"
                        >
                          Write a product review
                        </button>
                        <button
                          onClick={() => setActiveProductDetail(item.product)}
                          className="w-full sm:w-44 py-1.5 px-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded text-xs block text-center"
                        >
                          Leave seller feedback
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          ))
        )}
      </div>

      {/* Package Tracking Modal */}
      {activeTrackOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
            <div className="bg-[#131921] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm">Tracking Details — {activeTrackOrder.trackingNumber}</h3>
              </div>
              <button
                onClick={() => setActiveTrackOrder(null)}
                className="text-gray-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="text-xs text-gray-500 uppercase font-semibold">Delivery Estimate</div>
                <div className="text-xl font-bold text-gray-900 mt-0.5">
                  {activeTrackOrder.status === 'Delivered' 
                    ? `Delivered on ${activeTrackOrder.deliveryDate}`
                    : `Expected by ${activeTrackOrder.deliveryDate}`}
                </div>
                <div className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>
                    Shipping to: {activeTrackOrder.shippingAddress.name}, {activeTrackOrder.shippingAddress.city} {activeTrackOrder.shippingAddress.zipCode}
                  </span>
                </div>
              </div>

              {/* Step Progress Tracker */}
              <div className="space-y-4 border-l-2 border-amber-500 pl-4 ml-2">
                {activeTrackOrder.trackingSteps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                        step.completed
                          ? 'bg-amber-500 border-amber-500'
                          : 'bg-white border-gray-300'
                      }`}
                    />
                    <div className="text-xs font-bold text-gray-900">{step.status}</div>
                    <div className="text-[11px] text-gray-500">
                      {step.date} · {step.time} — {step.location}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setActiveTrackOrder(null)}
                  className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
