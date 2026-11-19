import React from 'react';
import { 
  Star, 
  RotateCcw, 
  SlidersHorizontal, 
  Filter, 
  Check, 
  Sparkles,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { PrimeBadge } from './AmazonLogo';
import { CATEGORIES_LIST } from '../data/products';
import { ProductCategory } from '../types';

export const SearchResultsView: React.FC = () => {
  const {
    products,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    primeOnly,
    setPrimeOnly,
    minRating,
    setMinRating,
    priceRange,
    setPriceRange,
    selectedBrand,
    setSelectedBrand,
    resetFilters
  } = useApp();

  // Extract all unique brands
  const allBrands = ['All', ...Array.from(new Set(products.map((p) => p.brand)))];

  // Filter products
  const filteredProducts = products.filter((p) => {
    // Category filter
    if (selectedCategory !== 'All' && p.category !== selectedCategory) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand && !matchDesc && !matchCategory) {
        return false;
      }
    }
    // Prime filter
    if (primeOnly && !p.prime) {
      return false;
    }
    // Rating filter
    if (minRating > 0 && p.rating < minRating) {
      return false;
    }
    // Price filter
    if (p.price < priceRange[0] || p.price > priceRange[1]) {
      return false;
    }
    // Brand filter
    if (selectedBrand !== 'All' && p.brand !== selectedBrand) {
      return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
    return 0; // featured default
  });

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    primeOnly ||
    minRating > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 2500 ||
    selectedBrand !== 'All' ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-4">
      
      {/* Top Results Header Bar */}
      <div className="bg-white p-3 sm:px-4 rounded border border-gray-200 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="text-xs text-gray-700">
          <span>Showing </span>
          <strong className="text-gray-900">{sortedProducts.length}</strong>
          <span> results </span>
          {searchQuery && (
            <span>
              for <strong className="text-[#c45500]">"{searchQuery}"</strong>
            </span>
          )}
          {selectedCategory !== 'All' && (
            <span>
              in <strong className="text-gray-900">{selectedCategory}</strong>
            </span>
          )}
        </div>

        {/* Sort Controls & Clear */}
        <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-sky-700 hover:text-amber-800 hover:underline font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear filters
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-2.5 py-1.5 rounded border border-gray-300 outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Avg. Customer Review</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar Filters (lg: 3 cols) */}
        <aside className="lg:col-span-3 space-y-5 text-xs text-gray-800">
          
          {/* Department Filter */}
          <div className="bg-white p-4 rounded border border-gray-200 shadow-xs">
            <h3 className="font-bold text-sm text-gray-900 mb-2">Department</h3>
            <ul className="space-y-1.5">
              {CATEGORIES_LIST.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-1 px-1.5 rounded transition-colors ${
                      selectedCategory === cat
                        ? 'font-bold text-amber-900 bg-amber-50'
                        : 'text-gray-700 hover:text-amber-700 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Prime Membership Delivery Filter */}
          <div className="bg-white p-4 rounded border border-gray-200 shadow-xs">
            <h3 className="font-bold text-sm text-gray-900 mb-2">Amazon Prime</h3>
            <label className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-gray-50">
              <input
                type="checkbox"
                checked={primeOnly}
                onChange={(e) => setPrimeOnly(e.target.checked)}
                className="text-amber-600 focus:ring-amber-500 rounded"
              />
              <div className="flex items-center gap-1.5">
                <PrimeBadge size="md" />
                <span className="text-gray-700">Eligible for Free Delivery</span>
              </div>
            </label>
          </div>

          {/* Customer Reviews Rating Filter */}
          <div className="bg-white p-4 rounded border border-gray-200 shadow-xs">
            <h3 className="font-bold text-sm text-gray-900 mb-2">Customer Reviews</h3>
            <div className="space-y-1.5">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                  className={`w-full flex items-center gap-1.5 p-1 rounded transition-colors ${
                    minRating === rating ? 'bg-amber-50 font-bold' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex text-[#de7921]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rating ? 'fill-[#de7921]' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700">& Up</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="bg-white p-4 rounded border border-gray-200 shadow-xs">
            <h3 className="font-bold text-sm text-gray-900 mb-2">Brand</h3>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {allBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 p-1 rounded hover:bg-gray-50 cursor-pointer text-gray-700"
                >
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === brand}
                    onChange={() => setSelectedBrand(brand)}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span className={selectedBrand === brand ? 'font-bold text-gray-900' : ''}>
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="bg-white p-4 rounded border border-gray-200 shadow-xs">
            <h3 className="font-bold text-sm text-gray-900 mb-2">Price</h3>
            <div className="space-y-1.5">
              {[
                { label: 'All Prices', range: [0, 2500] as [number, number] },
                { label: 'Under $50', range: [0, 50] as [number, number] },
                { label: '$50 to $150', range: [50, 150] as [number, number] },
                { label: '$150 to $400', range: [150, 400] as [number, number] },
                { label: '$400 & Above', range: [400, 2500] as [number, number] }
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setPriceRange(p.range)}
                  className={`w-full text-left py-1 px-1.5 rounded transition-colors ${
                    priceRange[0] === p.range[0] && priceRange[1] === p.range[1]
                      ? 'font-bold text-amber-900 bg-amber-50'
                      : 'text-gray-700 hover:text-amber-700 hover:bg-gray-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* Product Cards Grid (lg: 9 cols) */}
        <main className="lg:col-span-9">
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded border border-gray-200 p-12 text-center space-y-3">
              <Search className="w-12 h-12 text-gray-400 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">No matching products found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try checking your spelling or use more general terms. You can also reset all active filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold text-xs rounded-full border border-[#fcd200]"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>

    </div>
  );
};
