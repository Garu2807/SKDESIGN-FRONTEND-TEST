import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserState from './types/UserState';
import * as api from './api';
const initialState: UserState = {
  users: [],
};
export const loadUsers = createAsyncThunk('users/loadUsers', () => {
  return api.loadUsers();
});
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(loadUsers.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});

export const {} = UserSlice.actions;

export default UserSlice.reducer;
