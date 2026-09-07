import React, { useState, useEffect, useRef } from 'react';
import { Anime, Episode } from '../types';

interface VideoPlayerScreenProps {
  anime: Anime;
  initialEpisode?: Episode;
  onBack: (seasonNumber?: number) => void;
  onSelectEpisode: (episode: Episode) => void;
  onToast: (msg: string) => void;
}

export const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({
  anime,
  initialEpisode,
  onBack,
  onSelectEpisode,
  onToast,
}) => {
  // Find initial episode or default to Season 4 Ep 12 (if AoT) or S1 Ep 1
  const defaultEpisode =
    initialEpisode ||
    anime.seasons.flatMap((s) => s.episodes).find((e) => e.id === 'aot-s4-e12') ||
    anime.seasons[0]?.episodes[0];

  const [currentEpisode, setCurrentEpisode] = useState<Episode>(defaultEpisode);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(134); // ~02:14
  const duration = 1440; // 24:00 (1440 seconds)
  const [audioTrack, setAudioTrack] = useState<'sub' | 'dub'>('sub');
  const [quality, setQuality] = useState<'1080p' | '4K' | '720p'>('1080p');
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // All episodes from all seasons for list
  const allEpisodes = anime.seasons.flatMap((s) => s.episodes);
  const currentIndex = allEpisodes.findIndex((e) => e.id === currentEpisode.id);
  const nextEpisode = currentIndex >= 0 && currentIndex < allEpisodes.length - 1
    ? allEpisodes[currentIndex + 1]
    : allEpisodes[0];

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Controls auto-hide
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 4000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSkipIntro = () => {
    const target = currentEpisode.introEnd && currentEpisode.introEnd > currentTime
      ? currentEpisode.introEnd
      : Math.min(currentTime + 90, duration);
    setCurrentTime(target);
    onToast(`Skipped to ${formatTime(target)}`);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercent = Number(e.target.value);
    const newTime = (newPercent / 100) * duration;
    setCurrentTime(newTime);
  };

  const handleSwitchEpisode = (ep: Episode) => {
    setCurrentEpisode(ep);
    setCurrentTime(0);
    setIsPlaying(true);
    onSelectEpisode(ep);
    onToast(`Now playing: ${ep.title}`);
  };

  const progressPercent = (currentTime / duration) * 100;

  return (
    <div
      id="video-player-container"
      className="min-h-screen pb-28 text-white max-w-6xl mx-auto px-4 space-y-6"
      onMouseMove={handleMouseMove}
    >
      {/* Bento Top Stage Tile */}
      <section className="bento-card overflow-hidden p-0 border border-neutral-800 relative group shadow-2xl">
        {/* Floating Top Bar */}
        <div className="absolute top-0 left-0 z-50 p-4 w-full bg-gradient-to-b from-neutral-950/90 via-neutral-950/40 to-transparent flex justify-between items-center pointer-events-none">
          <button
            id="btn-player-back"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBack(currentEpisode.seasonNumber);
            }}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 text-white text-xs font-semibold hover:bg-neutral-800 cursor-pointer shadow-lg active:scale-95 z-50"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back
          </button>

          <span className="text-xs font-semibold text-white/90 drop-shadow truncate max-w-xs px-2 pointer-events-auto">
            {anime.title} • S{currentEpisode.seasonNumber} E{currentEpisode.episodeNumber}
          </span>
        </div>

        {/* 16:9 Video Canvas / Stage Area */}
        <div className="relative w-full aspect-video bg-black shrink-0 overflow-hidden select-none">
          {/* Animated Visual Backdrop */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
            style={{
              backgroundImage: `url('${currentEpisode.thumbnail || anime.bannerUrl}')`,
              filter: isPlaying ? 'brightness(0.95)' : 'brightness(0.7)',
            }}
          />

          {/* Ambient Subtle Video Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/40 pointer-events-none" />

          {/* Play/Pause Center Tap Target */}
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {!isPlaying && (
              <div className="size-16 rounded-full bg-indigo-600 text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center transition-transform active:scale-95">
                <span
                  className="material-symbols-outlined text-4xl ml-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </div>
            )}
          </div>

          {/* Skip Intro Button */}
          <div className="absolute right-4 bottom-20 z-20">
            <button
              id="btn-player-skip-intro"
              onClick={handleSkipIntro}
              className="bg-neutral-900/80 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-xl border border-neutral-700 hover:border-indigo-500 hover:text-indigo-300 transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              Skip Intro (90s)
            </button>
          </div>

          {/* HUD Controls Overlay */}
          <div
            className={`absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-neutral-950/95 via-transparent to-neutral-950/40 transition-opacity duration-300 pointer-events-auto ${
              showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Top Controls Bar */}
            <div className="flex justify-end items-start pt-12 gap-3 relative z-30">
              {/* Subtitles toggle */}
              <button
                onClick={() => {
                  const nextLang = audioTrack === 'sub' ? 'dub' : 'sub';
                  setAudioTrack(nextLang);
                  onToast(`Audio switched to ${nextLang.toUpperCase()}`);
                }}
                className="text-neutral-300 hover:text-white transition-colors p-1.5 rounded-lg bg-neutral-900/80 border border-neutral-700 cursor-pointer"
                title="Toggle Subtitles/Dub"
              >
                <span className="material-symbols-outlined text-lg">closed_caption</span>
              </button>

              {/* Quality Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  className="text-white hover:text-indigo-300 transition-colors text-xs font-bold px-3 py-1.5 bg-neutral-900/80 backdrop-blur-md rounded-xl border border-neutral-700 cursor-pointer"
                >
                  {quality}
                </button>

                {showQualityMenu && (
                  <div className="absolute right-0 top-full mt-1.5 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl py-1.5 z-40 w-28">
                    {(['4K', '1080p', '720p'] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setQuality(q);
                          setShowQualityMenu(false);
                          onToast(`Stream quality set to ${q}`);
                        }}
                        className={`block w-full text-left px-3 py-1.5 text-xs cursor-pointer ${
                          quality === q ? 'text-indigo-400 font-bold bg-neutral-800' : 'text-neutral-300 hover:bg-neutral-800/60'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex flex-col gap-2.5">
              {/* Scrubber & Timestamps */}
              <div className="flex items-center gap-3 w-full">
                <span className="text-xs text-neutral-300 font-mono min-w-[38px]">
                  {formatTime(currentTime)}
                </span>

                <input
                  id="player-progress-bar"
                  type="range"
                  min="0"
                  max="100"
                  value={progressPercent}
                  onChange={handleSeek}
                  className="w-full h-1.5 progress-bar outline-none cursor-pointer accent-indigo-500"
                />

                <span className="text-xs text-neutral-400 font-mono min-w-[38px]">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Buttons Row */}
              <div className="flex items-center justify-between w-full pt-1">
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* Play / Pause */}
                  <button
                    id="btn-player-play-toggle"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    <span
                      className="material-symbols-outlined text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>

                  {/* Replay 10s */}
                  <button
                    id="btn-player-replay-10"
                    onClick={() => {
                      setCurrentTime((prev) => Math.max(prev - 10, 0));
                      onToast('Replay 10s');
                    }}
                    className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Rewind 10s"
                  >
                    <span className="material-symbols-outlined text-2xl">replay_10</span>
                  </button>

                  {/* Forward 10s */}
                  <button
                    id="btn-player-forward-10"
                    onClick={() => {
                      setCurrentTime((prev) => Math.min(prev + 10, duration));
                      onToast('Forward 10s');
                    }}
                    className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Forward 10s"
                  >
                    <span className="material-symbols-outlined text-2xl">forward_10</span>
                  </button>

                  {/* Volume Mute Toggle */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-neutral-300 hover:text-white transition-colors cursor-pointer ml-1"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {isMuted ? 'volume_off' : 'volume_up'}
                    </span>
                  </button>
                </div>

                {/* Fullscreen Button */}
                <button
                  id="btn-player-fullscreen"
                  onClick={() => onToast('Fullscreen toggled')}
                  className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <span className="material-symbols-outlined text-2xl">fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Middle Split: Episode Info & Up Next Tile */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Episode Info Tile (2 cols) */}
        <div className="md:col-span-2 bento-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                Season {currentEpisode.seasonNumber} • Episode {currentEpisode.episodeNumber}
              </span>
              <span className="text-xs text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-800">
                {currentEpisode.duration}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white mb-2">
              {currentEpisode.title}
            </h1>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              {currentEpisode.synopsis}
            </p>
          </div>

          {/* Audio Language Selector */}
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-800">
            <span className="text-xs text-neutral-400 mr-1">Audio:</span>
            <button
              onClick={() => {
                setAudioTrack('sub');
                onToast('Switched to Japanese (Sub)');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                audioTrack === 'sub'
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.35)]'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              Japanese (Sub)
            </button>

            <button
              onClick={() => {
                setAudioTrack('dub');
                onToast('Switched to English (Dub)');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                audioTrack === 'dub'
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.35)]'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              English (Dub)
            </button>
          </div>
        </div>

        {/* Up Next Bento Tile */}
        {nextEpisode && (
          <div
            id="player-up-next-card"
            onClick={() => handleSwitchEpisode(nextEpisode)}
            className="bento-card p-6 flex flex-col justify-between group cursor-pointer relative overflow-hidden bg-neutral-900"
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Up Next</span>
              <h3 className="text-base font-bold text-white line-clamp-2 mt-1 group-hover:text-indigo-400 transition-colors">
                {nextEpisode.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">Episode {nextEpisode.episodeNumber} • {nextEpisode.duration}</p>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950 mt-4 border border-neutral-800">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${nextEpisode.thumbnail}')` }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Bento Playlist Section */}
      <section className="bento-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <h2 className="text-lg font-bold text-white">All Episodes ({allEpisodes.length})</h2>
          <span className="text-xs text-neutral-400">Select to play instantly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allEpisodes.map((ep) => {
            const isActive = ep.id === currentEpisode.id;

            return (
              <div
                key={ep.id}
                id={`player-episode-item-${ep.id}`}
                onClick={() => handleSwitchEpisode(ep)}
                className={`p-3 rounded-2xl border transition-all duration-200 flex gap-3 items-center cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                    : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative w-24 aspect-video rounded-xl overflow-hidden shrink-0 bg-neutral-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${ep.thumbnail}')` }}
                  />

                  {isActive && (
                    <div className="absolute inset-0 bg-indigo-950/70 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        equalizer
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase">
                    E{ep.episodeNumber}
                  </span>
                  <h4 className={`text-xs font-bold truncate ${isActive ? 'text-indigo-300' : 'text-white'}`}>
                    {ep.title}
                  </h4>
                  <p className="text-[10px] text-neutral-400">{ep.duration}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
