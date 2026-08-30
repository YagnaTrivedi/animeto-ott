import React from 'react';
import { NavScreen } from '../types';

interface BottomNavBarProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentScreen, onNavigate }) => {
  if (currentScreen === 'player') {
    return null;
  }

  const navItems: { id: NavScreen; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'dashboard' },
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'library', label: 'Library', icon: 'video_library' },
    { id: 'watchlist', label: 'Watchlist', icon: 'bookmark' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-lg bg-neutral-900/85 backdrop-blur-2xl border border-neutral-800 rounded-2xl p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
    >
      <div className="flex justify-between items-center gap-1">
        {navItems.map((item) => {
          const isActive =
            currentScreen === item.id ||
            (currentScreen === 'detail' && item.id === 'explore');

          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-2 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-[0_0_15px_rgba(99,102,241,0.35)]'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400",
                }}
              >
                {item.icon}
              </span>
              <span className="text-[11px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
