import React from 'react';
import { useHistory } from 'react-router';
import { Container, Navbar, Button } from 'react-bootstrap';

import useAuth from '../contexts/auth.jsx';

const ChatNavbar = () => {
  const auth = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    auth.logOut();
    history.push('/login');
  };
  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand href="/">
          Hexlet Chat
        </Navbar.Brand>
        { auth.loggedIn ? <Button onClick={handleLogout}>Выйти</Button> : null }
      </Container>
    </Navbar>
  );
};

export default ChatNavbar;
