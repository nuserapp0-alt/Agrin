import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LanguageCode, ThemeMode } from '../types';
import { Globe, Moon, Sun, ShieldCheck, LogIn, LogOut, CheckCircle2, AlertCircle, UserPlus, User, Mail, Lock } from 'lucide-react';
import { ClubLogo } from './ClubLogo';

export const SettingsTab: React.FC = () => {
  const { language, setLanguage, theme, setTheme, isAdmin, logoutAdmin, currentUser, registerUser, loginUser, logoutUser, t } = useApp();
  
  // User auth state
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [userAuthError, setUserAuthError] = useState('');
  const [userAuthSuccess, setUserAuthSuccess] = useState('');

  const handleUserAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setUserAuthError('');
    setUserAuthSuccess('');

    if (isRegisterMode) {
      const success = registerUser(regName, regEmail, regPassword);
      if (success) {
        setUserAuthSuccess('هەژمارەکەت بە سەرکەوتوویی دروستکرا و چوویتە ژوورەوە!');
        setRegName('');
        setRegEmail('');
        setRegPassword('');
      } else {
        setUserAuthError('تکایە هەموو خانەکان پڕبکەرەوە یان ئەم جیمێڵە پێشتر تۆمارکراوە.');
      }
    } else {
      const success = loginUser(regEmail, regPassword);
      if (success) {
        if (isAdmin || regEmail === 'himat.friad@gmail.com') {
          setUserAuthSuccess('بە سەرکەوتوویی بە هەژماری بەڕێوەبەر چوویتە ژوورەوە!');
        } else {
          setUserAuthSuccess('بە سەرکەوتوویی چوویتە ژوورەوە!');
        }
        setRegEmail('');
        setRegPassword('');
      } else {
        setUserAuthError('جیمێڵ یان پاسۆڕد هەڵەیە.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {t('settings')}
        </h1>
        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          ڕێکخستنەکانی ئەپڵیکەیشن، زمان، دۆخی ڕوکار، و بەڕێوەبردنی هەژمارەکان
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Language & Theme Section */}
        <div className={`p-6 rounded-3xl border ${theme === 'dark' ? 'bg-slate-900/90 border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-md'}`}>
          <h2 className="text-lg font-extrabold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-500" />
            <span>زمان و دۆخی ڕوکار (Language & Theme)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Language Switcher */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                {t('language')}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className={`w-full px-4 py-3 rounded-2xl text-sm font-semibold border outline-none cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-white hover:border-slate-600'
                    : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-slate-300'
                }`}
              >
                <option value="ku">کوردی (Kurdish Sorani)</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                {t('theme')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold border transition-all ${
                    theme === 'light'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30'
                      : theme === 'dark'
                      ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>{t('lightMode')}</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold border transition-all ${
                    theme === 'dark'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>{t('darkMode')}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* User & Admin Account Section (چوونەژوورەوەی بەکارهێنەر یان ئەدمین) */}
        <div className={`p-6 rounded-3xl border ${theme === 'dark' ? 'bg-slate-900/90 border-slate-800 shadow-xl' : 'bg-white border-slate-200 shadow-md'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-500" />
              <span>هەژماری بەکارهێنەر و چوونەژوورەوە (Account & Login)</span>
            </h2>
            {currentUser && (
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                isAdmin 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}>
                {isAdmin ? 'بەڕێوەبەر (Admin)' : 'تۆمارکراو'}
              </span>
            )}
          </div>

          <p className={`text-xs mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            دەتوانیت بچیتە ژوورەوە یان هەژماری نوێ دروست بکەیت بۆ بەڕێوەبردنی ئەپڵیکەیشنەکە.
          </p>

          {currentUser || isAdmin ? (
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm text-emerald-400">
                  بەخێر هاتیت، {currentUser?.name || 'بەڕێوەبەر'}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isAdmin ? 'تۆ دەسەڵاتی تەواوت هەیە بۆ بڵاوکردنەوە، دەستکاری و سڕینەوەی ناوەڕۆکەکان.' : 'تۆ بە سەرکەوتوویی چوویتە ژوورەوە.'}
                </p>
              </div>
              <button
                onClick={() => {
                  logoutUser();
                  logoutAdmin();
                }}
                className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-all border border-red-500/30 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>چوونەدەرەوە</span>
              </button>
            </div>
          ) : (
            <div>
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                    !isRegisterMode
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  چوونەژوورەوە (Login)
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isRegisterMode
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  دروستکردنی هەژمار (Sign Up)
                </button>
              </div>

              {userAuthError && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{userAuthError}</span>
                </div>
              )}

              {userAuthSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{userAuthSuccess}</span>
                </div>
              )}

              <form onSubmit={handleUserAuth} className="space-y-4">
                {isRegisterMode && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">ناوی تەواو (Full Name)</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="ناوی خۆت بنووسە"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none font-medium ${
                          theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">ئیمەیڵ (Email)</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      placeholder="example@domain.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none font-medium ${
                        theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">پاسۆڕد (Password)</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none font-medium ${
                        theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
                >
                  {isRegisterMode ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                  <span>{isRegisterMode ? 'دروستکردنی هەژمار' : 'چوونەژوورەوە'}</span>
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};


