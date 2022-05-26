/* eslint-disable react/jsx-filename-extension */
import ReactDOM from 'react-dom/client';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import init from './init.jsx';
import { socketInstance } from './contexts/sockets.js';

const vdom = init(socketInstance);

const root = ReactDOM.createRoot(document.getElementById('chat'));

root.render(vdom);
