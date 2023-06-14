import { configureStore, combineReducers } from "@reduxjs/toolkit";

import window from 'features/Window';
import speak from 'features/Speak'

export const reducer = combineReducers({
  window,
  speak
})

const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;