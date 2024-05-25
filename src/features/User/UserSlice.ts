// UserSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserState from './types/UserState';
import * as api from './api';

const initialState: UserState = {
  users: [],
  filteredUsers: [],
};

export const loadUsers = createAsyncThunk('users/loadUsers', () => {
  return api.loadUsers();
});

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    searchUser: (state, action) => {
      const searchTerm = action.payload.toLowerCase();

      const containsSubstring = (obj: any, substring: string): boolean => {
        if (typeof obj !== 'object' || obj === null) {
          return (
            typeof obj === 'string' &&
            obj.toLowerCase().includes(substring.toLowerCase())
          );
        }
        return Object.values(obj).some((val) =>
          containsSubstring(val, substring)
        );
      };

      state.filteredUsers = state.users.filter((user) =>
        containsSubstring(user, searchTerm)
      );
    },
    addUser: (state, action) => {
      const id = Math.floor(Math.random() * (1000 - 1)) + 1;
      const isAlreadyAdded = state.users.some((user) => user.id === id);
      if (!isAlreadyAdded) {
        state.users.push(action.payload);
        localStorage.setItem('usersState', JSON.stringify(state));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    });
    builder.addCase(loadUsers.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});

export const { searchUser, addUser } = UserSlice.actions;
export default UserSlice.reducer;
