/* eslint-disable react/jsx-filename-extension */
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import init from './init.jsx';

const socket = io();

const vdom = init(socket);

const root = ReactDOM.createRoot(document.getElementById('chat'));

root.render(vdom);
