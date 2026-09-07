import React, { useState, useEffect, useCallback } from 'react';
import { Anime, Episode, NavScreen, WatchHistoryItem } from './types';
import { INITIAL_ANIME_LIST, INITIAL_CONTINUE_WATCHING } from './data/animeData';
import { fetchAllAnimeFromSupabase, FetchAnimeResult } from './services/animeService';
import { isSupabaseConfigured } from './lib/supabase';
import { TopHeader } from './components/TopHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { AnimeDetailScreen } from './components/AnimeDetailScreen';
import { VideoPlayerScreen } from './components/VideoPlayerScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { Toast } from './components/Toast';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('home');
  const [previousScreen, setPreviousScreen] = useState<NavScreen>('home');
  const [animeList, setAnimeList] = useState<Anime[]>(INITIAL_ANIME_LIST);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(INITIAL_ANIME_LIST[0]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | undefined>(undefined);
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(1);
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>('All');
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [dataFetchInfo, setDataFetchInfo] = useState<FetchAnimeResult | null>(null);
  
  const [libraryIds, setLibraryIds] = useState<Set<string>>(
    new Set(['attack-on-titan', 'demon-slayer', 'solo-leveling'])
  );
  const [watchlistIds, setWatchlistIds] = useState<Set<string>>(
    new Set(['neon-genesis-skyline', 'frieren', 'shadow-of-the-erdtree'])
  );
  const [continueWatching, setContinueWatching] = useState<WatchHistoryItem[]>(
    INITIAL_CONTINUE_WATCHING
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const loadAnimeData = useCallback(async (notifyOnComplete = false) => {
    setIsLoadingData(true);
    try {
      const result = await fetchAllAnimeFromSupabase();
      setDataFetchInfo(result);
      if (result.animeList && result.animeList.length > 0) {
        setAnimeList(result.animeList);
        setSelectedAnime((prev) => {
          if (!prev) return result.animeList[0];
          const found = result.animeList.find((a) => a.id === prev.id);
          return found || result.animeList[0];
        });
      }
      if (notifyOnComplete) {
        if (!result.isUsingFallback) {
          showToast(`Synced ${result.count} anime from Supabase`);
        } else if (isSupabaseConfigured()) {
          showToast('Supabase table is empty, showing fallback catalog');
        }
      }
    } catch (err: any) {
      console.error('Data load error:', err);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadAnimeData(false);
  }, [loadAnimeData]);

  const handleNavigate = (screen: NavScreen) => {
    if (screen !== currentScreen) {
      setPreviousScreen(currentScreen);
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectAnime = (anime: Anime, seasonNumber?: number) => {
    setSelectedAnime(anime);
    setSelectedSeasonNumber(seasonNumber || anime.seasons[0]?.seasonNumber || 1);
    setPreviousScreen(currentScreen);
    setCurrentScreen('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayEpisode = (anime: Anime, episodeIndex?: number, episode?: Episode) => {
    setSelectedAnime(anime);
    const targetEpisode =
      episode ||
      (episodeIndex !== undefined && anime.seasons[0]?.episodes[episodeIndex]) ||
      anime.seasons[0]?.episodes[0];

    setSelectedEpisode(targetEpisode);
    if (targetEpisode?.seasonNumber) {
      setSelectedSeasonNumber(targetEpisode.seasonNumber);
    }
    setPreviousScreen(currentScreen);
    setCurrentScreen('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayerBack = (seasonNumber?: number) => {
    if (seasonNumber) {
      setSelectedSeasonNumber(seasonNumber);
    } else if (selectedEpisode?.seasonNumber) {
      setSelectedSeasonNumber(selectedEpisode.seasonNumber);
    }
    setCurrentScreen('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLibrary = (animeId: string) => {
    const next = new Set(libraryIds);
    if (next.has(animeId)) {
      next.delete(animeId);
      showToast('Removed from Library');
    } else {
      next.add(animeId);
      showToast('Added to Library');
    }
    setLibraryIds(next);
  };

  const handleToggleWatchlist = (animeId: string) => {
    const next = new Set(watchlistIds);
    if (next.has(animeId)) {
      next.delete(animeId);
      showToast('Removed from Watchlist');
    } else {
      next.add(animeId);
      showToast('Added to Watchlist');
    }
    setWatchlistIds(next);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenreFilter(genre);
    setPreviousScreen(currentScreen);
    setCurrentScreen('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentScreen === 'player') {
      if (selectedEpisode?.seasonNumber) {
        setSelectedSeasonNumber(selectedEpisode.seasonNumber);
      }
      setCurrentScreen(selectedAnime ? 'detail' : 'home');
    } else if (currentScreen === 'detail') {
      setCurrentScreen(previousScreen === 'detail' || previousScreen === 'player' ? 'home' : previousScreen);
    } else {
      setCurrentScreen('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans relative selection:bg-indigo-600 selection:text-white">
      {/* Top Header Bar */}
      <TopHeader
        currentScreen={currentScreen}
        title={
          currentScreen === 'explore'
            ? 'Explore'
            : currentScreen === 'library'
            ? 'Library'
            : currentScreen === 'watchlist'
            ? 'Watchlist'
            : currentScreen === 'profile'
            ? 'Profile'
            : 'Animeto'
        }
        onBack={handleBack}
        onSearchClick={() => handleNavigate('explore')}
        onProfileClick={() => handleNavigate('profile')}
      />

      {/* Main Views Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-4">
        {currentScreen === 'home' && (
          <HomeScreen
            animeList={animeList}
            continueWatching={continueWatching}
            libraryIds={libraryIds}
            onSelectAnime={handleSelectAnime}
            onPlayEpisode={handlePlayEpisode}
            onToggleLibrary={handleToggleLibrary}
            onGenreSelect={handleGenreSelect}
          />
        )}

        {currentScreen === 'explore' && (
          <ExploreScreen
            animeList={animeList}
            initialGenre={selectedGenreFilter}
            onSelectAnime={handleSelectAnime}
          />
        )}

        {currentScreen === 'detail' && selectedAnime && (
          <AnimeDetailScreen
            anime={selectedAnime}
            initialSeasonNumber={selectedSeasonNumber}
            isInLibrary={libraryIds.has(selectedAnime.id)}
            isInWatchlist={watchlistIds.has(selectedAnime.id)}
            onBack={handleBack}
            onPlayEpisode={handlePlayEpisode}
            onToggleLibrary={handleToggleLibrary}
            onToggleWatchlist={handleToggleWatchlist}
            onSeasonChange={(seasonNum) => setSelectedSeasonNumber(seasonNum)}
          />
        )}

        {currentScreen === 'player' && selectedAnime && (
          <VideoPlayerScreen
            anime={selectedAnime}
            initialEpisode={selectedEpisode}
            onBack={handlePlayerBack}
            onSelectEpisode={(ep) => {
              setSelectedEpisode(ep);
              if (ep.seasonNumber) {
                setSelectedSeasonNumber(ep.seasonNumber);
              }
            }}
            onToast={showToast}
          />
        )}

        {currentScreen === 'library' && (
          <LibraryScreen
            animeList={animeList}
            libraryIds={libraryIds}
            watchlistIds={watchlistIds}
            continueWatching={continueWatching}
            defaultTab="library"
            onSelectAnime={handleSelectAnime}
            onPlayEpisode={(anime) => handlePlayEpisode(anime)}
            onToggleLibrary={handleToggleLibrary}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {currentScreen === 'watchlist' && (
          <LibraryScreen
            animeList={animeList}
            libraryIds={libraryIds}
            watchlistIds={watchlistIds}
            continueWatching={continueWatching}
            defaultTab="watchlist"
            onSelectAnime={handleSelectAnime}
            onPlayEpisode={(anime) => handlePlayEpisode(anime)}
            onToggleLibrary={handleToggleLibrary}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen onToast={showToast} onRefreshData={() => loadAnimeData(true)} />
        )}
      </main>

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Persistent Bottom Navigation Bar */}
      <BottomNavBar currentScreen={currentScreen} onNavigate={handleNavigate} />
    </div>
  );
}
