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

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <ChatNavbar />
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <PrivateRoute exact path="/">
          <Chat />
        </PrivateRoute>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
    <ToastContainer />
  </Router>
);

export default App;
