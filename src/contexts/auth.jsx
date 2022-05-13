import React, { createContext, useState, useContext } from 'react';

export const authContext = createContext();

const useAuthProvider = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return {
    loggedIn,
    logIn,
    logOut,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export default useAuth;
