// client-side localStorage utilities

const STORAGE_PREFIX = "toolbox_";

export function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // quota exceeded — silently ignore
  }
}

// --- Recent Tools ---

interface RecentEntry {
  slug: string;
  ts: number;
}

const RECENT_KEY = "recent_tools";
const MAX_RECENT = 8;

export function getRecentTools(): string[] {
  return getItem<RecentEntry[]>(RECENT_KEY, []).map((e) => e.slug);
}

export function addRecentTool(slug: string): void {
  const entries = getItem<RecentEntry[]>(RECENT_KEY, []);
  const filtered = entries.filter((e) => e.slug !== slug);
  filtered.unshift({ slug, ts: Date.now() });
  setItem(RECENT_KEY, filtered.slice(0, MAX_RECENT));
}

// --- Favorites ---

const FAVORITES_KEY = "favorite_tools";

export function getFavorites(): string[] {
  return getItem<string[]>(FAVORITES_KEY, []);
}

export function toggleFavorite(slug: string): boolean {
  const favs = getItem<string[]>(FAVORITES_KEY, []);
  const idx = favs.indexOf(slug);
  if (idx >= 0) {
    favs.splice(idx, 1);
    setItem(FAVORITES_KEY, favs);
    return false;
  }
  favs.unshift(slug);
  setItem(FAVORITES_KEY, favs);
  return true;
}

export function isFavorite(slug: string): boolean {
  return getItem<string[]>(FAVORITES_KEY, []).includes(slug);
}

export function reorderFavorites(slugs: string[]): void {
  setItem(FAVORITES_KEY, slugs);
}

// --- App-scoped Favorites ---

function appFavKey(app: string): string {
  return `${app}_favorite_tools`;
}

export function getAppFavorites(app: string): string[] {
  return getItem<string[]>(appFavKey(app), []);
}

export function toggleAppFavorite(app: string, slug: string): boolean {
  const key = appFavKey(app);
  const favs = getItem<string[]>(key, []);
  const idx = favs.indexOf(slug);
  if (idx >= 0) {
    favs.splice(idx, 1);
    setItem(key, favs);
    return false;
  }
  favs.unshift(slug);
  setItem(key, favs);
  return true;
}

export function isAppFavorite(app: string, slug: string): boolean {
  return getItem<string[]>(appFavKey(app), []).includes(slug);
}

export function reorderAppFavorites(app: string, slugs: string[]): void {
  setItem(appFavKey(app), slugs);
}
