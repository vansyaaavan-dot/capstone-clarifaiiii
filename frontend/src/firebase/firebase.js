import { initializeApp } from "firebase/app";

import {
  getAuth
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBSgeircGfgsxUVOzh-PoEaV2JaqPSqQoo",
    authDomain: "clarifai-bbb49.firebaseapp.com",
    projectId: "clarifai-bbb49",
    storageBucket: "clarifai-bbb49.firebasestorage.app",
    messagingSenderId: "103456062559",
    appId: "1:103456062559:web:76b5b9e9794f22bca1afea"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

