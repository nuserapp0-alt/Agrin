/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MatchesTab } from './components/MatchesTab';
import { NewsTab } from './components/NewsTab';
import { PlayersTab } from './components/PlayersTab';
import { AwardsTab } from './components/AwardsTab';
import { SettingsTab } from './components/SettingsTab';
import { SplashScreen } from './components/SplashScreen';
import { AdminModal } from './components/AdminModal';

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const { currentTab, theme } = useApp();

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 font-sans selection:bg-amber-500 selection:text-slate-950`}>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {currentTab === 'matches' && <MatchesTab />}
        {currentTab === 'news' && <NewsTab />}
        {currentTab === 'players' && <PlayersTab />}
        {currentTab === 'awards' && <AwardsTab />}
        {currentTab === 'settings' && <SettingsTab />}
      </main>

      <AdminModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
