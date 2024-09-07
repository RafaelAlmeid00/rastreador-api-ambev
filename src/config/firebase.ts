// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyAQgEFs88vfFtVy1Fjaqxp27LmLe3mvZmw',
  authDomain: 'easytracker-f7b08.firebaseapp.com',
  projectId: 'easytracker-f7b08',
  storageBucket: 'easytracker-f7b08.appspot.com',
  messagingSenderId: '767678484936',
  appId: '1:767678484936:web:eb74a65559969bc99ab0fd',
  measurementId: 'G-TQE4TCE4P8',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
