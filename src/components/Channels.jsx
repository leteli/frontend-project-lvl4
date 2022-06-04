import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Button,
  Nav,
} from 'react-bootstrap';

import { selectors } from '../slices/channelsSlice.js';
import { actions } from '../slices/modalsSlice.js';
import { ChannelButton, ChannelDropdownButton } from './ChannelButtons.jsx';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.channels);
  const showAddingModal = () => dispatch(actions.openModal({ type: 'adding', channel: null }));

  return currentChannelId && (
    <Col xs={4} md={2} className="pt-5 px-0 border-end bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chat_page.channels')}</span>
        <Button onClick={showAddingModal} variant="" className="p-0 text-primary btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">{t('chat_page.plus')}</span>
        </Button>
      </div>
      <Nav fill variant="pills" className="flex-column px-2" defaultActiveKey="">
        {channels.map((channel) => {
          const CurrentButton = channel.removable ? ChannelDropdownButton : ChannelButton;
          return (
            <Nav.Item key={channel.id} className="w-100">
              <CurrentButton channel={channel} />
            </Nav.Item>
          );
        })}
      </Nav>
    </Col>
  );
};

export default Channels;
