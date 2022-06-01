import { useContext } from 'react';
import { socketContext } from '../index.js';

const useSocket = () => useContext(socketContext);

export default useSocket;
