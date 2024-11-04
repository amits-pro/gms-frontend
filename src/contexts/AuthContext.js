import { createContext } from 'react';

export const AuthContext = createContext({
  role: null,
  handleLogin: () => {},
  handleLogout: () => {},
});
