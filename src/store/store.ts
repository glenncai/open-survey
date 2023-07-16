import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from '@/store/features/user/usersSlice.ts';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
