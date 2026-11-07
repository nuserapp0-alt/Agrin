import React from 'react';
import { useApp } from '../context/AppContext';
import { InternalMatchItem } from '../types';
import { Calendar, Clock, MapPin, Trophy, Plus, Edit3, Trash2, Shield } from 'lucide-react';

export const InternalMatchesTab: React.FC = () => {
  const { internalMatches, isAdmin, t, theme, searchQuery, deleteInternalMatch, openAdminModal } = useApp();

  const filteredMatches = internalMatches.filter(match => {
    return (
      match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.competition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.stadium.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <Shield className="w-8 h-8 text-amber-400" />
            <span>یاری ناوەخۆ (Internal Matches)</span>
          </h1>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            ئەنجامی یارییە ناوەخۆییە تەواوبووەکانی یانە
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => openAdminModal('internal-match', null)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white text-xs font-extrabold shadow-lg shadow-amber-500/25 whitespace-nowrap transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>زیادکردنی یاری ناوەخۆ</span>
          </button>
        )}
      </div>

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <div className={`text-center py-16 rounded-3xl border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'}`}>
          <Trophy className="w-16 h-16 mx-auto mb-3 opacity-30 text-amber-400" />
          <p className="text-base font-semibold">هیچ یارییەکی ناوەخۆ نەدۆزرایەوە</p>
          <p className="text-xs text-slate-400 mt-1">تکایە یارییەکی نوێ زیاد بکە</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match: InternalMatchItem) => (
            <div
              key={match.id}
              className={`group relative rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40 shadow-xl'
                  : 'bg-white border-slate-200 hover:border-amber-400 shadow-md'
              }`}
            >
              {/* Admin Actions */}
              {isAdmin && (
                <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-xl">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openAdminModal('internal-match', match);
                    }}
                    className="p-1.5 text-slate-300 hover:text-white transition-colors"
                    title={t('edit')}
                  >
                    <Edit3 className="w-4 h-4 text-amber-400" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('دڵنیای لە سڕینەوەی ئەم یارییە ناوەخۆیە؟')) {
                        deleteInternalMatch(match.id);
                      }
                    }}
                    className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                    title={t('delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Competition & Status Badge */}
              <div className="p-5 pb-3 flex items-center justify-between border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-400">{match.competition}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[10px] tracking-wider uppercase border border-emerald-500/30">
                  تەواوبوو (Finished)
                </span>
              </div>

              {/* Teams & Score */}
              <div className="p-6">
                <div className="grid grid-cols-7 items-center gap-2">
                  {/* Home Team */}
                  <div className="col-span-3 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800/50 p-2 border border-slate-700/50 flex items-center justify-center shadow-inner mb-2">
                      {match.homeLogo ? (
                        <img 
                          src={match.homeLogo} 
                          alt={match.homeTeam} 
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <Shield className="w-5 h-5 text-slate-500 opacity-60" />
                      )}
                    </div>
                    <span className="font-bold text-xs sm:text-sm leading-tight">
                      {match.homeTeam}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="col-span-1 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1.5 text-2xl font-black tracking-tight text-amber-400">
                      <span>{match.homeScore}</span>
                      <span className="text-slate-600">-</span>
                      <span>{match.awayScore}</span>
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="col-span-3 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800/50 p-2 border border-slate-700/50 flex items-center justify-center shadow-inner mb-2">
                      {match.awayLogo ? (
                        <img 
                          src={match.awayLogo} 
                          alt={match.awayTeam} 
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <Shield className="w-5 h-5 text-slate-500 opacity-60" />
                      )}
                    </div>
                    <span className="font-bold text-xs sm:text-sm leading-tight">
                      {match.awayTeam}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer (Stadium & Date) */}
              <div className={`px-6 py-3.5 border-t flex items-center justify-between text-xs font-semibold ${
                theme === 'dark' ? 'border-slate-800 bg-slate-950/40 text-slate-400' : 'border-slate-100 bg-slate-50 text-slate-500'
              }`}>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{match.stadium}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{match.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
