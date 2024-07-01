import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import localeReducer from './localeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    locale: localeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
