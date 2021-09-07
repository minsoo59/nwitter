import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { refFromURL, Database } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
} = process.env;
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const auth = getAuth();
export const dbService = getFirestore();

export const deleteNweet = deleteDoc;
export const docNweet = doc;
export const updateNweet = updateDoc;
export const addNweet = addDoc;
export const realtimeNweet = onSnapshot;
export const collec = collection;

export const join = createUserWithEmailAndPassword;
export const login = signInWithEmailAndPassword;
