import React from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Container, Navbar, Button } from 'react-bootstrap';

import useAuth from '../contexts/auth.jsx';

const ChatNavbar = () => {
  const auth = useAuth();
  const history = useHistory();
  const { t } = useTranslation();

  const handleLogout = () => {
    auth.logOut();
    history.push('/login');
  };
  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand href="/">
          {t('navbar.header')}
        </Navbar.Brand>
        { auth.loggedIn ? <Button onClick={handleLogout}>{t('navbar.logout_button')}</Button> : null }
      </Container>
    </Navbar>
  );
};

export default ChatNavbar;
