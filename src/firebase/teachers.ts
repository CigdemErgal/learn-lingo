import { get, limitToFirst, query, ref } from "firebase/database";
import fallbackTeachersData from "../../teachers.json";
import type { Teacher } from "../types/teacher";
import { database } from "./firebase";

const fallbackTeachers: Teacher[] = fallbackTeachersData;

function normalizeTeachers(data: unknown): Teacher[] {
  if (!data) {
    return [];
  }

  if (Array.isArray(data)) {
    return data.filter(Boolean) as Teacher[];
  }

  if (typeof data === "object") {
    return Object.values(data as Record<string, Teacher>);
  }

  return [];
}

function shouldUseFallback() {
  return !import.meta.env.VITE_FIREBASE_DATABASE_URL;
}

export async function getTeachers(limit?: number): Promise<Teacher[]> {
  if (shouldUseFallback()) {
    return typeof limit === "number"
      ? fallbackTeachers.slice(0, limit)
      : fallbackTeachers;
  }

  try {
    const teachersRef = ref(database, "teachers");
    const teachersQuery =
      typeof limit === "number"
        ? query(teachersRef, limitToFirst(limit))
        : teachersRef;

    const snapshot = await get(teachersQuery);
    return normalizeTeachers(snapshot.val());
  } catch {
    return typeof limit === "number"
      ? fallbackTeachers.slice(0, limit)
      : fallbackTeachers;
  }
}

export async function getAllTeachers(): Promise<Teacher[]> {
  return getTeachers();
}

export async function getTeachersCount(): Promise<number> {
  if (shouldUseFallback()) {
    return fallbackTeachers.length;
  }

  try {
    const snapshot = await get(ref(database, "teachers"));
    return normalizeTeachers(snapshot.val()).length;
  } catch {
    return fallbackTeachers.length;
  }
}
