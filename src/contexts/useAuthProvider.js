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

  return {
    loggedIn,
    logIn,
    logOut,
  };
};

export default useAuthProvider;
