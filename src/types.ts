export interface Episode {
  id: string;
  animeId: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  videoUrl: string;
  subtitleUrl: string;
  introStart: number;
  introEnd: number;
  // UI helpers & backward compatibility
  synopsis?: string;
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
  alternativeTitles: string[];
  description: string;
  poster: string;
  banner: string;
  logo: string;
  year: number;
  season: string;
  status: 'Ongoing' | 'Completed' | 'Upcoming' | string;
  rating: number;
  genres: string[];
  type: 'TV' | 'Movie' | 'OVA' | 'Special' | string;
  studio: string;
  totalEpisodes: number;
  duration: string;
  language: string;
  ageRating: string;
  featured: boolean;
  trending: boolean;
  popular: boolean;
  newRelease: boolean;

  // Backward-compatibility & UI conveniences
  originalTitle?: string;
  format?: 'TV' | 'Movie' | 'OVA' | string;
  seasonsCount?: number;
  badge?: 'New Episode' | 'Sub/Dub' | 'Trending' | 'Featured' | 'New EP 1' | 'New EP 12' | string;
  badgeType?: 'primary' | 'secondary' | 'tertiary' | 'error';
  posterUrl: string;
  bannerUrl: string;
  synopsis: string;
  trendingRank?: number;
  trendingCategory?: string;
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

