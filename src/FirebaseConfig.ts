import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
}
const firebaseApp = initializeApp(firebaseConfig)

export const fireStore = getFirestore(firebaseApp)
export const fireAuth = getAuth(firebaseApp)
const fireStoreData = getStorage(firebaseApp)
const db = getFirestore()

export const firebaseApps = {
  firebaseApp,
  fireStore,
  fireAuth,
  fireStoreData,
  db
}
