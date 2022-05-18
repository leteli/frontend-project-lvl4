import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Button,
  Nav,
} from 'react-bootstrap';

import { selectors, actions } from '../slices/channelsSlice.js';

const Channels = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  console.log(channels);

  const dispatch = useDispatch();

  const handleChannelClick = (id) => () => dispatch(actions.setCurrentChannel(id));

  return currentChannelId && (
    <Col xs={4} md={2} className="pt-5 px-0 border-end bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button variant="" className="p-0 text-primary btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </Button>
      </div>
      <Nav fill variant="pills" className="flex-column px-2" defaultActiveKey="">
        {channels.map((channel) => (
          <Nav.Item key={channel.id} className="w-100">
            <Button
              onClick={handleChannelClick(channel.id)}
              className="text-start w-100 rounded-0"
              variant={channel.id === currentChannelId ? 'secondary' : ''}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default Channels;
