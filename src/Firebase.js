import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBASNON15KP0jtwmES4eUQh0X7VfVLETTs",
  authDomain: "disneyplus-clone-5347c.firebaseapp.com",
  projectId: "disneyplus-clone-5347c",
  storageBucket: "disneyplus-clone-5347c.appspot.com",
  messagingSenderId: "219975629572",
  appId: "1:219975629572:web:cdce80d8f2a40322f1ae51",
  measurementId: "G-QD6VR50PDT",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { db, auth, provider, storage };
