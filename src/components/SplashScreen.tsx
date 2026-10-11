import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ClubLogo } from './ClubLogo';

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const { logoUrl } = useApp();
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    // Smooth auto intro for 1.8 seconds then fade into app
    const timer = setTimeout(() => {
      setAnimateOut(true);
      const fadeTimer = setTimeout(() => {
        onFinish();
      }, 500);
      return () => clearTimeout(fadeTimer);
    }, 1800);

    return () => {
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1f2c] via-[#242933] to-[#0f1319] text-white transition-all duration-700 ${animateOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
      
      {/* Background glowing effects */}
      <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-4 text-center max-w-md">
        
        {/* Static Circular Emblem with 2018 establishment year */}
        <div className="relative mb-5">
          <ClubLogo size="xl" logoUrl={logoUrl} showEst={true} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent mb-1 tracking-tight">
          لاوانی ئاگرین
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-bold tracking-widest uppercase">
          Lawani Agrin • Official Football Club
        </p>

      </div>
    </div>
  );
};

