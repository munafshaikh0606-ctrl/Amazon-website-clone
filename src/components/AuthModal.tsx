import React, { useState } from 'react';
import { X, Lock, CheckCircle, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AmazonLogo } from './AmazonLogo';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, login, user } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [includePrime, setIncludePrime] = useState(true);

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, name.trim() || undefined, includePrime);
  };

  const handleQuickLogin = (demoEmail: string, demoName: string, isPrime: boolean) => {
    login(demoEmail, demoName, isPrime);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm bg-white rounded-lg shadow-2xl p-6 sm:p-8 border border-gray-200">
        
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Amazon Logo */}
        <div className="flex justify-center mb-6">
          <AmazonLogo light={false} className="h-8" />
        </div>

        {/* Main Box */}
        <div className="border border-gray-300 rounded p-5 shadow-xs bg-white">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            {isRegister ? 'Create account' : 'Sign in'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {isRegister && (
              <div>
                <label className="block font-bold text-gray-800 mb-1">Your name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First and last name"
                  className="w-full p-2 border border-gray-400 rounded focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-xs"
                />
              </div>
            )}

            <div>
              <label className="block font-bold text-gray-800 mb-1">
                Email or mobile phone number
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full p-2 border border-gray-400 rounded focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-xs"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-gray-800">Password</label>
                {!isRegister && (
                  <span className="text-sky-700 hover:underline cursor-pointer text-[11px]">
                    Forgot password?
                  </span>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isRegister ? 'At least 6 characters' : 'Enter password'}
                className="w-full p-2 border border-gray-400 rounded focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-xs"
              />
            </div>

            {/* Prime membership option */}
            <label className="flex items-center gap-2 p-2 bg-sky-50 rounded border border-sky-100 cursor-pointer">
              <input
                type="checkbox"
                checked={includePrime}
                onChange={(e) => setIncludePrime(e.target.checked)}
                className="text-amber-600 focus:ring-amber-500 rounded"
              />
              <span className="text-sky-950 font-medium">
                Include <strong className="text-[#00A8E1]">Prime</strong> 30-Day Free Trial
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-semibold rounded border border-[#fcd200] shadow-xs cursor-pointer transition-colors"
            >
              {isRegister ? 'Continue' : 'Sign in'}
            </button>

            <p className="text-[11px] text-gray-500 leading-normal pt-1">
              By continuing, you agree to Amazon's{' '}
              <span className="text-sky-700 hover:underline cursor-pointer">Conditions of Use</span> and{' '}
              <span className="text-sky-700 hover:underline cursor-pointer">Privacy Notice</span>.
            </p>
          </form>

          {/* Quick Demo Logins for easy testing */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Instant Demo Sign-in:
            </div>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('alex.morgan@amazon.com', 'Alex Morgan', true)}
                className="w-full py-1.5 px-2 bg-gray-50 hover:bg-amber-50 text-gray-800 text-[11px] font-medium rounded border border-gray-200 flex items-center justify-between transition-colors"
              >
                <span>Alex Morgan (Prime)</span>
                <span className="text-[10px] text-[#00A8E1] font-bold">PRIME</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('sarah.connor@gmail.com', 'Sarah Connor', false)}
                className="w-full py-1.5 px-2 bg-gray-50 hover:bg-gray-100 text-gray-800 text-[11px] font-medium rounded border border-gray-200 flex items-center justify-between transition-colors"
              >
                <span>Sarah Connor (Standard)</span>
                <span className="text-[10px] text-gray-500 font-normal">GUEST</span>
              </button>
            </div>
          </div>

        </div>

        {/* Switch between sign-in and register */}
        <div className="mt-4 text-center">
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">
                {isRegister ? 'Already have an account?' : 'New to Amazon?'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsRegister(!isRegister)}
            className="w-full py-2 bg-white hover:bg-gray-50 text-gray-800 font-medium text-xs rounded border border-gray-300 shadow-xs transition-colors"
          >
            {isRegister ? 'Sign in to existing account' : 'Create your Amazon account'}
          </button>
        </div>

      </div>
    </div>
  );
};
