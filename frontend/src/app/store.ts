import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appartamentsApi } from "../services/appartments";
import { appartmentSlice } from "../components/features/editingAppartment";

export const store = configureStore({
  reducer: {
    [appartamentsApi.reducerPath]: appartamentsApi.reducer,
    appartment: appartmentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appartamentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
