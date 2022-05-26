/* eslint-disable react/jsx-filename-extension */
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import init from './init.jsx';
import { socketInstance } from './contexts/sockets.js';

init(socketInstance);
