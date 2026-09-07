import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Anime, Episode, Season } from '../types';
import {
  INITIAL_ANIME_LIST,
  RAW_ANIME_DATA,
  EPISODES_DATA,
  getSeasonsByAnimeId,
  buildAnimeObject,
  AnimeDataDefinition,
} from '../data/animeData';

/**
 * Maps a raw row from Supabase's `anime` table into our application's AnimeDataDefinition.
 * Handles both camelCase and snake_case column names.
 */
export function mapSupabaseAnimeRow(row: any): AnimeDataDefinition {
  const genres = Array.isArray(row.genres)
    ? row.genres
    : typeof row.genres === 'string'
    ? row.genres.split(',').map((g: string) => g.trim())
    : ['Action'];

  const altTitles = Array.isArray(row.alternative_titles)
    ? row.alternative_titles
    : Array.isArray(row.alternativeTitles)
    ? row.alternativeTitles
    : typeof row.alternative_titles === 'string'
    ? row.alternative_titles.split(',').map((t: string) => t.trim())
    : [];

  const poster = row.poster || row.poster_url || row.posterUrl || '';
  const banner = row.banner || row.banner_url || row.bannerUrl || poster;
  const logo = row.logo || row.logo_url || row.logoUrl || banner;

  return {
    id: String(row.id),
    title: row.title || 'Untitled Anime',
    alternativeTitles: altTitles,
    description: row.description || row.synopsis || '',
    poster,
    banner,
    logo,
    year: Number(row.year) || new Date().getFullYear(),
    season: row.season || `${row.year || '2024'}`,
    status: row.status || 'Ongoing',
    rating: Number(row.rating) || 8.5,
    genres,
    type: row.type || row.format || 'TV',
    studio: row.studio || 'Studio',
    totalEpisodes: Number(row.total_episodes || row.totalEpisodes) || 12,
    duration: row.duration || '24 min',
    language: row.language || 'Japanese (Sub) / English (Dub)',
    ageRating: row.age_rating || row.ageRating || 'TV-14',
    featured: Boolean(row.featured),
    trending: Boolean(row.trending),
    popular: Boolean(row.popular),
    newRelease: Boolean(row.new_release ?? row.newRelease),
    badge: row.badge,
    badgeType: row.badge_type || row.badgeType,
    trendingRank: row.trending_rank ?? row.trendingRank,
    trendingCategory: row.trending_category ?? row.trendingCategory,
  };
}

/**
 * Maps a raw row from Supabase's `episodes` table into an Episode object.
 * Handles both camelCase and snake_case column names.
 */
export function mapSupabaseEpisodeRow(row: any): Episode {
  return {
    id: String(row.id),
    animeId: String(row.anime_id ?? row.animeId),
    seasonNumber: Number(row.season_number ?? row.seasonNumber) || 1,
    episodeNumber: Number(row.episode_number ?? row.episodeNumber) || 1,
    title: row.title || `Episode ${row.episode_number ?? row.episodeNumber ?? 1}`,
    description: row.description || row.synopsis || '',
    thumbnail: row.thumbnail || row.thumbnail_url || row.thumbnailUrl || '',
    duration: row.duration || '24 min',
    videoUrl:
      row.video_url ||
      row.videoUrl ||
      'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    subtitleUrl:
      row.subtitle_url ||
      row.subtitleUrl ||
      'https://storage.googleapis.com/gtv-videos-bucket/sample/subtitles-en.vtt',
    introStart: Number(row.intro_start ?? row.introStart) || 0,
    introEnd: Number(row.intro_end ?? row.introEnd) || 0,
    synopsis: row.description || row.synopsis,
    progressPercent: Number(row.progress_percent ?? row.progressPercent) || 0,
    watched: Boolean(row.watched),
  };
}

/**
 * Helper to group a list of episodes into Season objects by seasonNumber
 */
