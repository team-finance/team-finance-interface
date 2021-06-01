import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { load, save } from "redux-localstorage-simple";
import settingsReducer from "./settings";
import walletReducer from "./walletConnect";
import lockupReducer from "./lockups";
const PERSISTED_KEYS: string[] = ["settings", "wallets"];

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    wallets: walletReducer,
    lockups: lockupReducer,
  },
  devTools: true,
  middleware: [
    ...getDefaultMiddleware({ thunk: true }),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<any>();

export default store;
