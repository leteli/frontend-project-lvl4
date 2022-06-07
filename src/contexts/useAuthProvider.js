import { useState } from 'react';

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

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

  return {
    loggedIn,
    logIn,
    logOut,
    getAuthHeader,
  };
};

export default useAuthProvider;
