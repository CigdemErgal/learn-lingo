import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQkUlfz9l4XN1l-vBGe6OoyLSxK3bjKeE",
  authDomain: "learn-lingo-analytics.firebaseapp.com",
  projectId: "learn-lingo-analytics",
  storageBucket: "learn-lingo-analytics.firebasestorage.app",
  messagingSenderId: "753614834174",
  appId: "1:753614834174:web:430c9fdab3ebf8edb058af",
  measurementId: "G-3PETFQ7S0Q",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
