// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAbZpt1zNDQrrsGJxQwMwKLOU9tTS4xbjQ',
  authDomain: 'sterndeck-2.firebaseapp.com',
  projectId: 'sterndeck-2',
  storageBucket: 'sterndeck-2.appspot.com',
  messagingSenderId: '104051211112',
  appId: '1:104051211112:web:c72a7bbcffdeac3f4634dd',
  measurementId: 'G-QG0TE2526W',
};

const firebase = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebase);
export default firebase;
