// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjyxPWHZ3ficnNxG917LiEZKuBLTD1on4",
  authDomain: "sams-blog-b8611.firebaseapp.com",
  projectId: "sams-blog-b8611",
  storageBucket: "sams-blog-b8611.appspot.com",
  messagingSenderId: "552491096001",
  appId: "1:552491096001:web:7a63f4cf52d0fa3973c140",
  measurementId: "G-PFNLY28FKY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app)
