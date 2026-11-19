import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LocationModal: React.FC = () => {
  const {
    locationModalOpen,
    setLocationModalOpen,
    user,
    activeAddress,
    setActiveAddress,
    showToast
  } = useApp();

  const [zipInput, setZipInput] = useState('');

  if (!locationModalOpen) return null;

  const handleApplyZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim()) return;

    // Simulate zip lookup
    const customAddress = {
      id: 'addr-zip-' + Date.now(),
      name: user?.name || 'Guest User',
      street: '123 Main Street',
      city: zipInput === '98101' ? 'Seattle' : zipInput === '90210' ? 'Beverly Hills' : 'New York',
      state: zipInput === '98101' ? 'WA' : zipInput === '90210' ? 'CA' : 'NY',
      zipCode: zipInput.trim(),
      country: 'United States',
      phone: '(555) 123-4567',
      isDefault: false
    };

    setActiveAddress(customAddress);
    setLocationModalOpen(false);
    showToast(`Delivery location updated to ${customAddress.city} ${customAddress.zipCode}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-sm text-gray-900">Choose your location</h3>
          <button
            onClick={() => setLocationModalOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <p className="text-gray-600 leading-normal">
            Delivery options and delivery speeds may vary for different locations.
          </p>

          {/* User's existing addresses */}
          {user && user.addresses.length > 0 && (
            <div className="space-y-2">
              <span className="font-bold text-gray-700 block">Deliver to an address</span>
              {user.addresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => {
                    setActiveAddress(addr);
                    setLocationModalOpen(false);
                    showToast(`Delivery location set to ${addr.city}`);
                  }}
                  className={`w-full text-left p-2.5 rounded border transition-all flex items-start gap-2 ${
                    activeAddress.id === addr.id
                      ? 'border-amber-500 bg-amber-50 text-gray-900 font-medium'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <div className="truncate">
                    <div className="font-bold truncate">{addr.name} - {addr.city} {addr.zipCode}</div>
                    <div className="text-[11px] text-gray-500 truncate">{addr.street}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-2 text-[11px] text-gray-400 absolute">or enter a US zip code</span>
          </div>

          {/* ZIP Code input */}
          <form onSubmit={handleApplyZip} className="flex gap-2">
            <input
              type="text"
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value)}
              placeholder="e.g. 10001, 98101, 90210"
              className="flex-1 p-2 border border-gray-300 rounded outline-none focus:border-amber-500 text-xs"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded border border-gray-300 shadow-xs"
            >
              Apply
            </button>
          </form>

          {/* Popular locations quick pick */}
          <div>
            <span className="text-[11px] text-gray-400 block mb-1.5 font-semibold uppercase">Popular Cities</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: 'New York (10001)', zip: '10001' },
                { name: 'Seattle (98101)', zip: '98101' },
                { name: 'Los Angeles (90210)', zip: '90210' }
              ].map((loc) => (
                <button
                  key={loc.zip}
                  type="button"
                  onClick={() => {
                    setZipInput(loc.zip);
                  }}
                  className="px-2 py-1 bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-amber-900 border border-gray-200 rounded text-[11px]"
                >
                  {loc.name}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
