import { initializeApp } from "firebase/app";

import {
  getAuth
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZlRNCtvjFoKlfFQn-mf01iQ444OKiI2M",
  authDomain: "clarifai-d8a55.firebaseapp.com",
  projectId: "clarifai-d8a55",
  storageBucket: "clarifai-d8a55.firebasestorage.app",
  messagingSenderId: "905251541746",
  appId: "1:905251541746:web:4b035728c70ef67f05f66b",
  measurementId: "G-J2H6V7LXNV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

