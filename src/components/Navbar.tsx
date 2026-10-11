import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TabType, LanguageCode } from '../types';
import { ClubLogo } from './ClubLogo';
import { InstallAppModal } from './InstallAppModal';
import { 
  Trophy, 
  Newspaper, 
  CalendarDays, 
  Users, 
  Settings, 
  Moon, 
  Sun, 
  PlusCircle,
  Smartphone
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [showInstallModal, setShowInstallModal] = useState(false);
  const { 
    currentTab, 
    setCurrentTab, 
    language, 
    setLanguage, 
    theme, 
    toggleTheme, 
    isLoggedInAdmin, 
    t, 
    setShowAdminModal,
    setEditingItem,
    logoUrl
  } = useApp();

  const tabs: { id: TabType; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'matches', labelKey: 'matches', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'news', labelKey: 'news', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'players', labelKey: 'players', icon: <Users className="w-4 h-4" /> },
    { id: 'awards', labelKey: 'awards', icon: <Trophy className="w-4 h-4" /> },
    { id: 'settings', labelKey: 'settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-zinc-900/95 border-zinc-800 text-white' 
        : 'bg-white/95 border-slate-200 text-slate-800 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Logo & Brand: لاوانی ئاگرین (Lawani Agrin) */}
          <button 
            onClick={() => setCurrentTab('matches')} 
            className="flex items-center gap-2.5 cursor-pointer flex-shrink-0 group text-right focus:outline-none"
            title="لاوانی ئاگرین"
          >
            <div className="group-hover:scale-105 transition-transform duration-200">
              <ClubLogo size="sm" logoUrl={logoUrl} showEst={false} />
            </div>
            <div className="flex flex-col text-right">
              <span className="font-black text-sm sm:text-base bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
                لاوانی ئاگرین
              </span>
              <span className="text-[10px] text-amber-400/90 font-bold tracking-wider leading-tight">
                LAWANI AGRIN • 2018
              </span>
            </div>
          </button>

          {/* Navigation Tabs - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-800/40 p-1 rounded-2xl border border-zinc-700/50">
            {tabs.map(tab => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-md shadow-amber-500/25'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  {tab.icon}
                  <span>{t(tab.labelKey)}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Admin Add Quick Button */}
            {isLoggedInAdmin && (
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowAdminModal(true);
                }}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all"
                title={t('add')}
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{t('add')}</span>
              </button>
            )}

            {/* Install App Button */}
            <button
              onClick={() => setShowInstallModal(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 text-xs font-black shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-amber-400/40 animate-pulse"
              title="کردن بە ئەپی فەرمی مۆبایل"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">ئەپەکە دابەزێنە 📲</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-zinc-800/60 rounded-xl p-1 border border-zinc-700/50">
              {(['ku', 'ar', 'en'] as LanguageCode[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold uppercase transition-colors ${
                    language === lang
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 transition-colors border border-zinc-700/50"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-zinc-800/80 overflow-x-auto scrollbar-none gap-1">
          {tabs.map(tab => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{t(tab.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <InstallAppModal 
        isOpen={showInstallModal} 
        onClose={() => setShowInstallModal(false)} 
      />
    </header>
  );
};
