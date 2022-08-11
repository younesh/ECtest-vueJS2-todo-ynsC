// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// ce fichier n'est pas versionnée !, si tu pull l'appli faut recréer ce fichier avec les info de parametrage ds ton espace firebase  ( apiKey, authDomain, ... , projectId , ....)
import { myFirebaseConfig } from "./myPrivateFirebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = myFirebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
