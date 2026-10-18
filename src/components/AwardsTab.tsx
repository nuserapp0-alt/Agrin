import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AwardItem } from '../types';
import { Trophy, Plus, Edit3, Trash2, Award, Star, Crown, Search, Calendar } from 'lucide-react';

export const AwardsTab: React.FC = () => {
  const { awards, language, theme, isAdmin, deleteAward, openAdminModal, t, searchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAwards = awards.filter(award => {
    const titleText = (award.title[language] || award.title['en'] || '').toLowerCase();
    const descText = (award.description[language] || award.description['en'] || '').toLowerCase();
    const seasonText = (award.season || '').toLowerCase();
    const matchesSearch = titleText.includes(searchQuery.toLowerCase()) || 
                          descText.includes(searchQuery.toLowerCase()) || 
                          seasonText.includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && award.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
            <span>{t('awards') || 'نازناوەکان و دەستکەوتەکان'}</span>
          </h1>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            مێژووی پڕ لە شانازی و جام و نازناوە فەرمییەکانی یانەی لاوانی ئاگرین
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => openAdminModal('award', null)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white text-xs font-extrabold shadow-lg shadow-amber-500/25 whitespace-nowrap transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addNew') || 'زیادکردنی نازناو'}</span>
          </button>
        )}
      </div>

      {/* Categories / Filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {[
          { id: 'all', label: 'هەموو نازناوەکان' },
          { id: 'trophy', label: 'جامەکان (Trophies)' },
          { id: 'cup', label: 'پاڵەوانێتی (Cups)' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : theme === 'dark'
                ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Awards Grid */}
      {filteredAwards.length === 0 ? (
        <div className={`text-center py-16 rounded-3xl border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'}`}>
          <Trophy className="w-16 h-16 mx-auto mb-3 opacity-30 text-amber-400" />
          <p className="text-base font-semibold">هیچ نازناوێک نەدۆزرایەوە</p>
          <p className="text-xs text-slate-400 mt-1">تکایە گەڕانەکەت بگۆڕە یان نازناوی نوێ زیاد بکە</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAwards.map((award: AwardItem) => {
            const title = award.title[language] || award.title['en'] || '';
            const desc = award.description[language] || award.description['en'] || '';

            return (
              <div
                key={award.id}
                className={`group relative rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
                  theme === 'dark'
                    ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40 shadow-xl'
                    : 'bg-white border-slate-200 hover:border-amber-400 shadow-md'
                }`}
              >
                {/* Admin Actions */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-lg">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openAdminModal('award', award);
                      }}
                      className="p-1.5 text-slate-300 hover:text-white transition-colors"
                      title={t('edit')}
                    >
                      <Edit3 className="w-4 h-4 text-amber-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAward(award.id);
                      }}
                      className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                      title={t('delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Trophy Image */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-transparent flex items-center justify-center p-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10" />
                  <img
                    src={award.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5" />
                    <span>{award.season}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-extrabold border border-emerald-500/20 uppercase">
                      {award.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {award.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold mb-2 group-hover:text-amber-400 transition-colors line-clamp-1">
                    {title}
                  </h3>

                  <p className={`text-xs line-clamp-3 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
