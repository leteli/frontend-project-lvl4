import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { getAuthHeader } from '../contexts/auth.jsx';
import routes from '../routes.js';

const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const { data } = await axios.get(routes.dataPath(), {
      headers: getAuthHeader(),
    });
    return data;
  },
);

export default fetchData;
