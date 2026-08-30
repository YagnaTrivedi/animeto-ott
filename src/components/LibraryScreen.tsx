import React, { useState } from 'react';
import { Anime, WatchHistoryItem } from '../types';

interface LibraryScreenProps {
  animeList: Anime[];
  libraryIds: Set<string>;
  watchlistIds: Set<string>;
  continueWatching: WatchHistoryItem[];
  defaultTab?: 'watchlist' | 'library' | 'history' | 'downloads';
  onSelectAnime: (anime: Anime) => void;
  onPlayEpisode: (anime: Anime) => void;
  onToggleLibrary: (animeId: string) => void;
  onToggleWatchlist: (animeId: string) => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  animeList,
  libraryIds,
  watchlistIds,
  continueWatching,
  defaultTab = 'library',
  onSelectAnime,
  onPlayEpisode,
  onToggleLibrary,
  onToggleWatchlist,
}) => {
  const [activeTab, setActiveTab] = useState<'library' | 'watchlist' | 'history' | 'downloads'>(
    defaultTab
  );

  const libraryAnime = animeList.filter((a) => libraryIds.has(a.id));
  const watchlistAnime = animeList.filter((a) => watchlistIds.has(a.id));

  return (
    <div id="library-screen-container" className="min-h-screen pb-28 text-white max-w-6xl mx-auto px-4 space-y-6">
      {/* Bento Header Tile */}
      <section className="bento-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">User Collection</span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {activeTab === 'watchlist'
                ? 'My Watchlist'
                : activeTab === 'history'
                ? 'Watch History'
                : activeTab === 'downloads'
                ? 'Offline Downloads'
                : 'My Anime Library'}
            </h1>
          </div>

          {/* Bento Tabs */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pt-1">
            {[
              { id: 'library', label: 'Library', count: libraryAnime.length },
              { id: 'watchlist', label: 'Watchlist', count: watchlistAnime.length },
              { id: 'history', label: 'History', count: continueWatching.length },
              { id: 'downloads', label: 'Downloads', count: 2 },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-lib-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.35)]'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Contents */}
      {activeTab === 'library' && (
        <section>
          {libraryAnime.length === 0 ? (
            <div className="bento-card text-center py-16 px-4">
              <span className="material-symbols-outlined text-5xl text-neutral-600 mb-3">video_library</span>
              <p className="text-sm font-bold text-white">Your Library is empty</p>
              <p className="text-xs text-neutral-400 mt-1">Add your favorite shows from Home or Explore</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {libraryAnime.map((anime) => (
                <div
                  key={anime.id}
                  id={`lib-card-${anime.id}`}
                  onClick={() => onSelectAnime(anime)}
                  className="bento-card p-3 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900">
                    <img
                      src={anime.posterUrl}
                      alt={anime.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-black/20 to-transparent flex flex-col justify-between p-2.5">
                      <div className="flex justify-between items-start">
                        <span className="bg-black/70 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          {anime.rating}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleLibrary(anime.id);
                          }}
                          className="size-7 rounded-lg bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 flex items-center justify-center text-rose-400 hover:scale-110 cursor-pointer"
                          title="Remove from Library"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>

                      <span className="text-[10px] text-neutral-300 font-medium">
                        {anime.format} • {anime.seasonsCount}S
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 px-1">
                    <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-1 group-hover:text-indigo-400 transition-colors">
                      {anime.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'watchlist' && (
        <section>
          {watchlistAnime.length === 0 ? (
            <div className="bento-card text-center py-16 px-4">
              <span className="material-symbols-outlined text-5xl text-neutral-600 mb-3">bookmark_border</span>
              <p className="text-sm font-bold text-white">No shows in Watchlist</p>
              <p className="text-xs text-neutral-400 mt-1">Bookmark series to watch later</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {watchlistAnime.map((anime) => (
                <div
                  key={anime.id}
                  id={`watchlist-card-${anime.id}`}
                  onClick={() => onSelectAnime(anime)}
                  className="bento-card p-3 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900">
                    <img
                      src={anime.posterUrl}
                      alt={anime.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-black/20 to-transparent flex flex-col justify-between p-2.5">
                      <div className="flex justify-between items-start">
                        <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {anime.genres[0]}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWatchlist(anime.id);
                          }}
                          className="size-7 rounded-lg bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 flex items-center justify-center text-indigo-400 hover:scale-110 cursor-pointer"
                          title="Remove from Watchlist"
                        >
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                            bookmark
                          </span>
                        </button>
                      </div>

                      <span className="text-[10px] text-neutral-300 font-medium">
                        {anime.year} • {anime.format}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 px-1">
                    <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-1 group-hover:text-indigo-400 transition-colors">
                      {anime.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'history' && (
        <section className="space-y-3">
          {continueWatching.map((item) => {
            const anime = animeList.find((a) => a.id === item.animeId) || animeList[0];
            return (
              <div
                key={item.episodeId}
                onClick={() => onPlayEpisode(anime)}
                className="bento-card p-4 flex items-center gap-4 cursor-pointer hover:border-indigo-500 transition-all duration-200"
              >
                <div className="relative w-32 aspect-video rounded-xl overflow-hidden shrink-0 bg-neutral-900 border border-neutral-800">
                  <img src={item.thumbnail} alt={item.episodeTitle} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-900">
                    <div className="h-full bg-indigo-500" style={{ width: `${item.progressPercent}%` }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{item.animeTitle}</h4>
                  <p className="text-xs text-neutral-300 truncate">{item.episodeTitle}</p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Watched {item.lastWatched} • {item.timeLeft} left
                  </p>
                </div>
                <button className="size-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </button>
              </div>
            );
          })}
        </section>
      )}

      {activeTab === 'downloads' && (
        <section className="space-y-3">
          <div className="bento-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="size-10 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">download_done</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Attack on Titan - S4 E12</h4>
                <p className="text-xs text-neutral-400">1080p FHD • 480 MB • Ready for Offline</p>
              </div>
            </div>
            <button
              onClick={() => onPlayEpisode(animeList[0])}
              className="px-4 py-2 rounded-xl gradient-btn text-xs font-bold"
            >
              Play
            </button>
          </div>

          <div className="bento-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="size-10 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">download_done</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Demon Slayer - S2 E7</h4>
                <p className="text-xs text-neutral-400">1080p FHD • 512 MB • Ready for Offline</p>
              </div>
            </div>
            <button
              onClick={() => onPlayEpisode(animeList.find((a) => a.id === 'demon-slayer') || animeList[0])}
              className="px-4 py-2 rounded-xl gradient-btn text-xs font-bold"
            >
              Play
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
