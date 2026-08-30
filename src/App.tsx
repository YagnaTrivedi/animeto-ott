import React, { useState, useEffect } from 'react';
import { Anime, Episode, NavScreen, WatchHistoryItem } from './types';
import { INITIAL_ANIME_LIST, INITIAL_CONTINUE_WATCHING } from './data/animeData';
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
  const [animeList] = useState<Anime[]>(INITIAL_ANIME_LIST);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(INITIAL_ANIME_LIST[0]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | undefined>(undefined);
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>('All');
  
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

  const handleNavigate = (screen: NavScreen) => {
    if (screen !== currentScreen) {
      setPreviousScreen(currentScreen);
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectAnime = (anime: Anime) => {
    setSelectedAnime(anime);
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
    setPreviousScreen(currentScreen);
    setCurrentScreen('player');
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
      setCurrentScreen(selectedAnime ? 'detail' : 'home');
    } else if (currentScreen === 'detail') {
      setCurrentScreen(previousScreen === 'detail' ? 'home' : previousScreen);
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
            isInLibrary={libraryIds.has(selectedAnime.id)}
            isInWatchlist={watchlistIds.has(selectedAnime.id)}
            onBack={handleBack}
            onPlayEpisode={handlePlayEpisode}
            onToggleLibrary={handleToggleLibrary}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {currentScreen === 'player' && selectedAnime && (
          <VideoPlayerScreen
            anime={selectedAnime}
            initialEpisode={selectedEpisode}
            onBack={handleBack}
            onSelectEpisode={(ep) => setSelectedEpisode(ep)}
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
          <ProfileScreen onToast={showToast} />
        )}
      </main>

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Persistent Bottom Navigation Bar */}
      <BottomNavBar currentScreen={currentScreen} onNavigate={handleNavigate} />
    </div>
  );
}
