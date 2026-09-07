import React, { useState, useMemo } from 'react';
import { Anime } from '../types';

interface ExploreScreenProps {
  animeList: Anime[];
  initialGenre?: string;
  onSelectAnime: (anime: Anime) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  animeList,
  initialGenre = 'All',
  onSelectAnime,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Trending' | 'Popular' | 'New Releases' | 'Highest Rated'>('All');
  const [selectedGenre, setSelectedGenre] = useState<string>(initialGenre);
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [showGenreMenu, setShowGenreMenu] = useState(false);
  const [showYearMenu, setShowYearMenu] = useState(false);
  const [showSeasonMenu, setShowSeasonMenu] = useState(false);

  const tabs: ('All' | 'Trending' | 'Popular' | 'New Releases' | 'Highest Rated')[] = [
    'All',
    'Trending',
    'Popular',
    'New Releases',
    'Highest Rated',
  ];

  const genresList = [
    'All',
    'Action',
    'Dark Fantasy',
    'Cyberpunk',
    'Sci-Fi',
    'Mecha',
    'Romance',
    'Supernatural',
    'Adventure',
    'Comedy',
    'Psychological',
  ];

  const yearsList = ['All', '2024', '2023', '2022', '2020', '2019', '2016', '2013', '2000s', '1990s'];
  const seasonsList = ['All', 'Winter 2024', 'Spring 2024', 'Summer 2024', 'Fall 2024'];

