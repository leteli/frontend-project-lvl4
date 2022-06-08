import React from 'react';
import { authContext } from '../contexts/getContexts.js';
import useAuthProvider from '../contexts/useAuthProvider.js';

const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
