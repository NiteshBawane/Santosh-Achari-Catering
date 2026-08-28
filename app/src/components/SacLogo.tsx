import React from 'react';

interface SacLogoProps {
  isScrolled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
}

export const SacLogo: React.FC<SacLogoProps> = ({
  isScrolled = false,
  size: _size = 'md',
  variant = 'auto',
  className = '',
}) => {
  const isDarkBg = variant === 'dark' || (variant === 'auto' && !isScrolled);

  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* SAC Emblem Badge */}
      <div className="relative flex-shrink-0">
        {/* Animated outer glowing ring */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-golden via-coral to-golden opacity-60 blur-[3px] group-hover:opacity-100 group-hover:blur-[5px] transition-all duration-500 animate-pulse" />
        
        {/* Emblem Container */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-charcoal via-charcoal-light to-black border-2 border-golden/70 flex items-center justify-center shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
          {/* Shimmer / light sweep effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
          
          {/* Golden Corner Accents */}
          <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-golden" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-golden" />
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-golden" />
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-golden" />

          {/* SAC Monogram */}
          <div className="flex items-center justify-center font-serif font-black tracking-tighter">
            <span className="text-xl sm:text-2xl bg-gradient-to-b from-amber-200 via-golden to-coral bg-clip-text text-transparent drop-shadow-sm font-extrabold tracking-tight">
              SAC
            </span>
          </div>

          {/* Royal Crown / Flame pip on top */}
          <div className="absolute top-1 w-1 h-1 rounded-full bg-golden shadow-sm shadow-golden" />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center text-left">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-display font-extrabold text-xl sm:text-2xl tracking-tight leading-tight transition-all duration-300 ${
              isDarkBg
                ? 'text-white group-hover:text-golden'
                : 'text-charcoal group-hover:text-coral'
            }`}
          >
            SANTOSH <span className="text-coral group-hover:text-golden transition-colors">ACHARI</span>
          </span>
        </div>
        
        <div className="flex items-center gap-2 mt-0.5">
          <span className="h-[1.5px] w-3 sm:w-4 bg-gradient-to-r from-coral to-golden" />
          <span
            className={`text-[10px] sm:text-xs font-bold tracking-[0.28em] uppercase transition-colors duration-300 ${
              isDarkBg ? 'text-amber-300/90' : 'text-coral'
            }`}
          >
            Catering Services
          </span>
          <span className="h-[1.5px] w-3 sm:w-4 bg-gradient-to-r from-golden to-coral" />
        </div>
      </div>
    </div>
  );
};

export default SacLogo;
