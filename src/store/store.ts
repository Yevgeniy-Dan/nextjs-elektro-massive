import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";
import signInModalReducer from "./signInModalSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productGridReducer from "./productGridSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["productGrid"],
};

const persistedReducer = persistReducer(persistConfig, productGridReducer);

export const store = configureStore({
  reducer: {
    store: storeReducer,
    signInModal: signInModalReducer,
    productGrid: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
