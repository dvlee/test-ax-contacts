import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './api/contactsApi.ts';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(
    contactsApi.middleware
  ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
