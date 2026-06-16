import { get, ref, set } from "firebase/database";
import { database } from "./firebase";

const FAVORITES_STORAGE_KEY = "favorites";

function shouldUseLocalFallback() {
  return !import.meta.env.VITE_FIREBASE_DATABASE_URL;
}

export function isFavoritesUsingLocalFallback() {
  return shouldUseLocalFallback();
}

function normalizeFavorites(data: unknown): string[] {
  if (!data) {
    return [];
  }

  if (Array.isArray(data)) {
    return data.filter((item): item is string => typeof item === "string");
  }

  if (typeof data === "object") {
    return Object.values(data as Record<string, unknown>).filter(
      (item): item is string => typeof item === "string",
    );
  }

  return [];
}

export async function getUserFavorites(userId: string): Promise<string[]> {
  if (shouldUseLocalFallback()) {
    return getLocalFavorites();
  }

  try {
    const snapshot = await get(ref(database, `users/${userId}/favorites`));
    return normalizeFavorites(snapshot.val());
  } catch {
    return getLocalFavorites();
  }
}

export async function saveUserFavorites(
  userId: string,
  favorites: string[],
): Promise<void> {
  if (shouldUseLocalFallback()) {
    setLocalFavorites(favorites);
    return;
  }

  try {
    await set(ref(database, `users/${userId}/favorites`), favorites);
  } catch {
    setLocalFavorites(favorites);
  }
}

export function getLocalFavorites(): string[] {
  const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
  return savedFavorites ? JSON.parse(savedFavorites) : [];
}

export function setLocalFavorites(favorites: string[]) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}

export function clearLocalFavorites() {
  localStorage.removeItem(FAVORITES_STORAGE_KEY);
}
