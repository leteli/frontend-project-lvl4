/* eslint-disable react/jsx-filename-extension */
import 'core-js/stable/index.js'; // зачем?
import 'regenerator-runtime/runtime.js'; // зачем?

import '../assets/application.scss'; // зачем?

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import store from './slices/index.js';

if (process.env.NODE_ENV !== 'production') { // зачем?
  localStorage.debug = 'chat:*';
}

const root = ReactDOM.createRoot(document.getElementById('chat'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
