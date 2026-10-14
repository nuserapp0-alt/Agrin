import React from 'react';
import { useApp } from '../context/AppContext';
import { PlayerItem } from '../types';
import { Users, Star, Plus, Edit3, Trash2, Award, Shield, Zap } from 'lucide-react';

export const PlayersTab: React.FC = () => {
  const { players, isAdmin, t, theme, searchQuery, deletePlayer, openAdminModal, setSelectedPlayerItem } = useApp();

  const filteredPlayers = players.filter(player => {
    return (
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (player.nickname && player.nickname.toLowerCase().includes(searchQuery.toLowerCase())) ||
      player.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.nationality.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Group players by position for tactical listing
  const positionGroups: { key: string; label: string; icon: React.ReactNode; pos: string }[] = [
    { key: 'FW', label: 'هێرشبەران (FORWARDS)', icon: <Zap className="w-4 h-4 text-amber-400" />, pos: 'FW' },
    { key: 'MF', label: 'ناوەڕاست (MIDFIELDERS)', icon: <Star className="w-4 h-4 text-emerald-400" />, pos: 'MF' },
    { key: 'DF', label: 'بەرگریکاران (DEFENDERS)', icon: <Shield className="w-4 h-4 text-teal-400" />, pos: 'DF' },
    { key: 'GK', label: 'گۆڵچی (GOALKEEPER)', icon: <Award className="w-4 h-4 text-blue-400" />, pos: 'GK' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('players')} (پێکهاتەی یاریزانان و نازناوەکان)
          </h1>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            لیستی تەواوی یاریزانانی یانە و نازناوەکانیان دابەشبوو بەپێی شوێنی یاریکردن
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => openAdminModal('player', null)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addNew')}</span>
          </button>
        )}
      </div>

      {/* Grouped Players List */}
      {filteredPlayers.length === 0 ? (
        <div className={`text-center py-16 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'}`}>
          <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-base font-semibold">هیچ یاریزانێک نەدۆزرایەوە</p>
          <p className="text-xs text-slate-400 mt-1">تکایە گەڕانەکەت بگۆڕە</p>
        </div>
      ) : (
        <div className="space-y-10">
          {positionGroups.map(group => {
            const groupPlayers = filteredPlayers.filter(p => {
              if (group.pos === 'FW') return ['FW', 'LW', 'RW'].includes(p.position);
              if (group.pos === 'MF') return ['MF', 'AM', 'DM'].includes(p.position);
              if (group.pos === 'DF') return ['DF', 'CB', 'LB', 'RB'].includes(p.position);
              if (group.pos === 'GK') return ['GK'].includes(p.position);
              return p.position === group.pos;
            });
            if (groupPlayers.length === 0) return null;

            return (
              <div key={group.key} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  {group.icon}
                  <h2 className="text-base sm:text-lg font-extrabold tracking-wide uppercase text-amber-400">
                    {group.label}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold ml-2">
                    {groupPlayers.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupPlayers.map((player: PlayerItem) => (
                    <div
                      key={player.id}
                      onClick={() => setSelectedPlayerItem(player)}
                      className={`group relative rounded-2xl border p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                        theme === 'dark'
                          ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-xl'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-md'
                      }`}
                    >
                      {/* Admin Actions */}
                      {isAdmin && (
                        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openAdminModal('player', player);
                            }}
                            className="p-1 text-slate-300 hover:text-white transition-colors"
                            title={t('edit')}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deletePlayer(player.id);
                            }}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                            title={t('delete')}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0 border border-slate-700">
                          <img
                            src={player.imageUrl}
                            alt={player.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs text-center text-[10px] font-extrabold text-white py-0.5">
                            #{player.number}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-bold flex items-center gap-1 border border-amber-500/20">
                              📍 {player.nationality}
                            </span>
                          </div>
                          <h3 className="font-bold text-base group-hover:text-emerald-400 transition-colors flex items-center gap-2 flex-wrap">
                            <span>{player.name}</span>
                            {player.nickname && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-extrabold border border-amber-500/30">
                                "{player.nickname}"
                              </span>
                            )}
                          </h3>
                          <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                            {player.club}
                          </p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className={`grid grid-cols-4 gap-2 pt-4 border-t text-center ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400">{t('appearances')}</span>
                          <span className="text-sm font-extrabold">{player.stats.appearances}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400">{t('goals')}</span>
                          <span className="text-sm font-extrabold text-emerald-400">{player.stats.goals}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400">{t('assists')}</span>
                          <span className="text-sm font-extrabold text-teal-400">{player.stats.assists}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400">{t('rating')}</span>
                          <div className="flex items-center justify-center gap-0.5 text-amber-400 text-sm font-extrabold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{player.stats.rating}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
