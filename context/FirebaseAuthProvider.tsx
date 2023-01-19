import { createContext, useState, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { signOut, User, GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Insert your Firebase project's configuration here
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

interface FirebaseAuthProviderProps {
  firebaseConfig: object;
  //  children: React.ReactNode;
}

interface FirebaseAuthContextProps {
  user: User | null;
  login: () => Promise<User | null>;
  logout: () => void;
}

export const FirebaseAuthContext = createContext<FirebaseAuthContextProps>({
  user: null,
  login: async () => null,
  logout: () => {},
});

export const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuthProvider: React.FC<FirebaseAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  //  firebase.initializeApp(firebaseConfig);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(getAuth(), provider);
      setUser(result.user);
      console.log(user);
      return result.user;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const logout = () => {
    signOut(getAuth());
    setUser(null);
  };

  return <FirebaseAuthContext.Provider value={{ user, login, logout }}>{children}</FirebaseAuthContext.Provider>;
};

export const useAuth = () => useContext(FirebaseAuthContext);
export const firebaseAuth = getAuth(firebaseApp);
//export const firebaseDB = getFirestore(firebaseApp);
//export const firebaseStorage = getStorage(firebaseApp);
