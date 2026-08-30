import React, { useState } from 'react';
import { Anime, WatchHistoryItem } from '../types';

interface HomeScreenProps {
  animeList: Anime[];
  continueWatching: WatchHistoryItem[];
  libraryIds: Set<string>;
  onSelectAnime: (anime: Anime) => void;
  onPlayEpisode: (anime: Anime, episodeIndex?: number) => void;
  onToggleLibrary: (animeId: string) => void;
  onGenreSelect: (genre: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  animeList,
  continueWatching,
  libraryIds,
  onSelectAnime,
  onPlayEpisode,
  onToggleLibrary,
  onGenreSelect,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  // Featured anime (Attack on Titan)
  const featuredAnime =
    animeList.find((a) => a.id === 'attack-on-titan') || animeList[0];

  // Trending anime sorted by rank
  const trendingAnime = animeList
    .filter((a) => a.trendingRank !== undefined)
    .sort((a, b) => (a.trendingRank || 0) - (b.trendingRank || 0));

  // Fallback if less than 3
  const displayTrending =
    trendingAnime.length >= 3
      ? trendingAnime
      : [
          ...trendingAnime,
          ...animeList.filter((a) => a.id !== featuredAnime.id && !a.trendingRank),
        ].slice(0, 4);

  // New releases
  const newReleases = animeList.filter((a) => a.newRelease || a.badge?.includes('New'));

  // Popular anime
  const popularAnime = animeList.filter(
    (a) =>
      a.popular ||
      a.id === 'monster' ||
      a.id === 'your-name' ||
      a.id === 'cowboy-bebop' ||
      a.id === 'solo-leveling' ||
      a.id === 'shadow-of-the-erdtree'
  );

  const genres = [
    'All',
    'Action',
    'Dark Fantasy',
    'Adventure',
    'Sci-Fi',
    'Comedy',
    'Romance',
    'Supernatural',
    'Mecha',
    'Thriller',
  ];

  const isFeaturedInLibrary = libraryIds.has(featuredAnime.id);

  return (
    <div id="home-screen-container" className="min-h-screen pb-28 text-white px-4 max-w-6xl mx-auto space-y-6">
      {/* Top Bento Dashboard Grid */}
      <section id="hero-featured-section" className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Hero Bento Tile (Spans 2 columns) */}
        <div className="lg:col-span-2 bento-card relative overflow-hidden min-h-[440px] sm:min-h-[500px] flex flex-col justify-between p-6 sm:p-8 group">
          {/* Background Artwork */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${featuredAnime.bannerUrl}')` }}
          />

          {/* Neutral Bento Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent hidden sm:block" />

          {/* Top Pill Badges */}
          <div className="relative z-10 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span
                id="hero-featured-badge"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                Featured Premiere
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                {featuredAnime.rating}
              </span>
            </div>

            <span className="text-neutral-300 text-xs font-medium bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-800 hidden sm:inline-block">
              {featuredAnime.year} • {featuredAnime.totalEpisodes} Episodes
            </span>
          </div>

          {/* Bottom Content Information */}
          <div className="relative z-10 space-y-3 pt-12">
            <div className="flex gap-2 flex-wrap">
              {featuredAnime.genres.slice(0, 3).map((g) => (
                <span
                  key={g}
                  className="bg-neutral-900/80 backdrop-blur-md text-neutral-300 text-[11px] font-medium px-2.5 py-0.5 rounded-lg border border-neutral-800"
                >
                  {g}
                </span>
              ))}
            </div>

            <h1
              id="hero-anime-title"
              onClick={() => onSelectAnime(featuredAnime)}
              className="text-2xl sm:text-4xl font-black text-white tracking-tight cursor-pointer hover:text-indigo-400 transition-colors"
            >
              {featuredAnime.title}
            </h1>

            <p className="text-neutral-300 text-xs sm:text-sm line-clamp-2 max-w-xl leading-relaxed">
              {featuredAnime.synopsis}
            </p>

            {/* Hero Actions */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-2">
              <button
                id="btn-hero-watch-now"
                onClick={() => onPlayEpisode(featuredAnime, 0)}
                className="gradient-btn px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 cursor-pointer text-sm font-bold flex-1 sm:flex-initial"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
                Watch Now
              </button>

              <button
                id="btn-hero-add-library"
                onClick={() => onToggleLibrary(featuredAnime.id)}
                className={`px-5 py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 cursor-pointer text-sm font-semibold border flex-1 sm:flex-initial backdrop-blur-md ${
                  isFeaturedInLibrary
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                    : 'bg-neutral-900/80 border-neutral-700 text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isFeaturedInLibrary ? 'bookmark_added' : 'bookmark_add'}
                </span>
                {isFeaturedInLibrary ? 'In Library' : 'Save to Library'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Bento Mini-Tiles (1 column with 2 stacked bento cards) */}
        <div className="flex flex-col gap-5">
          {/* Bento Tile: Weekly Simulcast & Pro Feature */}
          <div className="bento-card p-6 flex flex-col justify-between bg-gradient-to-br from-indigo-950/40 via-neutral-900 to-neutral-900 relative overflow-hidden flex-1">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Stream Engine</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Ultra 4K Sakuga</h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-400">Audio Sync</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Dolby Atmos Active
                </span>
              </div>
              <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full w-[88%]" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>Next Simulcast Episode</span>
              <span className="font-semibold text-white">In 2h 45m</span>
            </div>
          </div>

          {/* Bento Tile: Community Watch Party */}
          <div className="bento-card p-6 flex flex-col justify-between flex-1 bg-neutral-900">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Live Together</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Anime Watch Room</h3>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                1.4k Live
              </span>
            </div>

            <p className="text-xs text-neutral-400 mt-2">
              Join synchronized Japanese audio streams with live chat reactions and sakuga breakdown.
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-indigo-500 border-2 border-neutral-900 flex items-center justify-center text-[10px] font-bold">L</div>
                <div className="w-7 h-7 rounded-full bg-rose-500 border-2 border-neutral-900 flex items-center justify-center text-[10px] font-bold">M</div>
                <div className="w-7 h-7 rounded-full bg-amber-500 border-2 border-neutral-900 flex items-center justify-center text-[10px] font-bold">K</div>
                <div className="w-7 h-7 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-[10px] text-neutral-400 font-bold">+8</div>
              </div>

              <button
                onClick={() => onPlayEpisode(featuredAnime, 1)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                Join Room
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Genre Filter Bento Bar */}
      <section id="genre-filter-section" className="bento-card p-3 overflow-hidden">
        <div className="flex overflow-x-auto gap-2 hide-scrollbar">
          {genres.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <button
                key={genre}
                id={`genre-filter-btn-${genre.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  setSelectedGenre(genre);
                  if (genre !== 'All') {
                    onGenreSelect(genre);
                  }
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold shadow-[0_0_15px_rgba(99,102,241,0.35)]'
                    : 'bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-transparent'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </section>

      {/* Continue Watching Bento Shelf */}
      {continueWatching.length > 0 && (
        <section id="continue-watching-section" className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400 text-lg">history</span>
              Continue Watching
            </h3>
            <span className="text-xs text-neutral-400 font-medium">Auto-sync active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {continueWatching.map((item) => {
              const matchedAnime =
                animeList.find((a) => a.id === item.animeId) || featuredAnime;

              return (
                <div
                  key={item.episodeId}
                  id={`continue-card-${item.animeId}`}
                  onClick={() => onPlayEpisode(matchedAnime)}
                  className="bento-card p-3 flex flex-col justify-between group cursor-pointer hover:border-neutral-700"
                >
                  <div
                    className="relative h-36 rounded-2xl overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.thumbnail}')` }}
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                        <span
                          className="material-symbols-outlined text-white text-2xl"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          play_arrow
                        </span>
                      </div>
                    </div>

                    {/* Bento Progress Bar */}
                    <div className="absolute bottom-2 left-3 right-3 h-1.5 bg-neutral-900/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${item.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 px-1 flex justify-between items-center">
                    <div className="pr-2 truncate">
                      <h4 className="font-semibold text-sm text-white truncate group-hover:text-indigo-400 transition-colors">
                        {item.animeTitle}
                      </h4>
                      <p className="text-xs text-neutral-400 font-normal mt-0.5">
                        S{item.seasonNumber} • Ep {item.episodeNumber} • {item.timeLeft}
                      </p>
                    </div>
                    <span className="text-[11px] text-indigo-300 font-medium bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-1 rounded-lg flex-shrink-0">
                      Resume
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Trending Now Bento Shelf */}
      <section id="trending-now-section" className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-lg">trending_up</span>
            Trending Sakuga Hits
          </h3>
          <span className="text-xs text-neutral-400 font-medium">Updated 10m ago</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {displayTrending.map((anime, index) => {
            const rankFormatted = String(index + 1).padStart(2, '0');
            return (
              <div
                key={anime.id}
                id={`trending-card-${anime.id}`}
                onClick={() => onSelectAnime(anime)}
                className="bento-card p-3 relative group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900">
                  <img
                    src={anime.posterUrl}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Bento Index Badge */}
                  <div className="absolute top-2 left-2 bg-neutral-950/80 backdrop-blur-md border border-neutral-700/60 text-white text-[11px] font-black px-2 py-0.5 rounded-lg">
                    #{rankFormatted}
                  </div>

                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {anime.rating}
                  </div>
                </div>

                <div className="pt-2 px-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
                    {anime.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-medium truncate mt-0.5">
                    {anime.genres.slice(0, 2).join(' • ')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* New Releases & Popular Bento Grid Split */}
      <section id="new-releases-section" className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Bento: New Simulcasts */}
        <div className="bento-card p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400 text-lg">fiber_new</span>
              New Weekly Episodes
            </h3>
            <span className="text-xs text-neutral-400">This Season</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {newReleases.slice(0, 4).map((anime) => (
              <div
                key={anime.id}
                id={`new-release-card-${anime.id}`}
                onClick={() => onSelectAnime(anime)}
                className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-2.5 hover:border-neutral-700 cursor-pointer group transition-all"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-neutral-900">
                  <img
                    src={anime.bannerUrl || anime.posterUrl}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {anime.badge && (
                    <div className="absolute top-1.5 left-1.5 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                      {anime.badge}
                    </div>
                  )}
                </div>

                <div className="pt-2 px-0.5">
                  <p className="text-white text-xs font-semibold truncate group-hover:text-indigo-400">
                    {anime.title}
                  </p>
                  <p className="text-neutral-400 text-[10px] mt-0.5">
                    Ep {anime.totalEpisodes} • {anime.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Bento: Popular All Time */}
        <div className="bento-card p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-400 text-lg">local_fire_department</span>
              Hall of Fame Series
            </h3>
            <span className="text-xs text-neutral-400">Top Rated</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {popularAnime.slice(0, 4).map((anime) => (
              <div
                key={anime.id}
                id={`popular-card-${anime.id}`}
                onClick={() => onSelectAnime(anime)}
                className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-2.5 hover:border-neutral-700 cursor-pointer group transition-all"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-neutral-900">
                  <img
                    src={anime.bannerUrl || anime.posterUrl}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-1.5 right-1.5 bg-neutral-950/80 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {anime.rating}
                  </div>
                </div>

                <div className="pt-2 px-0.5">
                  <p className="text-white text-xs font-semibold truncate group-hover:text-indigo-400">
                    {anime.title}
                  </p>
                  <p className="text-neutral-400 text-[10px] mt-0.5">
                    {anime.seasonsCount} Seasons • {anime.genres[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
