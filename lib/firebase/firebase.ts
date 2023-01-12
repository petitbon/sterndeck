import { initializeApp } from 'firebase/app';

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
export default firebase;