export function groupEpisodesIntoSeasons(animeId: string, episodes: Episode[], animeRaw?: AnimeDataDefinition): Season[] {
  const relevantEpisodes = episodes.filter((ep) => ep.animeId === animeId);

  // If no episodes in database for this anime, use existing fallback episodes
  if (relevantEpisodes.length === 0) {
    return getSeasonsByAnimeId(animeId);
  }

  const seasonMap = new Map<number, Episode[]>();
  for (const ep of relevantEpisodes) {
    const sNum = ep.seasonNumber || 1;
    const list = seasonMap.get(sNum) || [];
    list.push(ep);
    seasonMap.set(sNum, list);
  }

  const sortedSeasons: Season[] = [];
  const sortedSeasonNums = Array.from(seasonMap.keys()).sort((a, b) => a - b);

  for (const sNum of sortedSeasonNums) {
    const sEpisodes = seasonMap.get(sNum) || [];
    sEpisodes.sort((a, b) => a.episodeNumber - b.episodeNumber);

    let title = `Season ${sNum}`;
    if (animeRaw?.type === 'Movie') {
      title = 'Feature Film';
    } else if (animeId === 'attack-on-titan' && sNum === 4) {
      title = 'Season 4 (The Final Season)';
    } else if (animeId === 'demon-slayer' && sNum === 2) {
      title = 'Entertainment District Arc';
    }

    sortedSeasons.push({
      seasonNumber: sNum,
      title,
      episodes: sEpisodes,
    });
  }

  return sortedSeasons;
}

export interface FetchAnimeResult {
  animeList: Anime[];
  isUsingFallback: boolean;
  source: 'supabase' | 'fallback';
  error: string | null;
  count: number;
}

/**
 * Fetches all anime and their episodes from Supabase.
 * If Supabase is unconfigured, empty, or returns an error, returns the fallback catalog.
 */
export async function fetchAllAnimeFromSupabase(): Promise<FetchAnimeResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      animeList: INITIAL_ANIME_LIST,
      isUsingFallback: true,
      source: 'fallback',
      error: 'Supabase environment variables not set. Using local fallback catalog.',
      count: INITIAL_ANIME_LIST.length,
    };
  }

  try {
    // 1. Fetch Anime table
    const { data: animeRows, error: animeError } = await supabase
      .from('anime')
      .select('*');

    if (animeError) {
      console.warn('Supabase anime fetch error, using local fallback:', animeError.message);
      return {
        animeList: INITIAL_ANIME_LIST,
        isUsingFallback: true,
        source: 'fallback',
        error: `Supabase query error: ${animeError.message}`,
        count: INITIAL_ANIME_LIST.length,
      };
    }

    if (!animeRows || animeRows.length === 0) {
      return {
        animeList: INITIAL_ANIME_LIST,
        isUsingFallback: true,
        source: 'fallback',
        error: 'Supabase `anime` table is currently empty. Using local fallback catalog.',
        count: INITIAL_ANIME_LIST.length,
      };
    }

    // 2. Fetch Episodes table
    const { data: episodeRows, error: episodesError } = await supabase
      .from('episodes')
      .select('*');

    if (episodesError) {
      console.warn('Supabase episodes fetch notice (using mapped/fallback episodes):', episodesError.message);
    }

    const fetchedEpisodes: Episode[] = Array.isArray(episodeRows) && episodeRows.length > 0
      ? episodeRows.map(mapSupabaseEpisodeRow)
      : EPISODES_DATA;

    // 3. Assemble full Anime models with mapped seasons and episodes
    const rawAnimeDefinitions: AnimeDataDefinition[] = animeRows.map(mapSupabaseAnimeRow);

    const fullAnimeList: Anime[] = rawAnimeDefinitions.map((raw) => {
      const seasons = groupEpisodesIntoSeasons(raw.id, fetchedEpisodes, raw);
      const originalTitle = raw.alternativeTitles?.[0] || raw.title;

      return {
        ...raw,
        originalTitle,
        posterUrl: raw.poster,
        bannerUrl: raw.banner,
        synopsis: raw.description,
        format: raw.type === 'Movie' ? 'Movie' : raw.type === 'OVA' ? 'OVA' : 'TV',
        seasonsCount: seasons.length,
        seasons,
      };
    });

    return {
      animeList: fullAnimeList,
      isUsingFallback: false,
      source: 'supabase',
      error: null,
      count: fullAnimeList.length,
    };
  } catch (err: any) {
    console.error('Failed to fetch from Supabase:', err);
    return {
      animeList: INITIAL_ANIME_LIST,
      isUsingFallback: true,
      source: 'fallback',
      error: err?.message || 'Network error connecting to Supabase',
      count: INITIAL_ANIME_LIST.length,
    };
  }
}

