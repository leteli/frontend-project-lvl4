import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
} from 'react-bootstrap';

import axios from 'axios';
import { getAuthHeader } from '../contexts/auth.jsx';
import routes from '../routes.js';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import Modal from './Modal.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), {
          headers: getAuthHeader(),
        });
        batch(() => {
          dispatch(channelsActions.addChannels(data.channels));
          dispatch(channelsActions.setCurrentChannel(data.currentChannelId));
          dispatch(messagesActions.addMessages(data.messages));
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const modalType = useSelector((state) => state.modals.type);

  return (
    <div className="d-flex flex-column h-100">
      <Container className="h-100 my-4 overflow-hidden shadow rounded">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
      {modalType && <Modal />}
    </div>
  );
};

export default Chat;
