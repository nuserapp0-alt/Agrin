import React, { createContext, useContext, useState, useEffect } from 'react';
import { TabType, LanguageCode, ThemeMode, NewsItem, MatchItem, PlayerItem, AwardItem } from '../types';
import { initialNews, initialMatches, initialPlayers, initialAwards } from '../data/initialData';
import { db } from '../firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, getDocs } from 'firebase/firestore';

interface AppContextType {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  news: NewsItem[];
  matches: MatchItem[];
  players: PlayerItem[];
  awards: AwardItem[];
  adminEmail: string;
  setAdminEmail: (email: string) => void;
  isLoggedInAdmin: boolean;
  setIsLoggedInAdmin: (val: boolean) => void;
  isAdmin: boolean;
  loginAdmin: (email?: string, pass?: string) => boolean;
  logoutAdmin: () => void;
  users: Array<{name: string; email: string; password: string}>;
  currentUser: {name: string; email: string} | null;
  registerUser: (name: string, email: string, password: string) => boolean;
  loginUser: (email: string, password: string) => boolean;
  logoutUser: () => void;
  showAdminModal: boolean;
  setShowAdminModal: (val: boolean) => void;
  openAdminModal: (type?: string, item?: any) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  selectedNewsItem: NewsItem | null;
  setSelectedNewsItem: (item: NewsItem | null) => void;
  selectedPlayerItem: PlayerItem | null;
  setSelectedPlayerItem: (item: PlayerItem | null) => void;
  addNews: (item: Omit<NewsItem, 'id'>) => void;
  updateNews: (id: string, item: Omit<NewsItem, 'id'>) => void;
  deleteNews: (id: string) => void;
  addMatch: (item: Omit<MatchItem, 'id'>) => void;
  updateMatch: (id: string, item: Omit<MatchItem, 'id'>) => void;
  deleteMatch: (id: string) => void;
  addPlayer: (item: Omit<PlayerItem, 'id'>) => void;
  updatePlayer: (id: string, item: Omit<PlayerItem, 'id'>) => void;
  deletePlayer: (id: string) => void;
  addAward: (item: Omit<AwardItem, 'id'>) => void;
  updateAward: (id: string, item: Omit<AwardItem, 'id'>) => void;
  deleteAward: (id: string) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<TabType>('matches');
  const [language, setLanguage] = useState<LanguageCode>('ku');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>(() => {
    return localStorage.getItem('app_logo_url') || '';
  });

  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItem | null>(null);
  const [selectedPlayerItem, setSelectedPlayerItem] = useState<PlayerItem | null>(null);
  
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('app_news');
    return saved ? JSON.parse(saved) : initialNews;
  });

  const [matches, setMatches] = useState<MatchItem[]>(() => {
    const saved = localStorage.getItem('app_matches');
    return saved ? JSON.parse(saved) : initialMatches;
  });

  const [players, setPlayers] = useState<PlayerItem[]>(() => {
    const saved = localStorage.getItem('app_players');
    return saved ? JSON.parse(saved) : initialPlayers;
  });

  const [awards, setAwards] = useState<AwardItem[]>(() => {
    const saved = localStorage.getItem('app_awards');
    return saved ? JSON.parse(saved) : initialAwards;
  });

  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return localStorage.getItem('app_admin_email') || 'himat.friad@gmail.com';
  });

  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState<boolean>(() => {
    return localStorage.getItem('app_is_admin') === 'true';
  });

  const [users, setUsers] = useState<Array<{name: string; email: string; password: string}>>(() => {
    const saved = localStorage.getItem('app_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<{name: string; email: string} | null>(() => {
    const saved = localStorage.getItem('app_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    const seedFirestore = async () => {
      try {
        if (localStorage.getItem('app_db_seeded')) return;

        const newsSnap = await getDocs(collection(db, 'news'));
        if (newsSnap.empty) {
          for (const item of initialNews) {
            await setDoc(doc(db, 'news', item.id), item);
          }
        }
        const matchesSnap = await getDocs(collection(db, 'matches'));
        if (matchesSnap.empty) {
          for (const item of initialMatches) {
            await setDoc(doc(db, 'matches', item.id), item);
          }
        }
        const playersSnap = await getDocs(collection(db, 'players'));
        if (playersSnap.empty) {
          for (const item of initialPlayers) {
            await setDoc(doc(db, 'players', item.id), item);
          }
        }
        const awardsSnap = await getDocs(collection(db, 'awards'));
        if (awardsSnap.empty) {
          for (const item of initialAwards) {
            await setDoc(doc(db, 'awards', item.id), item);
          }
        }
        localStorage.setItem('app_db_seeded', 'true');
      } catch (e) {
        console.log('Seeding error:', e);
      }
    };
    seedFirestore();

    const unsubNews = onSnapshot(collection(db, 'news'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NewsItem[];
      setNews(Array.from(new Map(items.map(i => [i.id, i])).values()));
    }, (err) => console.log('Firestore news sync error:', err));

    const unsubMatches = onSnapshot(collection(db, 'matches'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MatchItem[];
      setMatches(Array.from(new Map(items.map(i => [i.id, i])).values()));
    }, (err) => console.log('Firestore matches sync error:', err));

    const unsubPlayers = onSnapshot(collection(db, 'players'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PlayerItem[];
      setPlayers(Array.from(new Map(items.map(i => [i.id, i])).values()));
    }, (err) => console.log('Firestore players sync error:', err));

    const unsubAwards = onSnapshot(collection(db, 'awards'), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as AwardItem[];
      setAwards(Array.from(new Map(items.map(i => [i.id, i])).values()));
    }, (err) => console.log('Firestore awards sync error:', err));

    const unsubSettings = onSnapshot(doc(db, 'settings', 'config'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().logoUrl) {
        setLogoUrl(docSnap.data().logoUrl);
      }
    }, (err) => console.log('Firestore settings sync error:', err));

    return () => {
      unsubNews();
      unsubMatches();
      unsubPlayers();
      unsubAwards();
      unsubSettings();
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'app_news' && e.newValue) {
        setNews(JSON.parse(e.newValue));
      }
      if (e.key === 'app_matches' && e.newValue) {
        setMatches(JSON.parse(e.newValue));
      }
      if (e.key === 'app_players' && e.newValue) {
        setPlayers(JSON.parse(e.newValue));
      }
      if (e.key === 'app_awards' && e.newValue) {
        setAwards(JSON.parse(e.newValue));
      }
      if (e.key === 'app_logo_url') {
        setLogoUrl(e.newValue || '');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('app_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('app_matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('app_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('app_awards', JSON.stringify(awards));
  }, [awards]);

  useEffect(() => {
    localStorage.setItem('app_admin_email', adminEmail);
  }, [adminEmail]);

  useEffect(() => {
    localStorage.setItem('app_is_admin', isLoggedInAdmin ? 'true' : 'false');
  }, [isLoggedInAdmin]);

  useEffect(() => {
    localStorage.setItem('app_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('app_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('app_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (logoUrl) {
      localStorage.setItem('app_logo_url', logoUrl);
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (link) link.href = logoUrl;
      const appleLink = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
      if (appleLink) appleLink.href = logoUrl;
    } else {
      localStorage.removeItem('app_logo_url');
    }
  }, [logoUrl]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const loginAdmin = (email?: string, pass?: string) => {
    if ((email === 'himat.friad@gmail.com' || email === 'hasankurd30@gmail.com') && (pass === 'himat2026' || pass === '123456')) {
      setIsLoggedInAdmin(true);
      setAdminEmail(email || 'himat.friad@gmail.com');
      localStorage.setItem('app_is_admin', 'true');
      localStorage.setItem('app_admin_email', email || 'himat.friad@gmail.com');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsLoggedInAdmin(false);
    localStorage.removeItem('app_is_admin');
  };

  const registerUser = (name: string, email: string, password: string) => {
    if (!name || !email || !password) return false;
    if (users.some(u => u.email === email)) return false;
    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser({ name, email });
    return true;
  };

  const loginUser = (email: string, password: string) => {
    if ((email === 'himat.friad@gmail.com' || email === 'hasankurd30@gmail.com') && (password === 'himat2026' || password === '123456')) {
      setIsLoggedInAdmin(true);
      setAdminEmail(email);
      localStorage.setItem('app_is_admin', 'true');
      localStorage.setItem('app_admin_email', email);
      setCurrentUser({ name: 'بەڕێوەبەر (Admin)', email });
      return true;
    }

    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setCurrentUser({ name: found.name, email: found.email });
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsLoggedInAdmin(false);
    localStorage.removeItem('app_is_admin');
  };

  const openAdminModal = (type?: string, item?: any) => {
    if (item) {
      setEditingItem({ type: type || 'news', ...item });
    } else {
      setEditingItem({ type: type || 'news' });
    }
    setShowAdminModal(true);
  };

  // News CRUD
  const addNews = async (item: Omit<NewsItem, 'id'>) => {
    const newItem: NewsItem = { ...item, id: 'news-' + Date.now() };
    try {
      await setDoc(doc(db, 'news', newItem.id), newItem);
      setNews(prev => {
        const next = [newItem, ...prev];
        localStorage.setItem('app_news', JSON.stringify(next));
        return next;
      });
    } catch(e) {
      console.log('Add news error:', e);
      setNews(prev => [newItem, ...prev]);
    }
  };
  const updateNews = async (id: string, item: Omit<NewsItem, 'id'>) => {
    const updated = { ...item, id };
    try {
      await setDoc(doc(db, 'news', id), updated);
      setNews(prev => {
        const next = prev.map(n => n.id === id ? updated : n);
        localStorage.setItem('app_news', JSON.stringify(next));
        return next;
      });
    } catch(e) {
      console.log('Update news error:', e);
      setNews(prev => prev.map(n => n.id === id ? updated : n));
    }
  };
  const deleteNews = async (id: string) => {
    const updated = news.filter(n => n.id !== id);
    setNews(updated);
    localStorage.setItem('app_news', JSON.stringify(updated));
    try { await deleteDoc(doc(db, 'news', id)); } catch(e) { console.log('Delete news error:', e); }
  };

  // Matches CRUD
  const addMatch = async (item: Omit<MatchItem, 'id'>) => {
    const newItem: MatchItem = { ...item, id: 'match-' + Date.now() };
    try {
      await setDoc(doc(db, 'matches', newItem.id), newItem);
      setMatches(prev => {
        const next = [newItem, ...prev];
        localStorage.setItem('app_matches', JSON.stringify(next));
        return next;
      });
    } catch(e) {
      console.log('Add match error:', e);
      setMatches(prev => [newItem, ...prev]);
    }
  };
  const updateMatch = async (id: string, item: Omit<MatchItem, 'id'>) => {
    const updated = { ...item, id };
    try {
      await setDoc(doc(db, 'matches', id), updated);
      setMatches(prev => {
        const next = prev.map(m => m.id === id ? updated : m);
        localStorage.setItem('app_matches', JSON.stringify(next));
        return next;
      });
    } catch(e) {
      console.log('Update match error:', e);
      setMatches(prev => prev.map(m => m.id === id ? updated : m));
    }
  };
  const deleteMatch = async (id: string) => {
    const updated = matches.filter(m => m.id !== id);
    setMatches(updated);
    localStorage.setItem('app_matches', JSON.stringify(updated));
    try { await deleteDoc(doc(db, 'matches', id)); } catch(e) { console.log('Delete match error:', e); }
  };

  // Players CRUD
  const addPlayer = async (item: Omit<PlayerItem, 'id'>) => {
    const newItem: PlayerItem = { ...item, id: 'player-' + Date.now() };
    try {
      await setDoc(doc(db, 'players', newItem.id), newItem);
      setPlayers(prev => {
        const next = [...prev, newItem];
        localStorage.setItem('app_players', JSON.stringify(next));
        return next;
      });
    } catch(e) {
      console.log('Add player error:', e);
      setPlayers(prev => [...prev, newItem]);
    }
  };
  const updatePlayer = async (id: string, item: Omit<PlayerItem, 'id'>) => {
    const updated = { ...item, id };
    try {
      await setDoc(doc(db, 'players', id), updated);
      setPlayers(prev => {
        const next = prev.map(p => p.id === id ? updated : p);
        localStorage.setItem('app_players', JSON.stringify(next));
        return next;
      });
    } catch(e) {
      console.log('Update player error:', e);
      setPlayers(prev => prev.map(p => p.id === id ? updated : p));
    }
  };
  const deletePlayer = async (id: string) => {
    const updated = players.filter(p => p.id !== id);
    setPlayers(updated);
    localStorage.setItem('app_players', JSON.stringify(updated));
    try { await deleteDoc(doc(db, 'players', id)); } catch(e) { console.log('Delete player error:', e); }
  };

  // Awards CRUD
  const addAward = async (item: Omit<AwardItem, 'id'>) => {
    const newItem: AwardItem = { ...item, id: 'award-' + Date.now() };
    try {
      await setDoc(doc(db, 'awards', newItem.id), newItem);
      setAwards(prev => {
        const next = [newItem, ...prev];
        localStorage.setItem('app_awards', JSON.stringify(next));
        return next;
      });
    } catch(e) {
      console.log('Add award error:', e);
      setAwards(prev => [newItem, ...prev]);
    }
  };
  const updateAward = async (id: string, item: Omit<AwardItem, 'id'>) => {
    const updated = { ...item, id };
    try {
      await setDoc(doc(db, 'awards', id), updated);
      setAwards(prev => {
        const next = prev.map(a => a.id === id ? updated : a);
        localStorage.setItem('app_awards', JSON.stringify(next));
        return next;
      });
    } catch(e) {
      console.log('Update award error:', e);
      setAwards(prev => prev.map(a => a.id === id ? updated : a));
    }
  };
  const deleteAward = async (id: string) => {
    const updated = awards.filter(a => a.id !== id);
    setAwards(updated);
    localStorage.setItem('app_awards', JSON.stringify(updated));
    try { await deleteDoc(doc(db, 'awards', id)); } catch(e) { console.log('Delete award error:', e); }
  };

  const handleSetLogoUrl = async (url: string) => {
    setLogoUrl(url);
    try {
      await setDoc(doc(db, 'settings', 'config'), { logoUrl: url }, { merge: true });
    } catch(e) {
      console.log('Logo save error:', e);
    }
  };

  const t = (key: string): string => {
    const dict: Record<LanguageCode, Record<string, string>> = {
      en: {
        matches: 'Matches',
        news: 'News',
        players: 'Players',
        awards: 'Awards & Honors',
        settings: 'Settings',
        live: 'LIVE',
        upcoming: 'UPCOMING',
        finished: 'FINISHED',
        adminPanel: 'Admin Panel',
        adminLogin: 'Admin Login',
        logout: 'Logout',
        save: 'Save Changes',
        cancel: 'Cancel',
        add: 'Add New',
        addNew: 'Add New',
        edit: 'Edit',
        delete: 'Delete',
        searchPlaceholder: 'Search matches, players, news, awards...',
        season: 'Season',
        stadium: 'Stadium',
        competition: 'Competition',
        allMatches: 'All Matches',
        liveMatches: 'Live',
        upcomingMatches: 'Upcoming',
        finishedMatches: 'Finished',
        language: 'Language',
      },
      ar: {
        matches: 'المباريات',
        news: 'الأخبار',
        players: 'اللاعبين',
        awards: 'الجوائز والألقاب',
        settings: 'الإعدادات',
        live: 'مباشر',
        upcoming: 'قادمة',
        finished: 'انتهت',
        adminPanel: 'لوحة الإدارة',
        adminLogin: 'تسجيل دخول المشرف',
        logout: 'تسجيل خروج',
        save: 'حفظ التغييرات',
        cancel: 'إلغاء',
        add: 'إضافة جديد',
        addNew: 'إضافة جديد',
        edit: 'تعديل',
        delete: 'حذف',
        searchPlaceholder: 'ابحث عن مباريات، لاعبين، أخبار، جوائز...',
        season: 'الموسم',
        stadium: 'الملعب',
        competition: 'البطولة',
        allMatches: 'جميع المباريات',
        liveMatches: 'مباشر',
        upcomingMatches: 'قادمة',
        finishedMatches: 'منتهية',
        language: 'اللغة',
      },
      ku: {
        matches: 'یارییەکان',
        news: 'هەواڵەکان',
        players: 'یاریزانەکان',
        awards: 'نازناوەکان',
        settings: 'سێتینگ',
        live: 'ڕاستەوخۆ',
        upcoming: 'دواتر',
        finished: 'تەواوبوو',
        adminPanel: 'پەنەڵی بەڕێوبەر',
        adminLogin: 'چوونەژوورەوەی ئەدمین',
        logout: 'چوونەدەرەوە',
        save: 'پاشەکەوتکردن',
        cancel: 'پەشیمانبوونەوە',
        add: 'زیادکردنی نوێ',
        addNew: 'زیادکردنی نوێ',
        edit: 'دەستکاری',
        delete: 'سڕینەوە',
        searchPlaceholder: 'گەڕان بەدوای یاری، یاریزان، نازناو...',
        season: 'وەرزی',
        stadium: 'یاریگا',
        competition: 'پاڵەوانێتی',
        allMatches: 'هەموو یارییەکان',
        liveMatches: 'ڕاستەوخۆ',
        upcomingMatches: 'دواتر',
        finishedMatches: 'تەواوبوو',
        language: 'زمان',
      }
    };
    return dict[language][key] || dict['en'][key] || key;
  };

  return (
    <AppContext.Provider value={{
      currentTab, setCurrentTab,
      activeTab: currentTab, setActiveTab: setCurrentTab,
      language, setLanguage,
      theme, toggleTheme, setTheme,
      news, matches, players, awards,
      adminEmail, setAdminEmail,
      isLoggedInAdmin, setIsLoggedInAdmin,
      isAdmin: isLoggedInAdmin, loginAdmin, logoutAdmin,
      users, currentUser, registerUser, loginUser, logoutUser,
      showAdminModal, setShowAdminModal, openAdminModal,
      editingItem, setEditingItem,
      searchQuery, setSearchQuery,
      logoUrl, setLogoUrl: handleSetLogoUrl,
      selectedNewsItem, setSelectedNewsItem,
      selectedPlayerItem, setSelectedPlayerItem,
      addNews, updateNews, deleteNews,
      addMatch, updateMatch, deleteMatch,
      addPlayer, updatePlayer, deletePlayer,
      addAward, updateAward, deleteAward,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
