/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-filename-extension */
import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import init from './init.jsx';

const socket = io();
export const socketContext = createContext();
export const authContext = createContext();

const vdom = init(socket);

const root = ReactDOM.createRoot(document.getElementById('chat'));

root.render(vdom);
