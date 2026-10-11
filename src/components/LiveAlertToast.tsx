import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Bell, X } from 'lucide-react';

export const LiveAlertToast: React.FC = () => {
  const { matches, theme } = useApp();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Play a pleasant whistle / goal sound using Web Audio API
  const playGoalSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      // Audio context blocked or not supported
    }
  };

  useEffect(() => {
    // Check for live matches and trigger a demo goal alert after 4 seconds
    const timer = setTimeout(() => {
      const liveMatch = matches.find(m => m.status === 'LIVE');
      if (liveMatch) {
        setAlertMessage(`⚽ GOAL! ${liveMatch.homeTeam} ${liveMatch.homeScore} - ${liveMatch.awayScore} ${liveMatch.awayTeam} (${liveMatch.minute || "LIVE"})`);
        playGoalSound();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!alertMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce max-w-sm">
      <div className={`p-4 rounded-2xl border shadow-2xl flex items-start gap-3 backdrop-blur-md ${
        theme === 'dark' ? 'bg-slate-900/95 border-emerald-500/50 text-white shadow-emerald-900/30' : 'bg-white/95 border-emerald-500/50 text-slate-900 shadow-xl'
      }`}>
        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-emerald-600/30">
          <Trophy className="w-5 h-5 animate-spin" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide">
            <Bell className="w-3.5 h-3.5" />
            <span>Live Match Goal Alert</span>
          </div>
          <p className="text-sm font-extrabold mt-0.5">{alertMessage}</p>
        </div>
        <button
          onClick={() => setAlertMessage(null)}
          className="text-slate-400 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
