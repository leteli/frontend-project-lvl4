import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

import { actions as channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, action) => {
        const channelId = action.payload;
        const restMessages = Object.values(state.entities)
          .filter((c) => c.channelId !== channelId);
        messagesAdapter.setAll(state, restMessages);
      });
  },
});

export const sendNewMessage = (newMessage) => async (dispatch) => {
  const socket = io();
  try {
    await socket.emit('newMessage', newMessage, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: message delivery failed');
      }
    });
    await socket.on('newMessage', (response) => {
      dispatch(messagesSlice.actions.addMessage(response));
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
