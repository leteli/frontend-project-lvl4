const buildChatApi = (socket) => {
  const sendNewMessage = async (newMessage) => {
    await socket.emit('newMessage', newMessage, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: message delivery failed');
      }
    });
  };
  const addNewChannel = async (newChannel) => {
    await socket.emit('newChannel', newChannel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel adding failed');
      }
    });
  };
  const removeChannel = async (channel) => {
    await socket.emit('removeChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel removing failed');
      }
    });
  };
  const renameChannel = async (channel) => {
    await socket.emit('renameChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel renaming failed');
      }
    });
  };

  return {
    sendNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};

export default buildChatApi;