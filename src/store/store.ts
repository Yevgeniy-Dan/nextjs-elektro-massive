import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";
import signInModalReducer from "./signInModalSlice";

export const store = configureStore({
  reducer: {
    store: storeReducer,
    signInModal: signInModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
