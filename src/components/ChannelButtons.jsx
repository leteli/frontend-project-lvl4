import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button } from 'react-bootstrap';
import filter from 'leo-profanity';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as modalsActions } from '../slices/modalsSlice.js';

export const ChannelButton = ({ channel }) => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.channels);
  const handleChannelClick = (id) => () => dispatch(channelsActions.setCurrentChannel(id));
  return (
    <Button
      onClick={handleChannelClick(channel.id)}
      className="text-start text-truncate w-100 rounded-0"
      variant={channel.id === currentChannelId ? 'secondary' : ''}
    >
      <span className="me-1">#</span>
      {filter.clean(channel.name)}
    </Button>
  );
};

export const ChannelDropdownButton = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const showModal = (type) => () => dispatch(modalsActions.openModal({ type, channel }));
  const { currentChannelId } = useSelector((state) => state.channels);
  return (
    <Dropdown className="d-flex btn-group">
      <ChannelButton channel={channel} />
      <Dropdown.Toggle
        split
        variant={channel.id === currentChannelId ? 'secondary' : ''}
        className="flex-grow-0"
      >
        <span className="visually-hidden">{t('chat_page.handle_channel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item role="button" onClick={showModal('remove')} href="#">{t('chat_page.remove')}</Dropdown.Item>
        <Dropdown.Item role="button" onClick={showModal('rename')} href="#">{t('chat_page.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
