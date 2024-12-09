import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCT6C61tooAqHg92bDKPSVCp4xR8KlxiiU",
  authDomain: "eyeon-531f2.firebaseapp.com",
  projectId: "eyeon-531f2",
  storageBucket: "eyeon-531f2.firebasestorage.app",
  messagingSenderId: "1034820947424",
  appId: "1:1034820947424:web:72d08331fa2b05d9556f85"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
