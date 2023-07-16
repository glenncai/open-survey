import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserStateType = {
  username: string;
  nickname: string;
};

const initialState: UserStateType = { username: '', nickname: '' };

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReducer: (state, action: PayloadAction<UserStateType>) => {
      state.username = action.payload.username;
      state.nickname = action.payload.nickname;
    },
    logoutReducer: state => {
      state.username = '';
      state.nickname = '';
    },
  },
});

export const { loginReducer, logoutReducer } = usersSlice.actions;

export default usersSlice.reducer;