  const filteredAnime = useMemo(() => {
    return animeList.filter((anime) => {
      // Search matching across title, alternative titles, description, studio, genres, and type
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = anime.title.toLowerCase().includes(q);
        const matchesAlternative = anime.alternativeTitles?.some((t) => t.toLowerCase().includes(q)) ?? false;
        const matchesOriginal = anime.originalTitle?.toLowerCase().includes(q) ?? false;
        const matchesGenre = anime.genres.some((g) => g.toLowerCase().includes(q));
        const matchesSynopsis = (anime.description || anime.synopsis || '').toLowerCase().includes(q);
        const matchesStudio = anime.studio?.toLowerCase().includes(q) ?? false;
        const matchesType = anime.type?.toLowerCase().includes(q) ?? false;

        if (
          !matchesTitle &&
          !matchesAlternative &&
          !matchesOriginal &&
          !matchesGenre &&
          !matchesSynopsis &&
          !matchesStudio &&
          !matchesType
        ) {
          return false;
        }
      }

      // Tab filtering using centralized boolean and rank flags
      if (activeTab === 'Trending') {
        if (!anime.trending && !anime.trendingRank && anime.badge !== 'Trending') return false;
      } else if (activeTab === 'Popular') {
        if (!anime.popular && anime.rating < 8.8) return false;
      } else if (activeTab === 'New Releases') {
        if (!anime.newRelease && anime.year < 2023 && !anime.badge?.includes('New')) return false;
      } else if (activeTab === 'Highest Rated') {
        if (anime.rating < 8.9) return false;
      }

      // Genre dropdown filter
      if (selectedGenre !== 'All') {
        if (!anime.genres.includes(selectedGenre)) return false;
      }

      // Year dropdown filter
      if (selectedYear !== 'All') {
        if (selectedYear === '2000s') {
          if (anime.year < 2000 || anime.year > 2009) return false;
        } else if (selectedYear === '1990s') {
          if (anime.year < 1990 || anime.year > 1999) return false;
        } else {
          if (anime.year !== Number(selectedYear)) return false;
        }
      }

      // Season dropdown filter
      if (selectedSeason !== 'All') {
        if (!anime.season?.toLowerCase().includes(selectedSeason.toLowerCase())) return false;
      }

      return true;
    });
  }, [animeList, searchQuery, activeTab, selectedGenre, selectedYear, selectedSeason]);

  return (
    <div id="explore-screen-container" className="min-h-screen pb-28 text-white max-w-6xl mx-auto px-4 space-y-6">
      {/* Bento Header & Search Module */}
      <section className="bento-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Database Catalog</span>
            <h1 id="explore-main-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Explore Anime Universe
            </h1>
          </div>
          <span className="text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-full w-max">
            {filteredAnime.length} Titles Found
          </span>
        </div>

        {/* Bento Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-neutral-400 text-xl">search</span>
          </div>
          <input
            id="input-explore-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anime title, studio, characters, genres..."
            className="block w-full pl-12 pr-10 py-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>

        {/* Bento Tab Pills */}
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar pt-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`tab-explore-${tab.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.35)]'
                    : 'bg-neutral-800/60 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-transparent'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {/* Genre Dropdown */}
          <div className="relative">
            <button
              id="dropdown-btn-genre"
              onClick={() => {
                setShowGenreMenu(!showGenreMenu);
                setShowYearMenu(false);
                setShowSeasonMenu(false);
              }}
              className={`w-full flex justify-between items-center px-3.5 py-2.5 bg-neutral-950 rounded-xl border transition-colors cursor-pointer text-xs ${
                selectedGenre !== 'All'
                  ? 'border-indigo-500 text-indigo-300 font-semibold'
                  : 'border-neutral-800 text-neutral-300 hover:border-neutral-700'
              }`}
            >
              <span className="truncate">{selectedGenre === 'All' ? 'Genre: All' : selectedGenre}</span>
              <span className="material-symbols-outlined text-xs shrink-0 ml-1 text-neutral-400">
                arrow_drop_down
              </span>
            </button>

            {showGenreMenu && (
              <div className="absolute top-full left-0 mt-1.5 w-48 max-h-56 overflow-y-auto bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl z-30 p-1.5 hide-scrollbar">
                {genresList.map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setSelectedGenre(g);
                      setShowGenreMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer ${
                      selectedGenre === g
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year Dropdown */}
          <div className="relative">
            <button
              id="dropdown-btn-year"
              onClick={() => {
                setShowYearMenu(!showYearMenu);
                setShowGenreMenu(false);
                setShowSeasonMenu(false);
              }}
              className={`w-full flex justify-between items-center px-3.5 py-2.5 bg-neutral-950 rounded-xl border transition-colors cursor-pointer text-xs ${
                selectedYear !== 'All'
                  ? 'border-indigo-500 text-indigo-300 font-semibold'
                  : 'border-neutral-800 text-neutral-300 hover:border-neutral-700'
              }`}
            >
              <span className="truncate">{selectedYear === 'All' ? 'Year: All' : selectedYear}</span>
              <span className="material-symbols-outlined text-xs shrink-0 ml-1 text-neutral-400">
                arrow_drop_down
              </span>
            </button>

            {showYearMenu && (
              <div className="absolute top-full left-0 mt-1.5 w-40 max-h-56 overflow-y-auto bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl z-30 p-1.5 hide-scrollbar">
                {yearsList.map((y) => (
                  <button
                    key={y}
                    onClick={() => {
                      setSelectedYear(y);
                      setShowYearMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer ${
                      selectedYear === y
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Season Dropdown */}
          <div className="relative">
            <button
              id="dropdown-btn-season"
              onClick={() => {
                setShowSeasonMenu(!showSeasonMenu);
                setShowGenreMenu(false);
                setShowYearMenu(false);
              }}
              className={`w-full flex justify-between items-center px-3.5 py-2.5 bg-neutral-950 rounded-xl border transition-colors cursor-pointer text-xs ${
                selectedSeason !== 'All'
                  ? 'border-indigo-500 text-indigo-300 font-semibold'
                  : 'border-neutral-800 text-neutral-300 hover:border-neutral-700'
              }`}
            >
              <span className="truncate">{selectedSeason === 'All' ? 'Season' : selectedSeason}</span>
              <span className="material-symbols-outlined text-xs shrink-0 ml-1 text-neutral-400">
                arrow_drop_down
              </span>
            </button>

            {showSeasonMenu && (
              <div className="absolute top-full right-0 mt-1.5 w-40 max-h-56 overflow-y-auto bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl z-30 p-1.5 hide-scrollbar">
                {seasonsList.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSeason(s);
                      setShowSeasonMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer ${
                      selectedSeason === s
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Filter Badges */}
        {(selectedGenre !== 'All' || selectedYear !== 'All' || selectedSeason !== 'All' || searchQuery) && (
          <div className="flex items-center gap-2 pt-1 flex-wrap border-t border-neutral-800">
            <span className="text-[11px] text-neutral-400">Active Filters:</span>
            {selectedGenre !== 'All' && (
              <span className="bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 text-[11px] px-2.5 py-0.5 rounded-lg flex items-center gap-1.5">
                {selectedGenre}
                <button onClick={() => setSelectedGenre('All')} className="hover:text-white cursor-pointer font-bold">×</button>
              </span>
            )}
            {selectedYear !== 'All' && (
              <span className="bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 text-[11px] px-2.5 py-0.5 rounded-lg flex items-center gap-1.5">
                {selectedYear}
                <button onClick={() => setSelectedYear('All')} className="hover:text-white cursor-pointer font-bold">×</button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-neutral-800 text-white text-[11px] px-2.5 py-0.5 rounded-lg flex items-center gap-1.5">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-white cursor-pointer font-bold">×</button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedGenre('All');
                setSelectedYear('All');
                setSelectedSeason('All');
                setSearchQuery('');
              }}
              className="text-[11px] text-rose-400 hover:underline cursor-pointer ml-1"
            >
              Reset all
            </button>
          </div>
        )}
      </section>

      {/* Bento Anime Grid */}
      <section>
        {filteredAnime.length === 0 ? (
          <div className="bento-card text-center py-16 px-4">
            <span className="material-symbols-outlined text-5xl text-neutral-600 mb-3">search_off</span>
            <p className="text-sm font-bold text-white">No anime matched your filters</p>
            <p className="text-xs text-neutral-400 mt-1">Try relaxing your search query or reset the genre filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('All');
                setSelectedYear('All');
                setActiveTab('All');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl gradient-btn text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div id="explore-anime-grid" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAnime.map((anime) => {
              return (
                <div
                  key={anime.id}
                  id={`anime-explore-card-${anime.id}`}
                  onClick={() => onSelectAnime(anime)}
                  className="bento-card p-3 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900">
                    <img
                      src={anime.posterUrl}
                      alt={anime.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-black/20 to-transparent flex flex-col justify-between p-2.5">
                      {/* Top Badges */}
                      <div className="flex justify-between items-start">
                        {anime.badge ? (
                          <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-indigo-600 text-white shadow">
                            {anime.badge}
                          </span>
                        ) : <span />}

                        <span className="bg-black/70 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          {anime.rating}
                        </span>
                      </div>

                      {/* Bottom Info inside poster */}
                      <div>
                        <span className="text-[10px] text-neutral-300 font-medium">
                          {anime.year} • {anime.seasonsCount}S
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 px-1">
                    <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-1 group-hover:text-indigo-400 transition-colors">
                      {anime.title}
                    </h3>
                    <p className="text-[11px] text-neutral-400 font-medium truncate mt-0.5">
                      {anime.genres.slice(0, 2).join(' • ')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
