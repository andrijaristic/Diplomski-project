import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import accommodationReducer from "./accommodationSlice";
import commentReducer from "./commentSlice";
import reservationReducer from "./reservationSlice";
import roomTypeReducer from "./roomTypeSlice";
import roomReducer from "./roomSlice";
import amenityReducer from "./amenitySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    rooms: roomReducer,
    comments: commentReducer,
    amenities: amenityReducer,
    roomTypes: roomTypeReducer,
    reservations: reservationReducer,
    accommodations: accommodationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
