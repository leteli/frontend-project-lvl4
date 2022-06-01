/* eslint-disable import/no-cycle */
import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import getAuthHeader from '../contexts/getAuthHeader.js';
import routes from '../routes.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import Modal from './Modal.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await toast.promise(
        axios.get(routes.dataPath(), {
          headers: getAuthHeader(),
        }),
        { error: t('errors.network_error') },
      );
      batch(() => {
        dispatch(channelsActions.addChannels(data.channels));
        dispatch(channelsActions.setCurrentChannel(data.currentChannelId));
        dispatch(messagesActions.addMessages(data.messages));
      });
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
