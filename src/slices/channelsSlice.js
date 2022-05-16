/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: '',
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  // reducers: {
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.currentChannelId = action.payload.currentChannelId;
        channelsAdapter.setAll(state, action.payload.channels);
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
