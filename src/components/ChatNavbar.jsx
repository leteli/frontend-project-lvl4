import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';

import useAuth from '../contexts/auth.jsx';

const ChatNavbar = () => {
  const auth = useAuth();
  console.log(auth.loggedIn);
  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand href="/">
          Chat
        </Navbar.Brand>
        { auth.loggedIn ? <Button>Выйти</Button> : null }
      </Container>
    </Navbar>
  );
};

export default ChatNavbar;
