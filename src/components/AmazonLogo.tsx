import React from 'react';

interface AmazonLogoProps {
  className?: string;
  light?: boolean;
}

export const AmazonLogo: React.FC<AmazonLogoProps> = ({ className = 'h-7', light = true }) => {
  return (
    <div className={`flex items-center select-none cursor-pointer ${className}`} title="Amazon Home">
      <svg
        viewBox="0 0 400 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* amazon text */}
        <text
          x="10"
          y="72"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="800"
          fontSize="72"
          letterSpacing="-1.5"
          fill={light ? '#FFFFFF' : '#111827'}
        >
          amazon
        </text>
        {/* .com sub-text */}
        <text
          x="285"
          y="45"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontWeight="600"
          fontSize="24"
          fill={light ? '#D1D5DB' : '#4B5563'}
        >
          .com
        </text>
        {/* iconic orange smile arrow from 'a' to 'z' */}
        <path
          d="M 45 88 C 115 116 215 116 265 82"
          stroke="#FF9900"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* smile arrowhead */}
        <path
          d="M 252 72 C 265 79 270 82 270 82 C 270 82 264 94 259 104 C 264 97 274 88 281 83 C 272 81 261 77 252 72 Z"
          fill="#FF9900"
        />
      </svg>
    </div>
  );
};

export const PrimeBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
  const isSm = size === 'sm';
  return (
    <span className={`inline-flex items-center font-black italic tracking-tighter ${isSm ? 'text-[11px]' : 'text-xs'}`}>
      <span className="text-[#00A8E1]">prime</span>
      <svg className="w-2.5 h-2.5 ml-0.5 text-[#FF9900]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
    </span>
  );
};
