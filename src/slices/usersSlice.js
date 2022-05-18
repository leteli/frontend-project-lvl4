/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    usernames: [],
  },
  reducers: {
    addUser: (state, action) => {
      if (!state.usernames.includes(action.payload)) {
        state.usernames.push(action.payload);
      }
    },
  },
});

export const { actions } = usersSlice;

export default usersSlice.reducer;
