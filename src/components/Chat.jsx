import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  Container,
  Row,
} from 'react-bootstrap';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import fetchData from '../slices/fetchData.js';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Container className="h-100 my-4 overflow-hidden shadow rounded">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
    </div>
  );
};

export default Chat;
