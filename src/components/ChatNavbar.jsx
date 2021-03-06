import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Container, Navbar, Button } from 'react-bootstrap';

import { authContext } from '../contexts/getContexts.js';
import routes from '../routes.js';

const ChatNavbar = () => {
  const auth = useContext(authContext);
  const history = useHistory();
  const { t } = useTranslation();

  const handleLogout = () => {
    auth.logOut();
    history.push(routes.login);
  };
  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand href={routes.root}>
          {t('navbar.header')}
        </Navbar.Brand>
        { auth.loggedIn ? <Button onClick={handleLogout}>{t('navbar.logout_button')}</Button> : null }
      </Container>
    </Navbar>
  );
};

export default ChatNavbar;
