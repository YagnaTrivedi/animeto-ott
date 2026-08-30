export interface Episode {
  id: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  duration: string;
  synopsis: string;
  thumbnail: string;
  progressPercent?: number;
  watched?: boolean;
}

export interface Season {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
}

export interface Anime {
  id: string;
  title: string;
  originalTitle?: string;
  year: number;
  format: 'TV' | 'Movie' | 'OVA';
  seasonsCount: number;
  totalEpisodes: number;
  rating: number;
  genres: string[];
  badge?: 'New Episode' | 'Sub/Dub' | 'Trending' | 'Featured' | 'New EP 1' | 'New EP 12' | string;
  badgeType?: 'primary' | 'secondary' | 'tertiary' | 'error';
  posterUrl: string;
  bannerUrl: string;
  synopsis: string;
  featured?: boolean;
  trendingRank?: number;
  trendingCategory?: string;
  newRelease?: boolean;
  popular?: boolean;
  seasons: Season[];
}

export interface WatchHistoryItem {
  animeId: string;
  animeTitle: string;
  episodeId: string;
  episodeTitle: string;
  seasonNumber: number;
  episodeNumber: number;
  thumbnail: string;
  progressPercent: number;
  timeLeft: string;
  lastWatched: string;
}

export type NavScreen = 'home' | 'explore' | 'library' | 'watchlist' | 'profile' | 'detail' | 'player';

export interface PlayerState {
  anime: Anime;
  currentEpisode: Episode;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  audioLanguage: 'sub' | 'dub';
  quality: '1080p' | '4K' | '720p';
  volume: number;
  isMuted: boolean;
  playbackSpeed: number;
}
