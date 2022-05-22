/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: '',
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      const id = action.payload;
      console.log(id);
      state.currentChannelId = id;
    },
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
  },
});

export const addNewChannel = (newChannel) => async (dispatch) => {
  const socket = io();
  try {
    await socket.emit('newChannel', newChannel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel adding failed');
      }
      console.log(response.data);
      const { data } = response;
      dispatch(channelsSlice.actions.addChannel(data));
      dispatch(channelsSlice.actions.setCurrentChannel(data.id));
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const removeChannel = (channel) => async (dispatch) => {
  const socket = io();
  try {
    await socket.emit('removeChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel adding failed');
      }
    });
    await socket.on('removeChannel', ({ id }) => {
      console.log(id);
      dispatch(channelsSlice.actions.removeChannel(id));
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const renameChannel = (channel) => async (dispatch) => {
  const socket = io();
  try {
    await socket.emit('renameChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Network error: channel adding failed');
      }
    });
    await socket.on('renameChannel', ({ id, name }) => {
      dispatch(channelsSlice.actions.updateChannel({ id, changes: { name } }));
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const { actions } = channelsSlice;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
