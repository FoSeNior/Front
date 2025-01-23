import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  accessToken: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {},
});

export default userSlice;
