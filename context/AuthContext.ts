import { createContext, useContext } from 'react';

const initialUser: any = null;

export const AuthContext = createContext({
  user: initialUser,
  loading: true,
});

export const useAuthContext = () => useContext(AuthContext);
