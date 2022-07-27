// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDaE0R3zcA1yzaEU4Wk9QfqPlvF_Rg1RoU",
    authDomain: "taxi-rental-system-auth.firebaseapp.com",
    projectId: "taxi-rental-system-auth",
    storageBucket: "taxi-rental-system-auth.appspot.com",
    messagingSenderId: "777285257932",
    appId: "1:777285257932:web:fccb6d35e544adbfa8d069",
    measurementId: "G-3F5B5QXZF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
