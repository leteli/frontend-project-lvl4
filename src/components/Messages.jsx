import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';

import MessageForm from './MessageForm.jsx';

const Messages = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  console.log(messages);
  const currentChannel = useSelector((state) => {
    const { currentChannelId } = state.channels;
    return channelsSelectors.selectById(state, currentChannelId);
  });

  return currentChannel && (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{currentChannel.name}</b>
          </p>
          <span className="text-muted">
            {messages.length}
            сообщений
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.length > 0 && messages.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              <span> : </span>
              {message.body}
            </div>
          ))}
        </div>
        <MessageForm />
      </div>
    </Col>
  );
};

export default Messages;
