import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserState from './types/UserState';
import * as api from './api';
import shortid from 'shortid';
import { User } from './types/User';

const loadFromLocalStorage = (): UserState => {
  const data = localStorage.getItem('usersState');
  return data ? JSON.parse(data) : { users: [], filteredUsers: [] };
};

const initialState: UserState = loadFromLocalStorage();

export const loadUsers = createAsyncThunk<User[]>(
  'users/loadUsers',
  async () => {
    const usersFromApi = await api.loadUsers();
    return usersFromApi;
  }
);

const generateUniqueId = (existingIds: number[]): number => {
  let id;
  do {
    id = parseInt(shortid.generate().replace(/\D/g, '').slice(0, 3), 10);
  } while (existingIds.includes(id) || id > 1000);
  return id;
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    searchUser: (state, action: PayloadAction<string>) => {
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
    addUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      const existingIds = state.users.map((user) => user.id);
      const id = generateUniqueId(existingIds);
      const newUser = { ...action.payload, id };
      state.users.push(newUser);
      state.filteredUsers = state.users;
      localStorage.setItem('usersState', JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = [...state.users, ...action.payload];
        state.filteredUsers = state.users;
        localStorage.setItem('usersState', JSON.stringify(state));
      }
    );
    builder.addCase(loadUsers.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});

export const { searchUser, addUser } = UserSlice.actions;
export default UserSlice.reducer;
