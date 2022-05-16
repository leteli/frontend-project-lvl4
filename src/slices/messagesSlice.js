import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  // reducers: {
  // },
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

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
