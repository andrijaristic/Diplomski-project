import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import accommodationReducer from "./accommodationSlice";
import commentReducer from "./commentSlice";
import reservationReducer from "./reservationSlice";
import roomTypeReducer from "./roomTypeSlice";
import roomReducer from "./roomSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    accommodations: accommodationReducer,
    comments: commentReducer,
    reservations: reservationReducer,
    roomTypes: roomTypeReducer,
    rooms: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
