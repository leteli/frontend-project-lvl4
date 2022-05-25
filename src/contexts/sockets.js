import { createContext, useContext } from 'react';

export const socketContext = createContext();

export const buildSocketApi = (socket) => {
  const sendNewMessage = async (newMessage) => {
    try {
      await socket.emit('newMessage', newMessage, (response) => {
        if (response.status !== 'ok') {
          throw new Error('Network error: message delivery failed');
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const addNewChannel = async (newChannel) => {
    try {
      await socket.emit('newChannel', newChannel, (response) => {
        if (response.status !== 'ok') {
          throw new Error('Network error: channel adding failed');
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const removeChannel = async (channel) => {
    try {
      await socket.emit('removeChannel', channel, (response) => {
        if (response.status !== 'ok') {
          throw new Error('Network error: channel removing failed');
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const renameChannel = async (channel) => {
    try {
      await socket.emit('renameChannel', channel, (response) => {
        if (response.status !== 'ok') {
          throw new Error('Network error: channel renaming failed');
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return {
    sendNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};

const useSocket = () => useContext(socketContext);

export default useSocket;
