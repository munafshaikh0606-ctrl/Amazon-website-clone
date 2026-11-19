import React from 'react';
import { Globe, ArrowUp } from 'lucide-react';
import { AmazonLogo } from './AmazonLogo';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSearchQuery, setSelectedCategory } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full text-white select-none">
      
      {/* Back to Top bar */}
      <button
        onClick={scrollToTop}
        className="w-full py-3.5 bg-[#37475a] hover:bg-[#485769] text-center text-xs font-semibold text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
      >
        <span>Back to top</span>
        <ArrowUp className="w-3.5 h-3.5" />
      </button>

      {/* Directory Columns */}
      <div className="bg-[#232f3e] py-10 px-6 sm:px-12 border-b border-gray-700">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          
          {/* Column 1 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-sm text-white mb-3">Get to Know Us</h4>
            <div className="space-y-1.5 text-gray-300">
              <a href="#" className="block hover:underline">Careers</a>
              <a href="#" className="block hover:underline">Amazon Newsletter</a>
              <a href="#" className="block hover:underline">About Amazon</a>
              <a href="#" className="block hover:underline">Accessibility</a>
              <a href="#" className="block hover:underline">Sustainability</a>
              <a href="#" className="block hover:underline">Amazon Science</a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-sm text-white mb-3">Make Money with Us</h4>
            <div className="space-y-1.5 text-gray-300">
              <a href="#" className="block hover:underline">Sell on Amazon</a>
              <a href="#" className="block hover:underline">Sell apps on Amazon</a>
              <a href="#" className="block hover:underline">Supply to Amazon</a>
              <a href="#" className="block hover:underline">Become an Affiliate</a>
              <a href="#" className="block hover:underline">Advertise Your Products</a>
              <a href="#" className="block hover:underline">Host an Amazon Hub</a>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-sm text-white mb-3">Amazon Payment Products</h4>
            <div className="space-y-1.5 text-gray-300">
              <a href="#" className="block hover:underline">Amazon Visa</a>
              <a href="#" className="block hover:underline">Amazon Store Card</a>
              <a href="#" className="block hover:underline">Shop with Points</a>
              <a href="#" className="block hover:underline">Reload Your Balance</a>
              <a href="#" className="block hover:underline">Amazon Currency Converter</a>
            </div>
          </div>

          {/* Column 4 */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-sm text-white mb-3">Let Us Help You</h4>
            <div className="space-y-1.5 text-gray-300">
              <button 
                onClick={() => setCurrentView('orders')}
                className="block hover:underline text-left text-gray-300"
              >
                Your Orders
              </button>
              <a href="#" className="block hover:underline">Shipping Rates & Policies</a>
              <a href="#" className="block hover:underline">Returns & Replacements</a>
              <a href="#" className="block hover:underline">Manage Your Content and Devices</a>
              <a href="#" className="block hover:underline">Recalls and Product Safety Alerts</a>
              <a href="#" className="block hover:underline">Help & Customer Service</a>
            </div>
          </div>

        </div>

        {/* Mid-Footer Line & Language */}
        <div className="max-w-[1200px] mx-auto mt-10 pt-8 border-t border-gray-700 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300">
          <div 
            onClick={() => {
              setCurrentView('home');
              setSearchQuery('');
            }}
            className="cursor-pointer"
          >
            <AmazonLogo className="h-6" />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-600 rounded hover:border-gray-400">
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span>English</span>
            </button>
            <button className="px-3 py-1.5 border border-gray-600 rounded hover:border-gray-400">
              $ USD - U.S. Dollar
            </button>
            <button className="px-3 py-1.5 border border-gray-600 rounded hover:border-gray-400">
              United States
            </button>
          </div>
        </div>
      </div>

      {/* Deep Footer: Copyright & Legal */}
      <div className="bg-[#131921] py-8 px-4 text-center text-[11px] text-gray-400 space-y-2">
        <div className="flex flex-wrap justify-center gap-4 text-gray-300">
          <a href="#" className="hover:underline">Conditions of Use</a>
          <a href="#" className="hover:underline">Privacy Notice</a>
          <a href="#" className="hover:underline">Consumer Health Data Privacy Disclosure</a>
          <a href="#" className="hover:underline">Your Ads Privacy Choices</a>
        </div>
        <div>
          © 1996-2026, Amazon.com, Inc. or its affiliates
        </div>
      </div>

    </footer>
  );
};