/**
 * Fetches episodes for a specific anime ID from Supabase `episodes` table
 */
export async function fetchEpisodesForAnimeId(animeId: string): Promise<Episode[]> {
  if (!isSupabaseConfigured() || !supabase) {
    return EPISODES_DATA.filter((e) => e.animeId === animeId);
  }

  try {
    const { data, error } = await supabase
      .from('episodes')
      .select('*')
      .eq('anime_id', animeId)
      .order('episode_number', { ascending: true });

    if (error || !data || data.length === 0) {
      // Try camelCase column animeId if anime_id gave nothing
      const { data: camelData, error: camelErr } = await supabase
        .from('episodes')
        .select('*')
        .eq('animeId', animeId)
        .order('episodeNumber', { ascending: true });

      if (!camelErr && camelData && camelData.length > 0) {
        return camelData.map(mapSupabaseEpisodeRow);
      }

      return EPISODES_DATA.filter((e) => e.animeId === animeId);
    }

    return data.map(mapSupabaseEpisodeRow);
  } catch {
    return EPISODES_DATA.filter((e) => e.animeId === animeId);
  }
}

/**
 * Optional utility: Seeds the default placeholder anime and episodes into Supabase
 * if tables exist and user wishes to populate them.
 */
export async function seedPlaceholderDataToSupabase(): Promise<{ success: boolean; message: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      message: 'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    };
  }

  try {
    // 1. Insert Anime
    const animeToInsert = RAW_ANIME_DATA.map((a) => ({
      id: a.id,
      title: a.title,
      alternative_titles: a.alternativeTitles,
      description: a.description,
      poster: a.poster,
      banner: a.banner,
      logo: a.logo,
      year: a.year,
      season: a.season,
      status: a.status,
      rating: a.rating,
      genres: a.genres,
      type: a.type,
      studio: a.studio,
      total_episodes: a.totalEpisodes,
      duration: a.duration,
      language: a.language,
      age_rating: a.ageRating,
      featured: a.featured,
      trending: a.trending,
      popular: a.popular,
      new_release: a.newRelease,
      badge: a.badge,
    }));

    const { error: animeInsertErr } = await supabase
      .from('anime')
      .upsert(animeToInsert, { onConflict: 'id' });

    if (animeInsertErr) {
      return { success: false, message: `Anime insert error: ${animeInsertErr.message}` };
    }

    // 2. Insert Episodes
    const episodesToInsert = EPISODES_DATA.map((e) => ({
      id: e.id,
      anime_id: e.animeId,
      season_number: e.seasonNumber,
      episode_number: e.episodeNumber,
      title: e.title,
      description: e.description,
      thumbnail: e.thumbnail,
      duration: e.duration,
      video_url: e.videoUrl,
      subtitle_url: e.subtitleUrl,
      intro_start: e.introStart,
      intro_end: e.introEnd,
    }));

    const { error: epInsertErr } = await supabase
      .from('episodes')
      .upsert(episodesToInsert, { onConflict: 'id' });

    if (epInsertErr) {
      return { success: false, message: `Episodes insert error: ${epInsertErr.message}` };
    }

    return {
      success: true,
      message: `Successfully seeded ${animeToInsert.length} anime and ${episodesToInsert.length} episodes to Supabase!`,
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to seed data' };
  }
}
