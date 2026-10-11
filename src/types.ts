export type TabType = 'news' | 'matches' | 'players' | 'awards' | 'settings';

export type LanguageCode = 'en' | 'ar' | 'ku';

export type ThemeMode = 'dark' | 'light';

export interface NewsItem {
  id: string;
  title: Record<LanguageCode, string>;
  summary: Record<LanguageCode, string>;
  content: Record<LanguageCode, string>;
  imageUrl: string;
  date: string;
  time: string;
  author: string;
  category: string;
}

export interface MatchItem {
  id: string;
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
  homeScore: number;
  awayScore: number;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  minute?: string;
  date: string;
  time: string;
  stadium: string;
  competition: string;
  events?: {
    minute: string;
    team: 'home' | 'away';
    player: string;
    type: 'goal' | 'yellow' | 'red' | 'sub';
  }[];
}

export interface PlayerItem {
  id: string;
  name: string;
  nickname?: string; // نازناو
  club: string;
  position: 'FW' | 'MF' | 'DF' | 'GK' | 'LW' | 'RW' | 'AM' | 'DM' | 'CB' | 'LB' | 'RB';
  number: number;
  nationality: string;
  imageUrl: string;
  stats: {
    appearances: number;
    goals: number;
    assists: number;
    rating: number;
  };
}

export interface AwardItem {
  id: string;
  title: Record<LanguageCode, string>;
  season: string;
  category: string; // e.g. 'Trophy', 'League', 'Cup'
  description: Record<LanguageCode, string>;
  imageUrl: string;
  date: string;
}
