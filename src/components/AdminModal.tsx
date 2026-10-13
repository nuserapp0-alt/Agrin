import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, Check, Upload, Calendar, Clock, Activity, Trash2, Shield, X } from 'lucide-react';

export const AdminModal: React.FC = () => {
  const { 
    showAdminModal, 
    setShowAdminModal, 
    editingItem, 
    setEditingItem, 
    addNews, 
    updateNews, 
    addMatch, 
    updateMatch, 
    addPlayer, 
    updatePlayer, 
    addAward,
    updateAward,
    t, 
    theme,
    adminEmail,
    isLoggedInAdmin,
    setIsLoggedInAdmin
  } = useApp();

  const [contentType, setContentType] = useState<'news' | 'match' | 'player' | 'award'>('news');

  const newsFileRef = useRef<HTMLInputElement>(null);
  const homeLogoRef = useRef<HTMLInputElement>(null);
  const awayLogoRef = useRef<HTMLInputElement>(null);
  const playerFileRef = useRef<HTMLInputElement>(null);
  const awardFileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setter(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // News State
  const [newsTitleKu, setNewsTitleKu] = useState('');
  const [newsTitleEn, setNewsTitleEn] = useState('');
  const [newsTitleAr, setNewsTitleAr] = useState('');
  const [newsSummaryKu, setNewsSummaryKu] = useState('');
  const [newsContentKu, setNewsContentKu] = useState('');
  const [newsImageUrl, setNewsImageUrl] = useState('');
  const [newsCategory, setNewsCategory] = useState('Champions League');
  const [newsAuthor, setNewsAuthor] = useState('Aram Baker');

  // Match State
  const [homeTeam, setHomeTeam] = useState('');
  const [homeLogo, setHomeLogo] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [awayLogo, setAwayLogo] = useState('');
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [matchStatus, setMatchStatus] = useState<'LIVE' | 'UPCOMING' | 'FINISHED'>('UPCOMING');
  const [matchDate, setMatchDate] = useState('2026-10-15');
  const [matchTime, setMatchTime] = useState('21:00');
  const [stadium, setStadium] = useState('Santiago Bernabéu');
  const [competition, setCompetition] = useState('La Liga');

  // Player State
  const [playerName, setPlayerName] = useState('');
  const [playerNickname, setPlayerNickname] = useState('');
  const [playerClub, setPlayerClub] = useState('Real Madrid');
  const [playerPosition, setPlayerPosition] = useState<'FW' | 'MF' | 'DF' | 'GK'>('FW');
  const [playerNumber, setPlayerNumber] = useState(10);
  const [playerNationality, setPlayerNationality] = useState('Brazil');
  const [playerImageUrl, setPlayerImageUrl] = useState('');
  const [playerAppearances, setPlayerAppearances] = useState(10);
  const [playerGoals, setPlayerGoals] = useState(5);
  const [playerAssists, setPlayerAssists] = useState(3);
  const [playerRating, setPlayerRating] = useState(8.5);

  // Award State
  const [awardTitleKu, setAwardTitleKu] = useState('');
  const [awardSeason, setAwardSeason] = useState('2025/2026');
  const [awardCategory, setAwardCategory] = useState('Trophy');
  const [awardDescKu, setAwardDescKu] = useState('');
  const [awardImageUrl, setAwardImageUrl] = useState('');

  useEffect(() => {
    if (editingItem) {
      if (editingItem.type === 'news') {
        setContentType('news');
        setNewsTitleKu(editingItem.title?.ku || '');
        setNewsTitleEn(editingItem.title?.en || '');
        setNewsTitleAr(editingItem.title?.ar || '');
        setNewsSummaryKu(editingItem.summary?.ku || '');
        setNewsContentKu(editingItem.content?.ku || '');
        setNewsImageUrl(editingItem.imageUrl || '');
        setNewsCategory(editingItem.category || 'Champions League');
        setNewsAuthor(editingItem.author || 'Aram Baker');
      } else if (editingItem.type === 'match') {
        setContentType('match');
        setHomeTeam(editingItem.homeTeam || '');
        setHomeLogo(editingItem.homeLogo || '');
        setAwayTeam(editingItem.awayTeam || '');
        setAwayLogo(editingItem.awayLogo || '');
        setHomeScore(editingItem.homeScore ?? 0);
        setAwayScore(editingItem.awayScore ?? 0);
        setMatchStatus(editingItem.status || 'UPCOMING');
        setMatchDate(editingItem.date || '2026-10-15');
        setMatchTime(editingItem.time || '21:00');
        setStadium(editingItem.stadium || '');
        setCompetition(editingItem.competition || '');
      } else if (editingItem.type === 'player') {
        setContentType('player');
        setPlayerName(editingItem.name || '');
        setPlayerNickname(editingItem.nickname || '');
        setPlayerClub(editingItem.club || '');
        setPlayerPosition(editingItem.position || 'FW');
        setPlayerNumber(editingItem.number || 10);
        setPlayerNationality(editingItem.nationality || '');
        setPlayerImageUrl(editingItem.imageUrl || '');
        setPlayerAppearances(editingItem.stats?.appearances || 0);
        setPlayerGoals(editingItem.stats?.goals || 0);
        setPlayerAssists(editingItem.stats?.assists || 0);
        setPlayerRating(editingItem.stats?.rating || 8.0);
      } else if (editingItem.type === 'award') {
        setContentType('award');
        setAwardTitleKu(editingItem.title?.ku || '');
        setAwardSeason(editingItem.season || '2025/2026');
        setAwardCategory(editingItem.category || 'Trophy');
        setAwardDescKu(editingItem.description?.ku || '');
        setAwardImageUrl(editingItem.imageUrl || '');
      }
    }
  }, [editingItem]);

  if (!showAdminModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (contentType === 'news') {
      const payload = {
        title: {
          en: newsTitleEn || newsTitleKu,
          ar: newsTitleAr || newsTitleKu,
          ku: newsTitleKu,
        },
        summary: {
          en: newsSummaryKu,
          ar: newsSummaryKu,
          ku: newsSummaryKu,
        },
        content: {
          en: newsContentKu,
          ar: newsContentKu,
          ku: newsContentKu,
        },
        imageUrl: newsImageUrl || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
        date: new Date().toISOString().split('T')[0],
        time: '12:00',
        author: newsAuthor,
        category: newsCategory,
      };

      if (editingItem && editingItem.id) {
        updateNews(editingItem.id, payload);
      } else {
        addNews(payload);
      }
    } else if (contentType === 'match') {
      const payload = {
        homeTeam,
        homeLogo: homeLogo || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=100&q=80',
        awayTeam,
        awayLogo: awayLogo || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=100&q=80',
        homeScore,
        awayScore,
        status: matchStatus,
        date: matchDate,
        time: matchTime,
        stadium,
        competition,
      };

      if (editingItem && editingItem.id) {
        updateMatch(editingItem.id, payload);
      } else {
        addMatch(payload);
      }
    } else if (contentType === 'player') {
      const payload = {
        name: playerName,
        nickname: playerNickname,
        club: playerClub,
        position: playerPosition,
        number: Number(playerNumber),
        nationality: playerNationality,
        imageUrl: playerImageUrl || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
        stats: {
          appearances: Number(playerAppearances),
          goals: Number(playerGoals),
          assists: Number(playerAssists),
          rating: Number(playerRating),
        },
      };

      if (editingItem && editingItem.id) {
        updatePlayer(editingItem.id, payload);
      } else {
        addPlayer(payload);
      }
    } else if (contentType === 'award') {
      const payload = {
        title: {
          en: awardTitleKu,
          ar: awardTitleKu,
          ku: awardTitleKu,
        },
        season: awardSeason,
        category: awardCategory,
        description: {
          en: awardDescKu,
          ar: awardDescKu,
          ku: awardDescKu,
        },
        imageUrl: awardImageUrl || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
        date: new Date().toISOString().split('T')[0],
      };

      if (editingItem && editingItem.id) {
        updateAward(editingItem.id, payload);
      } else {
        addAward(payload);
      }
    }

    setShowAdminModal(false);
    setEditingItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {isLoggedInAdmin ? (editingItem ? 'دەستکاری بابەت' : 'زیادکردنی بابەتی نوێ') : 'پەنەڵی بەڕێوبەر (Admin Panel)'}
              </h2>
              <p className="text-xs text-zinc-400">
                {isLoggedInAdmin ? `بەکارهێنەر: ${adminEmail}` : 'تەنها بۆ ئەدمینی سەرەکی'}
              </p>
            </div>
          </div>
          <button
            onClick={() => { setShowAdminModal(false); setEditingItem(null); }}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Admin Authentication Gate */}
          {!isLoggedInAdmin ? (
            <div className="py-8 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">تەنها بۆ ئەدمین (hasankurd30@gmail.com)</h3>
              <p className="text-xs text-zinc-400">
                بۆ چوونەژوورەوە وەک ئەدمین، کلیک لە خوارەوە بکە:
              </p>
              <button
                onClick={() => setIsLoggedInAdmin(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold hover:from-amber-400 hover:to-yellow-500 shadow-lg shadow-amber-500/25 transition-all"
              >
                چوونەژوورەوە وەک ئەدمین
              </button>
            </div>
          ) : (
            <>
              {/* Type Switcher */}
              <div className="grid grid-cols-4 gap-2 bg-zinc-950/60 p-1.5 rounded-2xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setContentType('news')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all ${contentType === 'news' ? 'bg-amber-500 text-slate-950 shadow' : 'text-zinc-400 hover:text-white'}`}
                >
                  هەواڵ
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('match')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all ${contentType === 'match' ? 'bg-amber-500 text-slate-950 shadow' : 'text-zinc-400 hover:text-white'}`}
                >
                  یاری
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('player')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all ${contentType === 'player' ? 'bg-amber-500 text-slate-950 shadow' : 'text-zinc-400 hover:text-white'}`}
                >
                  یاریزان
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('award')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all ${contentType === 'award' ? 'bg-amber-500 text-slate-950 shadow' : 'text-zinc-400 hover:text-white'}`}
                >
                  نازناو
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. NEWS FORM */}
                {contentType === 'news' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">ناونیشانی هەواڵ (کوردی)</label>
                      <input
                        type="text"
                        required
                        value={newsTitleKu}
                        onChange={(e) => setNewsTitleKu(e.target.value)}
                        placeholder="ناونیشانی هەواڵ..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">بەش / پۆلێن (Category)</label>
                        <input
                          type="text"
                          value={newsCategory}
                          onChange={(e) => setNewsCategory(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">نوسەر (Author)</label>
                        <input
                          type="text"
                          value={newsAuthor}
                          onChange={(e) => setNewsAuthor(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">کورتەی هەواڵ</label>
                      <textarea
                        rows={2}
                        value={newsSummaryKu}
                        onChange={(e) => setNewsSummaryKu(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">ڕۆحی هەواڵ / ناوەڕۆک</label>
                      <textarea
                        rows={4}
                        value={newsContentKu}
                        onChange={(e) => setNewsContentKu(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">وێنەی هەواڵ (کلیک بکە بۆ ئەپلۆد کردن)</label>
                      <div 
                        onClick={() => newsFileRef.current?.click()}
                        className="w-full h-28 border-2 border-dashed border-zinc-700 hover:border-amber-500 rounded-2xl bg-zinc-950/60 flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden transition-colors relative group"
                      >
                        {newsImageUrl ? (
                          <img src={newsImageUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform" />
                            <span className="text-xs text-zinc-400">کلیک بکە بۆ هەڵبژاردنی وێنە</span>
                          </>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                          <Upload className="w-4 h-4" /> گۆڕینی وێنە
                        </div>
                      </div>
                      <input 
                        ref={newsFileRef} 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange(setNewsImageUrl)} 
                        className="hidden" 
                      />
                    </div>
                  </>
                )}

                {/* 2. MATCH FORM */}
                {contentType === 'match' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">جۆری خول یان یاریی دۆستانە (Competition / Friendly)</label>
                      <input
                        type="text"
                        required
                        value={competition}
                        onChange={(e) => setCompetition(e.target.value)}
                        placeholder="La Liga / خولی نایاب / یاریی دۆستانە"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">ناوی تیمی ماڵەوە (Home Team)</label>
                        <input
                          type="text"
                          required
                          value={homeTeam}
                          onChange={(e) => setHomeTeam(e.target.value)}
                          placeholder="Real Madrid"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">ناوی تیمی میوان (Away Team)</label>
                        <input
                          type="text"
                          required
                          value={awayTeam}
                          onChange={(e) => setAwayTeam(e.target.value)}
                          placeholder="Barcelona"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">لۆگۆی تیمی ماڵەوە (کلیک بۆ ئەپلۆد)</label>
                        <div 
                          onClick={() => homeLogoRef.current?.click()}
                          className="w-full h-20 border-2 border-dashed border-zinc-700 hover:border-amber-500 rounded-2xl bg-zinc-950/60 flex items-center justify-center gap-3 cursor-pointer overflow-hidden transition-colors p-2"
                        >
                          {homeLogo ? (
                            <img src={homeLogo} alt="Home Logo" className="w-12 h-12 object-cover rounded-xl" />
                          ) : (
                            <Upload className="w-5 h-5 text-amber-500" />
                          )}
                          <span className="text-xs text-zinc-400">لۆگۆی ماڵەوە</span>
                        </div>
                        <input ref={homeLogoRef} type="file" accept="image/*" onChange={handleFileChange(setHomeLogo)} className="hidden" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">لۆگۆی تیمی میوان (کلیک بۆ ئەپلۆد)</label>
                        <div 
                          onClick={() => awayLogoRef.current?.click()}
                          className="w-full h-20 border-2 border-dashed border-zinc-700 hover:border-amber-500 rounded-2xl bg-zinc-950/60 flex items-center justify-center gap-3 cursor-pointer overflow-hidden transition-colors p-2"
                        >
                          {awayLogo ? (
                            <img src={awayLogo} alt="Away Logo" className="w-12 h-12 object-cover rounded-xl" />
                          ) : (
                            <Upload className="w-5 h-5 text-amber-500" />
                          )}
                          <span className="text-xs text-zinc-400">لۆگۆی میوان</span>
                        </div>
                        <input ref={awayLogoRef} type="file" accept="image/*" onChange={handleFileChange(setAwayLogo)} className="hidden" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">گۆڵی ماڵەوە</label>
                        <input
                          type="number"
                          value={homeScore}
                          onChange={(e) => setHomeScore(Number(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">گۆڵی میوان</label>
                        <input
                          type="number"
                          value={awayScore}
                          onChange={(e) => setAwayScore(Number(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">دۆخی یاری (Status)</label>
                        <select
                          value={matchStatus}
                          onChange={(e: any) => setMatchStatus(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        >
                          <option value="UPCOMING">دواتر (Upcoming)</option>
                          <option value="LIVE">ڕاستەوخۆ (LIVE)</option>
                          <option value="FINISHED">تەواوبوو (Finished)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">بەروار (Date)</label>
                        <input
                          type="date"
                          value={matchDate}
                          onChange={(e) => setMatchDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">کات (Time)</label>
                        <input
                          type="text"
                          value={matchTime}
                          onChange={(e) => setMatchTime(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">یاریگا (Stadium)</label>
                        <input
                          type="text"
                          value={stadium}
                          onChange={(e) => setStadium(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* 3. PLAYER FORM */}
                {contentType === 'player' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">ناوی یاریزان (Player Name)</label>
                        <input
                          type="text"
                          required
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          placeholder="Vinicius Jr"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">نازناوی یاریزان (Nickname / Title)</label>
                        <input
                          type="text"
                          value={playerNickname}
                          onChange={(e) => setPlayerNickname(e.target.value)}
                          placeholder="Vini Jr"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">شوێنی یاری (Position)</label>
                        <select
                          value={playerPosition}
                          onChange={(e: any) => setPlayerPosition(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        >
                          <option value="FW">هێرشبەر (FW)</option>
                          <option value="MF">ناوەڕاست (MF)</option>
                          <option value="DF">بەرگریکار (DF)</option>
                          <option value="GK">گۆڵچی (GK)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">ژمارەی درێس (Number)</label>
                        <input
                          type="number"
                          value={playerNumber}
                          onChange={(e) => setPlayerNumber(Number(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">یانە (Club)</label>
                        <input
                          type="text"
                          value={playerClub}
                          onChange={(e) => setPlayerClub(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-zinc-300">یارییەکان</label>
                        <input
                          type="number"
                          value={playerAppearances}
                          onChange={(e) => setPlayerAppearances(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-zinc-300">گۆڵ</label>
                        <input
                          type="number"
                          value={playerGoals}
                          onChange={(e) => setPlayerGoals(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-zinc-300">أصيست</label>
                        <input
                          type="number"
                          value={playerAssists}
                          onChange={(e) => setPlayerAssists(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-zinc-300">ڕەیتینگ</label>
                        <input
                          type="number"
                          step="0.1"
                          value={playerRating}
                          onChange={(e) => setPlayerRating(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">وێنەی یاریزان (کلیک بکە بۆ ئەپلۆد کردن)</label>
                      <div 
                        onClick={() => playerFileRef.current?.click()}
                        className="w-full h-24 border-2 border-dashed border-zinc-700 hover:border-amber-500 rounded-2xl bg-zinc-950/60 flex items-center justify-center gap-3 cursor-pointer overflow-hidden transition-colors p-2"
                      >
                        {playerImageUrl ? (
                          <img src={playerImageUrl} alt="Player" className="w-16 h-16 object-cover rounded-xl" />
                        ) : (
                          <Upload className="w-6 h-6 text-amber-500" />
                        )}
                        <span className="text-xs text-zinc-400">کلیک بکە بۆ هەڵبژاردنی وێنەی یاریزان</span>
                      </div>
                      <input ref={playerFileRef} type="file" accept="image/*" onChange={handleFileChange(setPlayerImageUrl)} className="hidden" />
                    </div>
                  </>
                )}

                {contentType === 'award' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">ناوی نازناو (Title)</label>
                      <input
                        type="text"
                        value={awardTitleKu}
                        onChange={(e) => setAwardTitleKu(e.target.value)}
                        placeholder="بۆ نموونە: جامی خولی یانە پاڵەوانەکانی ئەوروپا"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">وەرزی (Season)</label>
                        <input
                          type="text"
                          value={awardSeason}
                          onChange={(e) => setAwardSeason(e.target.value)}
                          placeholder="2025/2026"
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-300">پۆلێن (Category)</label>
                        <select
                          value={awardCategory}
                          onChange={(e) => setAwardCategory(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
                        >
                          <option value="Trophy">جام (Trophy)</option>
                          <option value="Cup">پاڵەوانێتی (Cup)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">پێناسە یان کورتە (Description)</label>
                      <textarea
                        value={awardDescKu}
                        onChange={(e) => setAwardDescKu(e.target.value)}
                        rows={3}
                        placeholder="باسکردنی نازناوەکە..."
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">وێنەی نازناو (کلیک بکە بۆ ئەپلۆد کردن)</label>
                      <div 
                        onClick={() => awardFileRef.current?.click()}
                        className="w-full h-24 border-2 border-dashed border-zinc-700 hover:border-amber-500 rounded-2xl bg-zinc-950/60 flex items-center justify-center gap-3 cursor-pointer overflow-hidden transition-colors p-2"
                      >
                        {awardImageUrl ? (
                          <img src={awardImageUrl} alt="Award" className="w-16 h-16 object-cover rounded-xl" />
                        ) : (
                          <Upload className="w-6 h-6 text-amber-500" />
                        )}
                        <span className="text-xs text-zinc-400">کلیک بکە بۆ هەڵبژاردنی وێنەی نازناو</span>
                      </div>
                      <input ref={awardFileRef} type="file" accept="image/*" onChange={handleFileChange(setAwardImageUrl)} className="hidden" />
                    </div>
                  </>
                )}

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => { setShowAdminModal(false); setEditingItem(null); }}
                    className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-bold hover:from-amber-400 hover:to-yellow-500 shadow-lg shadow-amber-500/25 transition-all text-xs"
                  >
                    {t('save')}
                  </button>
                </div>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
