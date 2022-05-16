import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { AuthProvider } from '../contexts/auth.jsx';
import LoginForm from './LoginForm.jsx';
import NoMatch from './NoMatch.jsx';
import Chat from './Chat.jsx';

const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          { localStorage.getItem('userId') ? <Chat /> : <Redirect to="/login" /> }
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  </AuthProvider>
); // нужен ли exact path у '/' ?

export default App;
