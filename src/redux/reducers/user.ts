import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { User } from '../../types/user';

export type UserReducer = User | null;

const initialState: UserReducer = null;

export const userSlice = createSlice<
  UserReducer,
  SliceCaseReducers<UserReducer>,
  'user'
>({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => action.payload,
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
