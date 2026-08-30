import React from 'react';
import { NavScreen } from '../types';

interface TopHeaderProps {
  currentScreen: NavScreen;
  title?: string;
  onBack?: () => void;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentScreen,
  title = 'Animeto',
  onBack,
  onSearchClick,
  onProfileClick,
}) => {
  if (currentScreen === 'player') {
    return null;
  }

  const isDetail = currentScreen === 'detail';

  return (
    <header
      id="top-app-header"
      className="sticky top-0 z-40 w-full px-4 pt-3 pb-2 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between bg-neutral-900/70 backdrop-blur-xl border border-neutral-800 rounded-2xl px-4 py-3 shadow-lg">
        {/* Left Side */}
        {isDetail ? (
          <button
            id="btn-header-back"
            onClick={onBack}
            className="text-neutral-400 hover:text-white p-2 rounded-xl hover:bg-neutral-800/60 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
            aria-label="Back"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span className="text-xs font-medium hidden sm:inline">Back</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 cursor-pointer" onClick={onSearchClick}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-base text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              A
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
                Animeto <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-md font-medium">Bento</span>
              </span>
            </div>
          </div>
        )}

        {/* Center Title */}
        <h1
          id="header-brand-title"
          className="font-bold text-base sm:text-lg tracking-tight text-white text-center flex-1 sm:flex-initial"
        >
          {isDetail ? 'Anime Details' : title}
        </h1>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          {!isDetail && (
            <button
              id="btn-header-menu"
              onClick={onSearchClick}
              className="text-neutral-400 hover:text-white p-2 rounded-xl hover:bg-neutral-800/80 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          )}

          <button
            id="btn-header-profile"
            onClick={onProfileClick}
            className="flex items-center gap-2.5 pl-2 pr-1.5 py-1.5 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700/60 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Profile"
          >
            <div className="text-right hidden md:block leading-tight">
              <p className="text-[10px] text-neutral-400 font-medium">Sakuga Pro</p>
              <p className="text-xs font-semibold text-white">Eren Y.</p>
            </div>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow">
              <span className="material-symbols-outlined text-base">person</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
