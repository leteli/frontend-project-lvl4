import React, { createContext, useState, useContext } from 'react';

export const authContext = createContext();

const useAuthProvider = () => {
  // eslint-disable-next-line no-unneeded-ternary
  const state = localStorage.getItem('userId') ? true : false;
  const [loggedIn, setLoggedIn] = useState(state);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn(true);
  };

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

export const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  console.log(userId.token);
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const useAuth = () => useContext(authContext);

export default useAuth;
