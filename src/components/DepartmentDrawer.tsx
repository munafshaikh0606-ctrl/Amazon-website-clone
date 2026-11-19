import React from 'react';
import { 
  X, 
  ChevronRight, 
  User as UserIcon, 
  Tv, 
  BookOpen, 
  Headphones, 
  Home, 
  Laptop, 
  Shirt, 
  Sparkles, 
  Tag, 
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCategory } from '../types';

export const DepartmentDrawer: React.FC = () => {
  const {
    departmentDrawerOpen,
    setDepartmentDrawerOpen,
    setSelectedCategory,
    setCurrentView,
    user,
    setAuthModalOpen,
    logout,
    togglePrimeMembership
  } = useApp();

  if (!departmentDrawerOpen) return null;

  const handleSelectCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setCurrentView('search');
    setDepartmentDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark overlay backdrop */}
      <div 
        onClick={() => setDepartmentDrawerOpen(false)}
        className="fixed inset-0 bg-black/60 transition-opacity" 
      />

      {/* Slide-out drawer */}
      <div className="relative w-full max-w-xs bg-white text-gray-900 h-full overflow-y-auto shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        
        {/* User Greeting Header */}
        <div className="bg-[#232f3e] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm shadow">
              {user?.avatar || <UserIcon className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-xs text-gray-300">Hello,</div>
              <div className="text-base font-bold truncate max-w-[170px]">
                {user ? user.name : 'Sign in'}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setDepartmentDrawerOpen(false)}
            className="text-gray-300 hover:text-white p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Categories & Sections */}
        <div className="p-4 space-y-5 text-sm flex-1">
          
          {/* Digital Content & Devices */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Digital Content & Devices
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => handleSelectCategory('Smart Home')}
                className="w-full text-left py-2 px-2 hover:bg-gray-100 rounded flex items-center justify-between text-gray-800"
              >
                <span className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-gray-500" />
                  Echo & Alexa Devices
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleSelectCategory('Books')}
                className="w-full text-left py-2 px-2 hover:bg-gray-100 rounded flex items-center justify-between text-gray-800"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  Kindle E-readers & Books
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Shop by Department */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Shop by Department
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => handleSelectCategory('Electronics')}
                className="w-full text-left py-2 px-2 hover:bg-gray-100 rounded flex items-center justify-between text-gray-800"
              >
                <span className="flex items-center gap-2">
                  <Tv className="w-4 h-4 text-gray-500" />
                  Electronics
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleSelectCategory('Computers & Accessories')}
                className="w-full text-left py-2 px-2 hover:bg-gray-100 rounded flex items-center justify-between text-gray-800"
              >
                <span className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-gray-500" />
                  Computers & Laptops
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleSelectCategory('Home & Kitchen')}
                className="w-full text-left py-2 px-2 hover:bg-gray-100 rounded flex items-center justify-between text-gray-800"
              >
                <span className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-gray-500" />
                  Home & Kitchen
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleSelectCategory('Fashion')}
                className="w-full text-left py-2 px-2 hover:bg-gray-100 rounded flex items-center justify-between text-gray-800"
              >
                <span className="flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-gray-500" />
                  Fashion & Clothing
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleSelectCategory('Beauty & Care')}
                className="w-full text-left py-2 px-2 hover:bg-gray-100 rounded flex items-center justify-between text-gray-800"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gray-500" />
                  Beauty & Personal Care
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Programs & Features */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Programs & Features
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCurrentView('deals');
                  setDepartmentDrawerOpen(false);
                }}
                className="w-full text-left py-2 px-2 hover:bg-gray-100 rounded flex items-center justify-between text-gray-800"
              >
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-500" />
                  Today's Deals
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => {
                  togglePrimeMembership();
                  setDepartmentDrawerOpen(false);
                }}
                className="w-full text-left py-2 px-2 hover:bg-gray-100 rounded flex items-center justify-between text-gray-800"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00A8E1]" />
                  Prime Membership
                </span>
                <span className="text-xs text-sky-600 font-semibold">
                  {user?.primeMember ? 'Manage' : 'Join'}
                </span>
              </button>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Help & Settings */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Help & Settings
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCurrentView('orders');
                  setDepartmentDrawerOpen(false);
                }}
                className="w-full text-left py-2 px-2 hover:bg-gray-100 rounded text-gray-800"
              >
                Your Orders & Tracking
              </button>
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setDepartmentDrawerOpen(false);
                  }}
                  className="w-full text-left py-2 px-2 hover:bg-red-50 text-red-600 rounded flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAuthModalOpen(true);
                    setDepartmentDrawerOpen(false);
                  }}
                  className="w-full text-left py-2 px-2 hover:bg-gray-100 text-sky-700 font-semibold rounded"
                >
                  Sign In to Your Account
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
