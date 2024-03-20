import { configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import optionsReducer from "./reducer/options";
import preferenceReducer from "./reducer/preference";

const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    console.log(result);
    localStorage.setItem("applicationState", JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem("applicationState") !== null) {
    return JSON.parse(localStorage.getItem("applicationState") ?? "{}"); // re-hydrate the store
  }
};

const store = configureStore({
  reducer: {
    options: optionsReducer,
    preference: preferenceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: reHydrateStore,
});

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
