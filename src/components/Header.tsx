import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  ShoppingCart, 
  ChevronDown, 
  User as UserIcon, 
  Package, 
  LogOut, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AmazonLogo, PrimeBadge } from './AmazonLogo';
import { CATEGORIES_LIST, POPULAR_SEARCH_TERMS } from '../data/products';
import { ProductCategory } from '../types';

export const Header: React.FC = () => {
  const {
    user,
    cartCount,
    activeAddress,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    currentView,
    setCurrentView,
    setAuthModalOpen,
    setLocationModalOpen,
    setCartDrawerOpen,
    logout,
    togglePrimeMembership,
    products
  } = useApp();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [searchFocused, setSearchFocused] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Sync local search when global changes
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Click outside listener for account dropdown and search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchQuery(localSearch.trim());
    setSearchFocused(false);
    setCurrentView('search');
  };

  const handleSuggestionClick = (term: string) => {
    setLocalSearch(term);
    setSearchQuery(term);
    setSearchFocused(false);
    setCurrentView('search');
  };

  // Filter autocomplete suggestions
  const suggestions = localSearch.trim()
    ? products
        .filter(p => p.title.toLowerCase().includes(localSearch.toLowerCase()) || p.brand.toLowerCase().includes(localSearch.toLowerCase()))
        .slice(0, 5)
        .map(p => p.title)
    : POPULAR_SEARCH_TERMS;

  return (
    <header className="sticky top-0 z-50 bg-[#131921] text-white select-none">
      {/* Main Top Bar */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4 text-xs">
        
        {/* Zone 1: Logo & Delivery Location */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          {/* Logo */}
          <div 
            onClick={() => {
              setCurrentView('home');
              setSearchQuery('');
            }}
            className="p-1.5 hover:outline hover:outline-1 hover:outline-white rounded cursor-pointer transition-all flex items-center"
          >
            <AmazonLogo className="h-7 sm:h-8" />
          </div>

          {/* Deliver To */}
          <button
            onClick={() => setLocationModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 p-1.5 hover:outline hover:outline-1 hover:outline-white rounded text-left transition-all"
            title="Choose delivery location"
          >
            <MapPin className="w-4 h-4 text-gray-300 mt-1 shrink-0" />
            <div className="leading-tight">
              <span className="text-[11px] text-gray-300 block truncate max-w-[120px]">
                Deliver to {user ? user.name.split(' ')[0] : 'Guest'}
              </span>
              <span className="text-xs font-bold text-white block truncate max-w-[130px]">
                {activeAddress.city} {activeAddress.zipCode}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Amazon Search Bar */}
        <div ref={searchContainerRef} className="flex-1 relative max-w-3xl">
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full rounded focus-within:ring-2 focus-within:ring-[#f3a847]">
            {/* Category Selector */}
            <div className="relative hidden sm:block shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProductCategory)}
                className="h-10 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-2.5 py-1 rounded-l border-r border-gray-300 cursor-pointer outline-none transition-colors max-w-[130px] truncate"
              >
                {CATEGORIES_LIST.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Input field */}
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search Amazon superstore..."
              className="flex-1 h-10 px-3 bg-white text-gray-900 text-sm outline-none placeholder:text-gray-400 rounded-l sm:rounded-none"
            />

            {/* Search Submit Button */}
            <button
              type="submit"
              className="h-10 px-4 bg-[#febd69] hover:bg-[#f3a847] text-gray-900 rounded-r flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-800" />
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          {searchFocused && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white text-gray-900 rounded shadow-xl border border-gray-200 py-1.5 z-50">
              <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {localSearch ? 'Suggested Products' : 'Trending Searches'}
              </div>
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full px-3 py-2 text-left text-xs text-gray-800 hover:bg-gray-100 flex items-center justify-between group transition-colors"
                >
                  <span className="flex items-center gap-2 truncate">
                    <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-600" />
                    <span className="truncate">{item}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zone 3: Account, Orders, Cart */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Account Dropdown */}
          <div ref={accountMenuRef} className="relative">
            <button
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="p-1.5 hover:outline hover:outline-1 hover:outline-white rounded text-left transition-all flex items-center gap-1"
            >
              <div className="leading-tight">
                <span className="text-[11px] text-gray-300 block truncate max-w-[110px]">
                  Hello, {user ? user.name.split(' ')[0] : 'Sign in'}
                </span>
                <span className="text-xs font-bold text-white flex items-center gap-0.5">
                  Account & Lists
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {accountMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white text-gray-800 rounded shadow-2xl border border-gray-200 p-3 z-50">
                {user ? (
                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                        {user.avatar || 'U'}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-semibold text-xs text-gray-900 truncate">{user.name}</div>
                        <div className="text-[11px] text-gray-500 truncate">{user.email}</div>
                      </div>
                    </div>
                    {user.primeMember && (
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#00A8E1] bg-sky-50 px-2 py-1 rounded">
                        <Sparkles className="w-3 h-3 text-[#FF9900]" />
                        Prime Member · Free Two-Day Delivery
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mb-3 pb-3 border-b border-gray-200 text-center">
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        setAuthModalOpen(true);
                      }}
                      className="w-full py-1.5 px-4 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold text-xs rounded border border-[#FCD200] shadow-sm transition-colors"
                    >
                      Sign In
                    </button>
                    <div className="mt-2 text-[11px] text-gray-600">
                      New customer?{' '}
                      <button 
                        onClick={() => {
                          setAccountMenuOpen(false);
                          setAuthModalOpen(true);
                        }}
                        className="text-sky-700 hover:underline font-medium"
                      >
                        Start here.
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-[11px] text-gray-400 uppercase tracking-wider px-2 py-1">
                    Your Account
                  </div>
                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      setCurrentView('orders');
                    }}
                    className="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded flex items-center justify-between text-gray-700"
                  >
                    <span className="flex items-center gap-2">
                      <Package className="w-3.5 h-3.5 text-gray-500" />
                      Your Orders
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      togglePrimeMembership();
                    }}
                    className="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded flex items-center justify-between text-gray-700"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#00A8E1]" />
                      Prime Membership
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {user?.primeMember ? 'Active' : 'Get Prime'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      setLocationModalOpen(true);
                    }}
                    className="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded flex items-center gap-2 text-gray-700"
                  >
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    Delivery Addresses
                  </button>
                  {user ? (
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-2 py-1.5 hover:bg-red-50 text-red-600 rounded flex items-center gap-2 pt-2 border-t border-gray-100 mt-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        setAuthModalOpen(true);
                      }}
                      className="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded flex items-center gap-2 text-gray-700 pt-2 border-t border-gray-100 mt-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-gray-500" />
                      Sign In / Switch Account
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <button
            onClick={() => setCurrentView('orders')}
            className={`p-1.5 hover:outline hover:outline-1 hover:outline-white rounded text-left transition-all hidden sm:block ${currentView === 'orders' ? 'outline outline-1 outline-white' : ''}`}
          >
            <div className="leading-tight">
              <span className="text-[11px] text-gray-300 block">Returns</span>
              <span className="text-xs font-bold text-white block">& Orders</span>
            </div>
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => {
              if (window.innerWidth < 768) {
                setCartDrawerOpen(true);
              } else {
                setCurrentView('cart');
              }
            }}
            className={`flex items-end p-1.5 hover:outline hover:outline-1 hover:outline-white rounded transition-all relative ${currentView === 'cart' ? 'outline outline-1 outline-white' : ''}`}
            title="View Shopping Cart"
          >
            <div className="relative flex items-center">
              <ShoppingCart className="w-8 h-8 text-white" />
              <span className="absolute -top-1 left-3.5 bg-[#f08804] text-gray-900 font-extrabold text-[12px] h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span className="text-xs font-bold text-white hidden md:inline ml-1 pb-1">
              Cart
            </span>
          </button>

        </div>
      </div>
    </header>
  );
};
