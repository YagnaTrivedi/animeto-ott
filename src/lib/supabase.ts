import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Safely extract and clean an environment variable string by trimming
 * and removing any accidental enclosing quotes or whitespace.
 */
function cleanEnvString(val: any): string {
  if (!val || typeof val !== 'string') return '';
  let cleaned = val.trim();
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  return cleaned;
}

/**
 * Normalizes the Supabase project URL.
 * Supabase client expects only the root origin (e.g., https://xyz.supabase.co).
 * If a user accidentally enters https://xyz.supabase.co/rest/v1 or trailing slashes,
 * this function strips subpaths to prevent "Invalid path specified in request URL" errors.
 */
export function normalizeSupabaseUrl(rawUrl: string): string {
  const cleaned = cleanEnvString(rawUrl);
  if (!cleaned) return '';

  try {
    const parsed = new URL(cleaned);

    // If user provided a dashboard URL like https://supabase.com/dashboard/project/abcdefgh
    if (parsed.hostname === 'supabase.com' && parsed.pathname.includes('/project/')) {
      const match = parsed.pathname.match(/\/project\/([a-z0-9_-]+)/i);
      if (match && match[1]) {
        return `https://${match[1]}.supabase.co`;
      }
    }

    // Strip out any accidental API subpaths such as /rest/v1, /rest, /api/v1, etc.
    let path = parsed.pathname;
    path = path
      .replace(/\/rest\/v1\/?$/i, '')
      .replace(/\/rest\/?$/i, '')
      .replace(/\/auth\/v1\/?$/i, '')
      .replace(/\/storage\/v1\/?$/i, '')
      .replace(/\/api\/v1\/?$/i, '');

    if (!path || path === '/') {
      return parsed.origin;
    }

    return `${parsed.origin}${path.replace(/\/+$/, '')}`;
  } catch {
    // If URL parsing fails, remove any trailing slashes or /rest/v1
    return cleaned
      .replace(/\/rest\/v1\/?$/i, '')
      .replace(/\/+$/, '');
  }
}

// Environment variable retrieval
const rawSupabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  (typeof process !== 'undefined' ? process.env?.VITE_SUPABASE_URL : '') ||
  '';

const rawSupabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_KEY ||
  (typeof process !== 'undefined' ? process.env?.VITE_SUPABASE_ANON_KEY : '') ||
  '';

export const supabaseUrl = normalizeSupabaseUrl(rawSupabaseUrl);
export const supabaseAnonKey = cleanEnvString(rawSupabaseAnonKey);

// Validate that configuration is present and valid
export const isSupabaseConfigured = (): boolean => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return false;
  }
  try {
    const parsed = new URL(supabaseUrl);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Reusable Supabase client instance using the official @supabase/supabase-js SDK.
 * If credentials are missing or invalid, client will be null to prevent unhandled startup crashes.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

/**
 * Helper to get the active Supabase client or null if unconfigured
 */
export const getSupabaseClient = (): SupabaseClient | null => {
  return supabase;
};

/**
 * Helper to inspect the current configuration state
 */
export const getSupabaseConfigState = () => {
  return {
    isConfigured: isSupabaseConfigured(),
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
    url: supabaseUrl,
    maskedUrl: supabaseUrl ? supabaseUrl.replace(/^(https?:\/\/[^/]+).*$/, '$1') : 'Not provided',
  };
};

export interface SupabaseHealthCheckResult {
  ok: boolean;
  message: string;
  animeCount?: number;
  episodesCount?: number;
  missingTables?: string[];
}

/**
 * Test connectivity with Supabase and verify anime and episodes tables
 */
export async function testSupabaseConnection(): Promise<SupabaseHealthCheckResult> {
  if (!supabase || !isSupabaseConfigured()) {
    return {
      ok: false,
      message: 'Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are not configured in AI Studio Settings.',
    };
  }

  try {
    const missingTables: string[] = [];
    let animeCount = 0;
    let episodesCount = 0;

    // Check anime table: queries exactly supabase.from('anime').select('*')
    const { data: animeData, error: animeErr, count: animeTotal } = await supabase
      .from('anime')
      .select('*', { count: 'exact' })
      .limit(10);

    if (animeErr) {
      if (
        animeErr.code === '42P01' ||
        animeErr.message?.toLowerCase().includes('relation "anime" does not exist') ||
        animeErr.message?.toLowerCase().includes('not found')
      ) {
        missingTables.push('anime');
      } else {
        console.warn('Supabase anime query warning:', animeErr.message);
        return {
          ok: false,
          message: `Supabase query error: ${animeErr.message}`,
        };
      }
    } else {
      animeCount = animeTotal ?? (animeData?.length || 0);
    }

    // Check episodes table: queries exactly supabase.from('episodes').select('*')
    const { data: epData, error: epErr, count: epTotal } = await supabase
      .from('episodes')
      .select('*', { count: 'exact' })
      .limit(10);

    if (epErr) {
      if (
        epErr.code === '42P01' ||
        epErr.message?.toLowerCase().includes('relation "episodes" does not exist') ||
        epErr.message?.toLowerCase().includes('not found')
      ) {
        missingTables.push('episodes');
      } else {
        console.warn('Supabase episodes query warning:', epErr.message);
      }
    } else {
      episodesCount = epTotal ?? (epData?.length || 0);
    }

    if (missingTables.length > 0) {
      return {
        ok: true,
        message: `Connected to Supabase at ${supabaseUrl}! Table(s) pending creation: ${missingTables.join(', ')}.`,
        missingTables,
        animeCount,
        episodesCount,
      };
    }

    return {
      ok: true,
      message: `Connected successfully to Supabase! Found ${animeCount} anime and ${episodesCount} episodes.`,
      animeCount,
      episodesCount,
    };
  } catch (err: any) {
    return {
      ok: false,
      message: `Supabase connection error: ${err?.message || 'Network request failed'}`,
    };
  }
}
