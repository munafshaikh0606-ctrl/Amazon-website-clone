import React from 'react';
import { Menu, Sparkles, Tag, HelpCircle, Gift } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory } from '../types';

export const SubNav: React.FC = () => {
  const {
    setSelectedCategory,
    setPrimeOnly,
    setCurrentView,
    setDepartmentDrawerOpen,
    currentView,
    user
  } = useApp();

  const handleDealsClick = () => {
    setCurrentView('deals');
  };

  const handlePrimeFilterClick = () => {
    setPrimeOnly(true);
    setCurrentView('search');
  };

  const handleCategoryClick = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setCurrentView('search');
  };

  return (
    <div className="bg-[#232f3e] text-white text-xs select-none">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 flex items-center justify-between overflow-x-auto no-scrollbar">
        {/* Left items */}
        <div className="flex items-center gap-1 py-1.5 shrink-0">
          {/* All Hamburger Menu */}
          <button
            onClick={() => setDepartmentDrawerOpen(true)}
            className="flex items-center gap-1 px-2 py-1 font-bold hover:outline hover:outline-1 hover:outline-white rounded transition-all shrink-0"
          >
            <Menu className="w-4 h-4" />
            <span>All</span>
          </button>

          {/* Today's Deals */}
          <button
            onClick={handleDealsClick}
            className={`flex items-center gap-1 px-2.5 py-1 font-medium hover:outline hover:outline-1 hover:outline-white rounded transition-all shrink-0 ${currentView === 'deals' ? 'bg-[#131921] font-bold' : ''}`}
          >
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>Today's Deals</span>
          </button>

          {/* Prime Deals */}
          <button
            onClick={handlePrimeFilterClick}
            className="flex items-center gap-1 px-2.5 py-1 font-medium hover:outline hover:outline-1 hover:outline-white rounded transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00A8E1]" />
            <span>Prime Video & Deals</span>
          </button>

          {/* Fast Category Links */}
          <button
            onClick={() => handleCategoryClick('Electronics')}
            className="px-2.5 py-1 font-medium hover:outline hover:outline-1 hover:outline-white rounded transition-all shrink-0 hidden sm:block"
          >
            Electronics
          </button>

          <button
            onClick={() => handleCategoryClick('Home & Kitchen')}
            className="px-2.5 py-1 font-medium hover:outline hover:outline-1 hover:outline-white rounded transition-all shrink-0 hidden md:block"
          >
            Home & Kitchen
          </button>

          <button
            onClick={() => handleCategoryClick('Books')}
            className="px-2.5 py-1 font-medium hover:outline hover:outline-1 hover:outline-white rounded transition-all shrink-0 hidden lg:block"
          >
            Books
          </button>

          <button
            onClick={() => handleCategoryClick('Computers & Accessories')}
            className="px-2.5 py-1 font-medium hover:outline hover:outline-1 hover:outline-white rounded transition-all shrink-0 hidden lg:block"
          >
            Computers
          </button>

          <button
            onClick={() => handleCategoryClick('Fashion')}
            className="px-2.5 py-1 font-medium hover:outline hover:outline-1 hover:outline-white rounded transition-all shrink-0 hidden xl:block"
          >
            Fashion
          </button>

          <button
            onClick={() => handleCategoryClick('Beauty & Care')}
            className="px-2.5 py-1 font-medium hover:outline hover:outline-1 hover:outline-white rounded transition-all shrink-0 hidden xl:block"
          >
            Beauty & Care
          </button>
        </div>

        {/* Right Promo / Perk notice */}
        <div className="hidden md:flex items-center gap-2 py-1.5 text-gray-300 font-medium shrink-0">
          <span className="text-[11px] text-amber-300">
            {user?.primeMember ? 'Prime Free Two-Day Delivery on 100M+ Items' : 'Join Prime for Free Two-Day Shipping'}
          </span>
        </div>
      </div>
    </div>
  );
};
