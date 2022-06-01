import React from 'react';
import useAuthProvider from '../contexts/useAuthProvider.js';
import { authContext } from '../index.js';

const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
