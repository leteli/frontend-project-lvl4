/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-confusing-arrow */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from '../routes.js';

const PrivateRoute = ({ children, ...rest }) => {
  const tokenInfo = localStorage.getItem('userId');
  return (
    <Route
      {...rest}
      render={({ location }) => tokenInfo ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: routes.login,
            state: { from: location },
          }}
        />
      )}
    />
  );
};

export default PrivateRoute;
