import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import accommodationReducer from "./accommodationSlice";
import commentReducer from "./commentSlice";
import reservationReducer from "./reservationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    accommodations: accommodationReducer,
    comments: commentReducer,
    reservations: reservationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
