import {initializeApp} from 'firebase/app';
import {getFirestore } from 'firebase/firestore';
import {getStorage } from 'firebase/storage';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAh9rLVmfChC4GgYa1tbKcsGg-POJOmBTs",
    authDomain: "anime-moments-74966.firebaseapp.com",
    projectId: "anime-moments-74966",
    storageBucket: "anime-moments-74966.appspot.com",
    messagingSenderId: "418978219344",
    appId: "1:418978219344:web:1b5842bd7a2d7cf2e5d855",
    measurementId: "G-8W47TYVPVJ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};

