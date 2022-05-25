/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

import { socketContext, buildSocketApi } from './contexts/sockets.js';
import App from './components/App.jsx';
import ru from '../assets/ru.js';

import channelsReducer, { actions as channelsActions } from './slices/channelsSlice.js';
import messagesReducer, { actions as messagesActions } from './slices/messagesSlice.js';
import modalsReducer from './slices/modalsSlice.js';

const init = () => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      modals: modalsReducer,
    },
  });

  const socket = io();
  const socketApi = buildSocketApi(socket);

  socket.on('newMessage', (response) => {
    store.dispatch(messagesActions.addMessage(response));
  });

  socket.on('newChannel', (response) => {
    store.dispatch(channelsActions.addChannel(response));
    store.dispatch(channelsActions.setCurrentChannel(response.id));
  });

  socket.on('removeChannel', ({ id }) => {
    console.log(id);
    store.dispatch(channelsActions.removeChannel(id));
  });

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(channelsActions.updateChannel({ id, changes: { name } }));
  });

  i18n
    .use(initReactI18next)
    .init({
      resources: { ru },
      lng: 'ru',
    });

  const root = ReactDOM.createRoot(document.getElementById('chat'));

  root.render(
    <Provider store={store}>
      <socketContext.Provider value={socketApi}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </socketContext.Provider>
    </Provider>,
  );
};

export default init;
