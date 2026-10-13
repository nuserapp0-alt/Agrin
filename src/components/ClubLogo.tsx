import React from 'react';

interface ClubLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  logoUrl?: string;
  showEst?: boolean;
}

export const ClubLogo: React.FC<ClubLogoProps> = ({ className = '', size = 'md', logoUrl, showEst }) => {
  const isLarge = size === 'lg' || size === 'xl';
  const isSmall = size === 'xs' || size === 'sm' || size === 'md';
  
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9 sm:w-10 sm:h-10',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-28 h-28 sm:w-32 sm:h-32',
    xl: 'w-36 h-36 sm:w-44 sm:h-44'
  }[size] || 'w-10 h-10';

  const shouldShowEst = showEst !== undefined ? showEst : false;
  const sourceImage = logoUrl || '/club-logo.png?v=7';

  return (
    <div className={`flex flex-col items-center flex-shrink-0 ${className}`}>
      {/* Official emblem badge container */}
      <div className={`${sizeClasses} ${isLarge ? 'rounded-2xl' : 'rounded-full'} overflow-hidden shadow-2xl shadow-orange-500/40 border-2 border-amber-400 bg-[#282d38] flex items-center justify-center relative group transition-transform duration-200`}>
        <img 
          src={sourceImage} 
          alt="یانەی وەرزشی لاوانی ئاگرین - Lawani Agrin FC" 
          className={`w-full h-full ${isSmall ? 'object-cover' : 'object-contain p-1'} ${isLarge ? 'rounded-2xl' : 'rounded-full'}`}
          loading="eager"
        />
      </div>

      {/* Establishment Year clearly beneath logo if requested */}
      {shouldShowEst && (
        <span className="text-xs sm:text-sm font-black text-amber-400 mt-2 tracking-wide drop-shadow-md whitespace-nowrap">
          2018 دامەزراوە
        </span>
      )}
    </div>
  );
};
