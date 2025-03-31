import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postsReducer from './postsSlice';
import newsReducer from './newsSlice';
import profileRedux from "./profileRedux";
import toastReducer from "./toastSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    news: newsReducer,
    profile: profileRedux,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

