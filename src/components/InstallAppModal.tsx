import React, { useState } from 'react';
import { Smartphone, Download, Share2, CheckCircle2, Globe, ExternalLink, X, Apple, Chrome, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { ClubLogo } from './ClubLogo';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'apk'>('android');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        onClose();
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-zinc-900 border border-amber-500/30 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl shadow-orange-500/20 text-right flex flex-col max-h-[92vh]"
        dir="rtl"
      >
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-b from-amber-500/15 via-zinc-900/40 to-transparent border-b border-zinc-800">
          <button 
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <ClubLogo size="md" showEst={false} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">کردنی ئەم پڕۆژەیە بە ئەپی فەرمی</h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                  PWA / APK
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                دەتوانیت دەستبەجێ ئەم ئەپە لەسەر شاشەی مۆبایلەکەت دابمەزرێنیت بەبێ پێویستی بە کۆگای ئەپ!
              </p>
            </div>
          </div>

          {/* Quick Install Button if browser supports it */}
          {isInstallable && !isInstalled && (
            <button
              onClick={handleInstallClick}
              className="mt-4 w-full py-3 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-5 h-5" />
              <span>دابەزاندنی یەکسەر لەسەر مۆبایل (Install App)</span>
            </button>
          )}

          {isInstalled && (
            <div className="mt-3 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>ئەم ئەپە پێشتر لەسەر مۆبایلەکەت وەک ئەپ دامەزراوە!</span>
            </div>
          )}
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/50 p-2 gap-1">
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'android'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Chrome className="w-4 h-4" />
            <span>ئەندرۆید (Android)</span>
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'ios'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>ئایفۆن (iPhone)</span>
          </button>

          <button
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'apk'
                ? 'bg-amber-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>فایلی APK</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-zinc-300">
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/60 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                  <Smartphone className="w-5 h-5 text-amber-400" />
                  <span>ڕێگای دامەزراندن لەسەر ئەندرۆید:</span>
                </div>
                
                <ol className="space-y-2.5 text-xs text-zinc-300 pr-4 list-decimal marker:text-amber-400 marker:font-bold leading-relaxed">
                  <li>
                    لەسەر مۆبایلەکەت وێبگەڕی <strong className="text-white">Google Chrome</strong> بکەرەوە.
                  </li>
                  <li>
                    لە بەشی سەرەوەی ڕاست یاخود چەپ کلیک لەسەر دوگمەی <strong className="text-amber-300">سێ خاڵەکە (⋮)</strong> بکە.
                  </li>
                  <li>
                    بژاردەی <strong className="text-amber-300">«Install app»</strong> یان <strong className="text-amber-300">«Add to Home screen»</strong> (زیادکردن بۆ شاشەی سەرەکی) هەڵبژێرە.
                  </li>
                  <li>
                    کلیک لەسەر <strong className="text-white">Install</strong> بکە.
                  </li>
                </ol>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  دەستبەجێ ئایکۆنی لۆگۆی لاوانی ئاگرین دێتە سەر شاشەی مۆبایلت و کاتێک دەیکەیتەوە ڕاستەوخۆ وەک ئەپێکی ڕاستەقینە بەبێ هێڵی براوسەر کاردەکات!
                </span>
              </div>
            </div>
          )}

          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/60 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                  <Apple className="w-5 h-5 text-amber-400" />
                  <span>ڕێگای دامەزراندن لەسەر ئایفۆن و ئایپاد:</span>
                </div>
                
                <ol className="space-y-2.5 text-xs text-zinc-300 pr-4 list-decimal marker:text-amber-400 marker:font-bold leading-relaxed">
                  <li>
                    ئەم ماڵپەڕە لە وێبگەڕی <strong className="text-white">Safari</strong> بکەرەوە.
                  </li>
                  <li>
                    لە بەشی خوارەوە کلیک لەسەر دوگمەی <strong className="text-amber-300">Share (نیشانەی هاوبەشکردن ⎋)</strong> بکە.
                  </li>
                  <li>
                    لە لیستەکەدا بڕۆ خوارەوە و کلیک لەسەر <strong className="text-amber-300">Add to Home Screen (زیادکردن بۆ پەڕەی سەرەکی)</strong> بکە.
                  </li>
                  <li>
                    لە سەرەوەی دەستە ڕاست دەست بنێ بە <strong className="text-white">Add</strong>.
                  </li>
                </ol>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  ئەپەکە بە لۆگۆی فەرمی لاوانی ئاگرین دەچێتە ناو ئەپەکانی ئایفۆنەکەتەوە.
                </span>
              </div>
            </div>
          )}

          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/60 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                  <Download className="w-5 h-5 text-amber-400" />
                  <span>دروستکردنی فایلی تەواوی APK (.apk):</span>
                </div>
                
                <p className="text-xs text-zinc-300 leading-relaxed">
                  ئەگەر دەتەوێت فایلێکی تەواوی <span className="text-amber-400 font-bold">.apk</span> هەبێت کە بتوانیت بینێریت لە تیلیگرام یان واتسئەپ یان لەسەر گووگڵ پلەی دایبەزێنیت:
                </p>

                <ol className="space-y-2 text-xs text-zinc-300 pr-4 list-decimal marker:text-amber-400 marker:font-bold leading-relaxed">
                  <li>
                    لینکەکەی خوارەوە لەبەر بگرەوە (کۆپی بکە).
                  </li>
                  <li>
                    سەردانی ماڵپەڕی فەرمی گۆگڵ و مایکرۆسۆفت <a href="https://www.pwabuilder.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline font-bold">PWABuilder.com</a> بکە.
                  </li>
                  <li>
                    لینکی ئەپەکەت لەوێ دابنێ و کلیک لە <strong className="text-white">Start</strong> بکە.
                  </li>
                  <li>
                    کلیک لە <strong className="text-emerald-400 font-bold">Package for Android</strong> بکە و فایلی .apk دابەزێنە!
                  </li>
                </ol>
              </div>

              <div className="flex items-center gap-2 p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                <input 
                  type="text" 
                  readOnly 
                  value={window.location.href}
                  className="bg-transparent text-xs text-zinc-400 w-full outline-none font-mono"
                  dir="ltr"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold whitespace-nowrap transition-colors"
                >
                  {copied ? 'کۆپی کرا!' : 'کۆپیکردنی لینک'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-950/80 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors"
          >
            داخستن
          </button>
        </div>
      </div>
    </div>
  );
};
