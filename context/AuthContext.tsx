import { createContext } from 'react';

const initialUser: any = null;

export const AuthContext = createContext({
  user: initialUser,
  loading: true,
});
