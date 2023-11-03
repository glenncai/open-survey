import { configureStore } from '@reduxjs/toolkit';
import { usersSlice, UserStateType } from '@/store/features/user/usersSlice.ts';
import { componentsSlice, ComponentStateType } from '@/store/features/component/componentsSlice.ts';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    components: componentsSlice.reducer,
  },
});

export type StoreStateType = {
  users: UserStateType;
  components: ComponentStateType;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
