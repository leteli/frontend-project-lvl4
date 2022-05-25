/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

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

export const { actions } = channelsSlice;

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
