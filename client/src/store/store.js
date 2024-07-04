import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "../features/storeSlice";

export const store = configureStore({
  reducer: storeReducer,
});
