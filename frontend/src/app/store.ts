import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appartamentsApi } from "../services/appartments";

export const store = configureStore({
  reducer: {
    [appartamentsApi.reducerPath]: appartamentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appartamentsApi.middleware),
});

setupListeners(store.dispatch);
