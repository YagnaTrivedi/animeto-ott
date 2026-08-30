import React, { useState } from 'react';
import { Anime, Episode } from '../types';

interface AnimeDetailScreenProps {
  anime: Anime;
  isInLibrary: boolean;
  isInWatchlist: boolean;
  onBack: () => void;
  onPlayEpisode: (anime: Anime, episodeIndex?: number, episode?: Episode) => void;
  onToggleLibrary: (animeId: string) => void;
  onToggleWatchlist: (animeId: string) => void;
}

export const AnimeDetailScreen: React.FC<AnimeDetailScreenProps> = ({
  anime,
  isInLibrary,
  isInWatchlist,
  onBack,
  onPlayEpisode,
  onToggleLibrary,
  onToggleWatchlist,
}) => {
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(
    anime.seasons[0]?.seasonNumber || 1
  );

  const activeSeason =
    anime.seasons.find((s) => s.seasonNumber === selectedSeasonNumber) ||
    anime.seasons[0];

  return (
    <div id="anime-detail-screen" className="min-h-screen pb-28 text-white max-w-6xl mx-auto px-4 space-y-6">
      {/* Top Bento Header & Artwork Tile */}
      <section className="bento-card relative overflow-hidden min-h-[380px] sm:min-h-[460px] p-6 sm:p-8 flex flex-col justify-between group">
        {/* Background Artwork */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${anime.bannerUrl}')` }}
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-transparent to-transparent hidden md:block" />

        {/* Top Controls */}
        <div className="relative z-10 flex justify-between items-center gap-2">
          <button
            onClick={onBack}
            className="bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 hover:bg-neutral-800 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back
          </button>

          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              {anime.rating}
            </span>

            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {anime.year} • {anime.format}
            </span>
          </div>
        </div>

        {/* Bottom Poster + Identity Split */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-5 items-start sm:items-end pt-8">
          <div className="w-28 sm:w-36 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-neutral-700/80 flex-shrink-0 bg-neutral-900">
            <img
              src={anime.posterUrl}
              alt={anime.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex gap-2 flex-wrap">
              {anime.genres.map((g) => (
                <span
                  key={g}
                  className="bg-neutral-900/80 backdrop-blur-md text-neutral-300 text-[11px] font-medium px-2.5 py-0.5 rounded-lg border border-neutral-800"
                >
                  {g}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
              {anime.title}
            </h1>

            <p className="text-xs text-neutral-400 font-medium">
              {anime.originalTitle && <span className="mr-2 italic">{anime.originalTitle}</span>}
              {anime.seasonsCount} Seasons • {anime.totalEpisodes} Total Episodes
            </p>
          </div>
        </div>
      </section>

      {/* Bento Middle Split: Synopsis, Specs & Action Controls */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Synopsis & Actions Tile (2 cols on desktop) */}
        <div className="lg:col-span-2 bento-card p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Story Overview</span>
            <h3 className="text-lg font-bold text-white">Synopsis & Premise</h3>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              {anime.synopsis}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-2">
            <button
              id="btn-detail-start-watching"
              onClick={() => onPlayEpisode(anime, 0, activeSeason?.episodes[0])}
              className="gradient-btn px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 cursor-pointer text-sm font-bold flex-1 sm:flex-initial"
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
              Start Watching (S1 E1)
            </button>

            <button
              id="btn-detail-toggle-library"
              onClick={() => onToggleLibrary(anime.id)}
              className={`px-4 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer border flex-1 sm:flex-initial backdrop-blur-md ${
                isInLibrary
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                  : 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isInLibrary ? 'bookmark_added' : 'bookmark_add'}
              </span>
              {isInLibrary ? 'In Library' : 'Add to Library'}
            </button>

            <button
              id="btn-detail-toggle-watchlist"
              onClick={() => onToggleWatchlist(anime.id)}
              className={`px-4 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer border flex-1 sm:flex-initial backdrop-blur-md ${
                isInWatchlist
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                  : 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: isInWatchlist ? "'FILL' 1" : "'FILL' 0" }}
              >
                bookmark
              </span>
              {isInWatchlist ? 'Saved' : 'Watchlist'}
            </button>
          </div>
        </div>

        {/* Anime Specs Bento Card */}
        <div className="bento-card p-6 space-y-4 bg-neutral-900">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Broadcast Info</span>
          <h3 className="text-lg font-bold text-white">Stream Details</h3>

          <div className="space-y-3 pt-1 text-xs">
            <div className="flex justify-between py-1 border-b border-neutral-800">
              <span className="text-neutral-400">Audio Tracks</span>
              <span className="text-white font-medium">Japanese / English (Dual)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-800">
              <span className="text-neutral-400">Subtitles</span>
              <span className="text-white font-medium">English, Spanish, German</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-800">
              <span className="text-neutral-400">Video Quality</span>
              <span className="text-indigo-400 font-semibold">4K Ultra HD HDR</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-800">
              <span className="text-neutral-400">Studio</span>
              <span className="text-white font-medium">{anime.studio || 'MAPPA / Wit Studio'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Rating</span>
              <span className="text-emerald-400 font-semibold">{anime.rating} / 10 Score</span>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Bento Card Container */}
      <section className="bento-card p-6 space-y-5">
        {/* Season Selector Tabs */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-neutral-800">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {anime.seasons.map((season) => {
              const isSelected = selectedSeasonNumber === season.seasonNumber;
              return (
                <button
                  key={season.seasonNumber}
                  id={`tab-season-${season.seasonNumber}`}
                  onClick={() => setSelectedSeasonNumber(season.seasonNumber)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.35)]'
                      : 'bg-neutral-800/60 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {season.title}
                </button>
              );
            })}
          </div>

          <span className="text-xs text-neutral-400">
            {activeSeason?.episodes.length} Episodes in Season
          </span>
        </div>

        {/* Episode Bento Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeSeason?.episodes.map((ep, idx) => {
            return (
              <div
                key={ep.id}
                id={`episode-card-${ep.id}`}
                onClick={() => onPlayEpisode(anime, idx, ep)}
                className="bg-neutral-950/70 border border-neutral-800 hover:border-indigo-500/70 rounded-2xl p-3 flex flex-col justify-between group cursor-pointer transition-all duration-200"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 mb-3">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${ep.thumbnail}')` }}
                  />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                      <span
                        className="material-symbols-outlined text-white text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {ep.progressPercent !== undefined && ep.progressPercent > 0 && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-900">
                      <div
                        className="h-full bg-indigo-500"
                        style={{ width: `${ep.progressPercent}%` }}
                      />
                    </div>
                  )}

                  {/* Watched Checkmark */}
                  {ep.watched && (
                    <div className="absolute top-2 right-2 bg-neutral-950/80 rounded-lg px-2 py-0.5 backdrop-blur-sm shadow border border-neutral-700 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      Watched
                    </div>
                  )}
                </div>

                <div className="px-1">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-white truncate group-hover:text-indigo-400 transition-colors">
                      {ep.title}
                    </h4>
                    <span className="text-neutral-400 text-[11px] font-medium whitespace-nowrap bg-neutral-900 px-2 py-0.5 rounded-md border border-neutral-800">
                      {ep.duration}
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {ep.synopsis}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
