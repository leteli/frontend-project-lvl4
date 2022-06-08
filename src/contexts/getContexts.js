import { createContext } from 'react';

export const getSocketContext = () => {
  const socketContext = createContext();
  return socketContext;
};

export const getAuthContext = () => {
  const authContext = createContext();
  return authContext;
};
