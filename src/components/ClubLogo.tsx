import React from 'react';

interface ClubLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  logoUrl?: string;
  showEst?: boolean;
}

export const ClubLogo: React.FC<ClubLogoProps> = ({ className = '', size = 'md', logoUrl, showEst }) => {
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9 sm:w-10 sm:h-10',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-32 h-32 sm:w-36 sm:h-36'
  }[size] || 'w-10 h-10';

  const shouldShowEst = showEst !== undefined ? showEst : (size === 'lg' || size === 'xl');
  const sourceImage = logoUrl || '/club-logo.png?v=5';

  return (
    <div className={`flex flex-col items-center flex-shrink-0 ${className}`}>
      {/* Official circular emblem with gold border and fiery glow */}
      <div className={`${sizeClasses} rounded-full overflow-hidden shadow-xl shadow-orange-500/30 border-2 border-amber-400 bg-white flex items-center justify-center relative group transition-transform duration-200`}>
        <img 
          src={sourceImage} 
          alt="یانەی وەرزشی لاوانی ئاگرین - Lawani Agrin FC" 
          className="w-full h-full object-cover rounded-full"
          loading="eager"
        />
      </div>

      {/* Establishment Year clearly beneath logo */}
      {shouldShowEst && (
        <span className="text-[11px] sm:text-xs font-black text-amber-400 mt-1.5 tracking-wide drop-shadow-md whitespace-nowrap">
          2018 دامەزراوە
        </span>
      )}
    </div>
  );
};
