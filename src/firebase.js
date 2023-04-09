import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHl63FiIeO1iCiVHu_MF0kGybCZ6SbTpw",
  authDomain: "mern-blog-ed324.firebaseapp.com",
  projectId: "mern-blog-ed324",
  storageBucket: "mern-blog-ed324.appspot.com",
  messagingSenderId: "1049749478175",
  appId: "1:1049749478175:web:6aec312e5e917522baae2a"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)