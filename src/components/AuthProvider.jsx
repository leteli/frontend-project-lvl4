import React from 'react';
import { getAuthContext } from '../contexts/getContexts.js';
import useAuthProvider from '../contexts/useAuthProvider.js';

const AuthProvider = ({ children }) => {
  const authContext = getAuthContext();
  const auth = useAuthProvider();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
