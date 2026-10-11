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
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-14 h-14 sm:w-16 sm:h-16',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-32 h-32 sm:w-36 sm:h-36'
  }[size] || 'w-8 h-8';

  const shouldShowEst = showEst !== undefined ? showEst : (size === 'lg' || size === 'xl');

  if (logoUrl) {
    return (
      <div className={`flex flex-col items-center flex-shrink-0 ${className}`}>
        <div className={`${sizeClasses} rounded-full overflow-hidden shadow-lg shadow-amber-500/20 border-2 border-amber-400/80 bg-[#141821] flex items-center justify-center p-0.5`}>
          <img src={logoUrl} alt="Lawani Agrin Logo" className="w-full h-full object-cover rounded-full" />
        </div>
        {shouldShowEst && (
          <span className="text-[11px] sm:text-xs font-black text-amber-400 mt-1.5 tracking-wide drop-shadow-md">
            2018 دامەزراوە
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center flex-shrink-0 ${className}`}>
      {/* Official circular emblem with gold border and fiery glow */}
      <div className={`${sizeClasses} rounded-full p-[3px] bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 shadow-2xl shadow-orange-500/40 relative flex items-center justify-center group`}>
        {/* Outer glowing ring */}
        <div className="w-full h-full rounded-full bg-[#11141c] flex items-center justify-center relative overflow-hidden border border-amber-400/40">
          
          {/* Subtle background radial shield glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-orange-600/10 to-transparent pointer-events-none" />

          {/* Detailed Emblem vector */}
          <svg className="w-full h-full p-2" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Circular decorative gold frame */}
            <circle cx="100" cy="100" r="94" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" opacity="0.6" />
            <circle cx="100" cy="100" r="88" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4" />
            
            {/* Top Text Ring: LAWANI AGRIN */}
            <path id="curveTop" d="M 28 100 A 72 72 0 0 1 172 100" fill="transparent" />
            <text className="text-[11px] font-black uppercase fill-amber-300 tracking-[0.25em]" textAnchor="middle">
              <textPath href="#curveTop" startOffset="50%">
                LAWANI AGRIN • FC
              </textPath>
            </text>

            {/* Flaming Torch / Fire Wing behind player */}
            <g className="filter drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]">
              {/* Flame Outer */}
              <path 
                d="M100 28 C115 50 135 65 130 95 C125 118 105 130 100 135 C95 130 75 118 70 95 C65 65 85 50 100 28 Z" 
                fill="url(#flameOuter)" 
                opacity="0.9"
              />
              {/* Flame Core */}
              <path 
                d="M100 45 C110 62 122 75 118 95 C114 112 104 120 100 124 C96 120 86 112 82 95 C78 75 90 62 100 45 Z" 
                fill="url(#flameCore)" 
              />
            </g>

            {/* Football at the top right of the kick */}
            <g transform="translate(130, 68)">
              <circle cx="12" cy="12" r="12" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
              {/* Football classic pentagons */}
              <path d="M12 4 L17 9 L15 15 L9 15 L7 9 Z" fill="#1e232d" />
              <path d="M12 4 L12 0 M17 9 L22 8 M15 15 L18 20 M9 15 L6 20 M7 9 L2 8" stroke="#1e232d" strokeWidth="1.5" />
              {/* Fire sparks behind ball */}
              <path d="M-6 8 C-1 9 4 10 7 11 C3 14 -2 15 -6 16 C-2 13 -3 10 -6 8 Z" fill="#f97316" />
            </g>

            {/* Dynamic Striker / Football Player Silhouette */}
            <g fill="#ffffff" className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {/* Head */}
              <circle cx="82" cy="74" r="7" fill="#fbbf24" />
              {/* Torso leaning */}
              <path d="M78 83 C84 81 92 84 94 92 L91 106 C84 107 77 104 74 96 Z" fill="#fef08a" />
              {/* Left arm balancing */}
              <path d="M75 87 L62 82 C60 81 58 83 59 86 L66 94 Z" fill="#fbbf24" />
              {/* Right arm bent */}
              <path d="M93 86 L104 88 C106 88 107 91 105 93 L97 99 Z" fill="#fbbf24" />
              {/* Supporting leg standing/bent */}
              <path d="M78 105 L72 120 L76 135 L82 135 L80 122 L86 107 Z" fill="#fef08a" />
              {/* Kicking leg extended towards ball */}
              <path d="M89 105 L108 100 L126 84 L130 89 L114 109 L94 112 Z" fill="#fbbf24" />
            </g>

            {/* Arabic / Kurdish Club Name on Ribbon/Base: لاوانی ئاگرین */}
            <rect x="36" y="142" width="128" height="26" rx="8" fill="#1e232d" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="100" y="159" className="text-[13px] font-black fill-amber-300" textAnchor="middle" dominantBaseline="middle">
              لاوانی ئاگرین
            </text>

            {/* Gradients */}
            <defs>
              <linearGradient id="flameOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="flameCore" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="60%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
          </svg>

        </div>
      </div>

      {/* Establishment Year clearly beneath logo */}
      {shouldShowEst && (
        <span className="text-[11px] sm:text-xs font-black text-amber-400 mt-1.5 tracking-wide drop-shadow-md">
          2018 دامەزراوە
        </span>
      )}
    </div>
  );
};

