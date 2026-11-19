import React, { useState } from 'react';
import { Tag, Clock, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export const DealsView: React.FC = () => {
  const { products, setCurrentView } = useApp();
  const [dealFilter, setDealFilter] = useState<'all' | 'devices' | 'kitchen' | 'audio'>('all');

  const dealProducts = products.filter((p) => {
    const hasDeal = Boolean(p.dealTag || (p.listPrice && p.listPrice > p.price));
    if (!hasDeal) return false;
    if (dealFilter === 'devices' && p.brand !== 'Amazon' && p.category !== 'Smart Home') return false;
    if (dealFilter === 'kitchen' && p.category !== 'Home & Kitchen') return false;
    if (dealFilter === 'audio' && p.category !== 'Electronics' && p.category !== 'Smart Home') return false;
    return true;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-6">
      
      {/* Deals Header Banner */}
      <div className="bg-white rounded border border-gray-200 p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#cc0c39] font-bold text-xs uppercase tracking-wider mb-1">
            <Tag className="w-4 h-4" />
            Today's Deals & Lightning Offers
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Deals of the Day</h1>
          <p className="text-xs text-gray-600 mt-1">
            New deals every day. Save big on Amazon Devices, Kitchen Essentials, Headphones, and more.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: 'all', label: 'All Deals' },
            { id: 'devices', label: 'Amazon Devices' },
            { id: 'audio', label: 'Headphones & Audio' },
            { id: 'kitchen', label: 'Kitchen & Barista' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDealFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                dealFilter === tab.id
                  ? 'bg-[#131921] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Deals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dealProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};
