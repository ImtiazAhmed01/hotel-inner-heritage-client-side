// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_apiKey,
//     authDomain: import.meta.env.VITE_authDomain,
//     projectId: import.meta.env.VITE_projectId,
//     storageBucket: import.meta.env.VITE_storageBucket,
//     messagingSenderId: import.meta.env.VITE_messagingSenderId,
//     appId: import.meta.env.VITE_appId,
// };

const firebaseConfig = {
    apiKey: "AIzaSyALDKaf9OWsc-pdASmNp6AUVDBJ4Ebn7Wo",
    authDomain: "hotel-inner-heritage.firebaseapp.com",
    projectId: "hotel-inner-heritage",
    storageBucket: "hotel-inner-heritage.firebasestorage.app",
    messagingSenderId: "519459823316",
    appId: "1:519459823316:web:f73083e2cefe36ca142541"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;