import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import accommodationsReducer from "./accommodationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    accommodations: accommodationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
