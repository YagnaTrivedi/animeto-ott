import React, { useState } from 'react';

interface ProfileScreenProps {
  onToast: (msg: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onToast }) => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [skipIntro, setSkipIntro] = useState(true);
  const [streamQuality, setStreamQuality] = useState('1080p');
  const [audioPref, setAudioPref] = useState<'sub' | 'dub'>('sub');

  return (
    <div id="profile-screen-container" className="min-h-screen pb-28 text-white max-w-6xl mx-auto px-4 space-y-6">
      {/* Header Bento Tile */}
      <section className="bento-card p-6">
        <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Account & Settings</span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">User Profile</h1>
        <p className="text-xs text-neutral-400 mt-1">Manage streaming preferences, audio profiles, and viewing history</p>
      </section>

      {/* User Bento Card */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bento-card md:col-span-2 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 relative overflow-hidden">
          <div className="size-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-xl shrink-0">
            <div className="w-full h-full rounded-2xl bg-neutral-950 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-indigo-400">person</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-black text-white truncate">Eren Yeager</h2>
              <span className="bg-indigo-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                VIP Sakuga Pass
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">eren.y@animeto.stream</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-block size-2 rounded-full bg-emerald-500"></span>
              <p className="text-[11px] text-emerald-400 font-semibold">Active Member • 4K HDR Enabled</p>
            </div>
          </div>
        </div>

        {/* Quick Bento Stats Badge */}
        <div className="bento-card p-6 flex flex-col justify-between space-y-3">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Membership Level</span>
          <div>
            <div className="text-2xl font-black text-white">Diamond Tier</div>
            <p className="text-xs text-indigo-400 font-semibold mt-0.5">Unlimited 4K & Offline Access</p>
          </div>
          <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[85%]" />
          </div>
        </div>
      </section>

      {/* Watch Stats Bento Grid */}
      <section className="grid grid-cols-3 gap-4">
        <div className="bento-card p-5 text-center">
          <p className="text-2xl sm:text-3xl font-black text-indigo-400">148h</p>
          <p className="text-[10px] sm:text-xs text-neutral-400 uppercase font-bold tracking-wider mt-1">Watch Time</p>
        </div>
        <div className="bento-card p-5 text-center">
          <p className="text-2xl sm:text-3xl font-black text-indigo-400">214</p>
          <p className="text-[10px] sm:text-xs text-neutral-400 uppercase font-bold tracking-wider mt-1">Episodes</p>
        </div>
        <div className="bento-card p-5 text-center">
          <p className="text-2xl sm:text-3xl font-black text-indigo-400">18</p>
          <p className="text-[10px] sm:text-xs text-neutral-400 uppercase font-bold tracking-wider mt-1">Completed</p>
        </div>
      </section>

      {/* Streaming Preferences Bento Tile */}
      <section className="bento-card p-6 space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Customization</span>
          <h3 className="text-lg font-bold text-white tracking-tight">Playback & Audio Settings</h3>
        </div>

        <div className="divide-y divide-neutral-800/80">
          {/* Audio Track Preference */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">Default Audio Track</p>
              <p className="text-xs text-neutral-400">Preferred soundtrack language for anime episodes</p>
            </div>
            <div className="flex bg-neutral-900 border border-neutral-800 p-1 rounded-xl shrink-0">
              <button
                onClick={() => {
                  setAudioPref('sub');
                  onToast('Default audio set to Japanese (Sub)');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  audioPref === 'sub' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Sub (JP)
              </button>
              <button
                onClick={() => {
                  setAudioPref('dub');
                  onToast('Default audio set to English (Dub)');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  audioPref === 'dub' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Dub (EN)
              </button>
            </div>
          </div>

          {/* Quality Preference */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">Default Streaming Quality</p>
              <p className="text-xs text-neutral-400">Auto adaptive resolution based on current network speed</p>
            </div>
            <select
              value={streamQuality}
              onChange={(e) => {
                setStreamQuality(e.target.value);
                onToast(`Default quality set to ${e.target.value}`);
              }}
              className="bg-neutral-900 text-indigo-300 font-bold text-xs px-3.5 py-2 rounded-xl border border-neutral-800 outline-none cursor-pointer hover:border-neutral-700"
            >
              <option value="4K">4K Ultra HD</option>
              <option value="1080p">1080p Full HD</option>
              <option value="720p">720p HD</option>
            </select>
          </div>

          {/* Auto-Play Next */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">Autoplay Next Episode</p>
              <p className="text-xs text-neutral-400">Seamlessly continue next episode when credits roll</p>
            </div>
            <button
              onClick={() => {
                setAutoPlay(!autoPlay);
                onToast(autoPlay ? 'Autoplay disabled' : 'Autoplay enabled');
              }}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                autoPlay ? 'bg-indigo-600' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`size-4 rounded-full bg-white absolute top-1 transition-transform ${
                  autoPlay ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Skip Intro Automatically */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">Auto Skip Intro</p>
              <p className="text-xs text-neutral-400">Bypass opening theme song and title cards</p>
            </div>
            <button
              onClick={() => {
                setSkipIntro(!skipIntro);
                onToast(skipIntro ? 'Auto-skip intro disabled' : 'Auto-skip intro enabled');
              }}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                skipIntro ? 'bg-indigo-600' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`size-4 rounded-full bg-white absolute top-1 transition-transform ${
                  skipIntro ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* App Information Bento Tile */}
      <section className="bento-card p-6 text-center space-y-1">
        <p className="text-xs font-bold text-indigo-400 tracking-wider uppercase">Animeto Streaming Platform</p>
        <p className="text-[11px] text-neutral-500">Version 2.4.0 • Built with Bento Grid architecture & high-fidelity video engine</p>
      </section>
    </div>
  );
};
