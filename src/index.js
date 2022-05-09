import 'core-js/stable/index.js'; // зачем?
import 'regenerator-runtime/runtime.js'; // зачем?

import '../assets/application.scss'; // зачем?

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') { // зачем?
  localStorage.debug = 'chat:*';
}

const root = ReactDOM.createRoot(document.getElementById('chat'));
// eslint-disable-next-line react/jsx-filename-extension
root.render(<App />);
