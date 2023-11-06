import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {firebaseConfig} from "../firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// adatbázis eléréshez kell egy referencia
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);