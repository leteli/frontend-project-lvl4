/* eslint-disable import/no-cycle */
/* eslint-disable no-confusing-arrow */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ChatNavbar from './ChatNavbar.jsx';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import NoMatch from './NoMatch.jsx';
import Chat from './Chat.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import routes from '../routes.js';

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <ChatNavbar />
      <Switch>
        <Route path={routes.login}>
          <LoginForm />
        </Route>
        <Route path={routes.signup}>
          <SignupForm />
        </Route>
        <PrivateRoute exact path={routes.root}>
          <Chat />
        </PrivateRoute>
        <Route path={routes.any}>
          <NoMatch />
        </Route>
      </Switch>
    </div>
    <ToastContainer />
  </Router>
);

export default App;
