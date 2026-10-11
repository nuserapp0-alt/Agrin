import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MatchItem } from '../types';
import { Calendar, Clock, MapPin, Trophy, Plus, Edit3, Trash2, Activity } from 'lucide-react';

export const MatchesTab: React.FC = () => {
  const { matches, isAdmin, t, theme, searchQuery, deleteMatch, openAdminModal } = useApp();
  const [filter, setFilter] = useState<'all' | 'LIVE' | 'UPCOMING' | 'FINISHED'>('all');

  const filteredMatches = matches.filter(match => {
    const matchesFilter = filter === 'all' || match.status === filter;
    const matchesSearch = 
      match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.competition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.stadium.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('matches')}
          </h1>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Live scores, upcoming fixtures, and tactical timelines
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {(['all', 'LIVE', 'UPCOMING', 'FINISHED'] as const).map((statusKey) => {
            const isActive = filter === statusKey;
            const labelMap = {
              all: t('allMatches'),
              LIVE: t('liveMatches'),
              UPCOMING: t('upcomingMatches'),
              FINISHED: t('finishedMatches'),
            };
            return (
              <button
                key={statusKey}
                onClick={() => setFilter(statusKey)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : theme === 'dark'
                    ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm'
                }`}
              >
                {statusKey === 'LIVE' && <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping mr-1.5" />}
                {labelMap[statusKey]}
              </button>
            );
          })}

          {isAdmin && (
            <button
              onClick={() => openAdminModal('match', null)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 ml-auto whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addNew')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <div className={`text-center py-16 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'}`}>
          <Trophy className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-base font-semibold">No matches found</p>
          <p className="text-xs text-slate-400 mt-1">Try changing your filter or search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredMatches.map((match: MatchItem) => {
            const isLive = match.status === 'LIVE';
            const isFinished = match.status === 'FINISHED';

            return (
              <div
                key={match.id}
                className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-xl'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-md'
                }`}
              >
                {/* Competition & Status Banner */}
                <div className={`px-5 py-3 flex items-center justify-between border-b ${
                  theme === 'dark' ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold tracking-wide uppercase text-slate-400">
                      {match.competition}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isLive && (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-extrabold animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        {match.minute || t('live')}
                      </span>
                    )}
                    {isFinished && (
                      <span className="px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-400 text-xs font-bold">
                        {t('finished')}
                      </span>
                    )}
                    {match.status === 'UPCOMING' && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                        {t('upcoming')}
                      </span>
                    )}

                    {isAdmin && (
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => openAdminModal('match', match)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          title={t('edit')}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteMatch(match.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                          title={t('delete')}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Teams & Score Custom Layout */}
                <div className="p-6">
                  <div className="grid grid-cols-7 items-center gap-2">
                    
                    {/* Home Team */}
                    <div className="col-span-3 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-slate-800/50 p-2 border border-slate-700/50 flex items-center justify-center shadow-inner mb-3">
                        <img 
                          src={match.homeLogo} 
                          alt={match.homeTeam} 
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="font-bold text-sm sm:text-base leading-tight">
                        {match.homeTeam}
                      </span>
                    </div>

                    {/* VS / Score */}
                    <div className="col-span-1 flex flex-col items-center justify-center">
                      {match.status === 'UPCOMING' ? (
                        <div className="text-xs font-extrabold text-slate-400 tracking-wider bg-slate-800/60 px-2 py-1 rounded-md">
                          VS
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-2xl sm:text-3xl font-black tracking-tight">
                          <span>{match.homeScore}</span>
                          <span className="text-slate-500">-</span>
                          <span>{match.awayScore}</span>
                        </div>
                      )}
                    </div>

                    {/* Away Team */}
                    <div className="col-span-3 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-slate-800/50 p-2 border border-slate-700/50 flex items-center justify-center shadow-inner mb-3">
                        <img 
                          src={match.awayLogo} 
                          alt={match.awayTeam} 
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="font-bold text-sm sm:text-base leading-tight">
                        {match.awayTeam}
                      </span>
                    </div>

                  </div>

                  {/* Match Timeline / Events if available */}
                  {match.events && match.events.length > 0 && (
                    <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
                      <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-emerald-400">
                        <Activity className="w-3.5 h-3.5" />
                        <span>Match Events</span>
                      </div>
                      <div className="space-y-1.5">
                        {match.events.map((ev, idx) => (
                          <div 
                            key={idx} 
                            className={`flex items-center justify-between text-xs py-1 px-2.5 rounded-lg ${
                              ev.team === 'home' ? 'bg-emerald-500/5 justify-start' : 'bg-teal-500/5 justify-end'
                            }`}
                          >
                            <span className="font-bold text-slate-400 mr-2">{ev.minute}</span>
                            <span className="font-semibold">{ev.player}</span>
                            <span className="ml-2 text-base">
                              {ev.type === 'goal' && '⚽'}
                              {ev.type === 'yellow' && '🟨'}
                              {ev.type === 'red' && '🟥'}
                              {ev.type === 'sub' && '🔄'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer Info: Stadium, Date, Time */}
                  <div className={`mt-6 pt-4 border-t flex flex-wrap items-center justify-between text-xs ${
                    theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{match.stadium}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{match.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{match.time}</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
