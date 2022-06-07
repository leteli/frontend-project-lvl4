/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
// import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
// import Rollbar from 'rollbar';
import filter from 'leo-profanity';

import buildChatApi from './contexts/buildChatApi.js';
import AuthProvider from './components/AuthProvider.jsx';
import App from './components/App.jsx';
import ru from '../assets/ru.js';

import channelsReducer, { actions as channelsActions } from './slices/channelsSlice.js';
import messagesReducer, { actions as messagesActions } from './slices/messagesSlice.js';
import modalsReducer from './slices/modalsSlice.js';

const init = (socket, socketContext) => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      modals: modalsReducer,
    },
  });

  const chatApi = buildChatApi(socket);

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

  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  // const rollbarConfig = {
  //  accessToken: process.env.ROLLBAR_TOKEN,
  //  environment: 'production',
  // };

  // const rollbar = new Rollbar(rollbarConfig);
  // <RollbarProvider instance={rollbar}><ErrorBoundary></ErrorBoundary></RollbarProvider>

  return (
    <Provider store={store}>
      <socketContext.Provider value={chatApi}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </I18nextProvider>
      </socketContext.Provider>
    </Provider>
  );
};

export default init;
