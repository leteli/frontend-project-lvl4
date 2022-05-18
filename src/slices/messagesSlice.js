import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import fetchData from './fetchData.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        messagesAdapter.setAll(state, action.payload.messages);
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export const sendNewMessage = (newMessage) => async (dispatch) => {
  const socket = io();
  try {
    await socket.emit('newMessage', newMessage, (response) => {
      console.log(response.status);
      if (response.status !== 'ok') {
        throw new Error('Network error: message delivery failed');
      }
    });
    await socket.on('newMessage', (response) => {
      console.log(response);
      dispatch(messagesSlice.actions.addMessage(response));
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
