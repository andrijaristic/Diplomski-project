/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IRoom,
  IRoomSearch,
  IRoomSearchDisplay,
} from "../shared/interfaces/roomInterfaces";
import { ApiCallState } from "../shared/types/enumerations";
import { getFilteredRooms } from "../services/RoomService";
import { defaultErrorMessage } from "../constants/Constants";
import { errorNotification } from "../utils/toastNotificationUtil";

export interface RoomState {
  rooms: IRoom[];
  bookingRooms: IRoomSearchDisplay[];
  apiState: ApiCallState;
}

const initialState: RoomState = {
  rooms: [],
  bookingRooms: [],
  apiState: ApiCallState.COMPLETED,
};

export const getFilteredRoomsAction = createAsyncThunk(
  "reservations/getUserReservations",
  async (roomSearch: IRoomSearch, thunkApi) => {
    try {
      const response = await getFilteredRooms(roomSearch);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearBookingRooms(state) {
      state.bookingRooms = [];
      state.apiState = ApiCallState.COMPLETED;
    },
    clearRooms(state) {
      state.rooms = [];
      state.apiState = ApiCallState.COMPLETED;
    },
  },
  extraReducers: (builder) => {
    // FILTER ROOMS
    builder.addCase(getFilteredRoomsAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(getFilteredRoomsAction.fulfilled, (state, action) => {
      state.apiState = ApiCallState.COMPLETED;
      state.bookingRooms = [...action.payload];
    });
    builder.addCase(getFilteredRoomsAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });
  },
});

export const { clearBookingRooms, clearRooms } = roomSlice.actions;
export default roomSlice.reducer;
