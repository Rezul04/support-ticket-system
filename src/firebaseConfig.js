import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"; 
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDk_CQJXjNv-uVx_Aw5pI20F9Uh5p54XSo",
    authDomain: "support-ticket-system-43a4c.firebaseapp.com",
    projectId: "support-ticket-system-43a4c",
    storageBucket: "support-ticket-system-43a4c.firebasestorage.app",
    messagingSenderId: "154888778053",
    appId: "1:154888778053:web:d328f76bb18cd44f058e2c",
    measurementId: "G-D6ZXC007YW"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage, collection, getDocs, query, where, addDoc, updateDoc, deleteDoc, doc };