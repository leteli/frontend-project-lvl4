import React from 'react';
import { useSelector } from 'react-redux';
import {
  Col,
  Button,
} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';

const Messages = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  console.log(messages);
  const currentChannel = useSelector((state) => {
    const { currentChannelId } = state.channels;
    console.log(currentChannelId);
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
          {messages.length > 0 && messages.map((m) => (
            <div className="text-break mb-2">
              <b>{m.author}</b>
              :
              {m.text}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            initialValues={{
              body: '',
            }}
            onSubmit={{}}
          >
            <Form className="py-1 border rounded-2">
              <div className="input-group">
                <Field
                  name="body"
                  className="form-control border-0 p-0 ps-2"
                  placeholder="Введите сообщение..."
                  aria-label="Новое сообщение"
                />
                <Button type="submit" disabled variant="" className="btn-group-vertical">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                  </svg>
                  <span className="visually-hidden">Отправить</span>
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
