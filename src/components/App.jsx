import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import LoginForm from './LoginForm.jsx';
import NoMatch from './NoMatch.jsx';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/" />
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  </Router>
); // нужен ли exact path у '/' ?

export default App;
