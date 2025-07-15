// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAard2iaKluGvaNa4Q0PMhZ4SZ9rPC1Rzk",
  authDomain: "coachingapp-ab666.firebaseapp.com",
  projectId: "coachingapp-ab666",
  storageBucket: "coachingapp-ab666.firebasestorage.app",
  messagingSenderId: "778098858222",
  appId: "1:778098858222:web:4e818858a4e8c50271fbff",
  measurementId: "G-02XYMWBK0H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
const analytics = getAnalytics(app);
