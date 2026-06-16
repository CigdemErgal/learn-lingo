import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

function readEnvFile(content) {
  const result = {};

  for (const line of content.split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();
    result[key] = value;
  }

  return result;
}

async function loadEnv() {
  const envPath = path.join(rootDir, ".env");
  const envContent = await fs.readFile(envPath, "utf8");
  const parsed = readEnvFile(envContent);

  for (const [key, value] of Object.entries(parsed)) {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function getFirebaseConfig() {
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;

  return {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL:
      process.env.VITE_FIREBASE_DATABASE_URL ||
      `https://${projectId}-default-rtdb.firebaseio.com`,
    projectId,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
  };
}

async function loadTeachers() {
  const teachersPath = path.join(rootDir, "teachers.json");
  const fileContent = await fs.readFile(teachersPath, "utf8");
  return JSON.parse(fileContent);
}

async function seedTeachers() {
  await loadEnv();

  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
  const teachers = await loadTeachers();

  const email = process.env.FIREBASE_SEED_EMAIL;
  const password = process.env.FIREBASE_SEED_PASSWORD;

  if (email && password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  await set(ref(database, "teachers"), teachers);

  console.log(`Seed completed. Uploaded ${teachers.length} teachers.`);
}

seedTeachers().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
