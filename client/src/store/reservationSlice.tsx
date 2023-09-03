/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  INewReservation,
  IReservationDisplay,
} from "../shared/interfaces/reservationInterface";
import { ApiCallState } from "../shared/types/enumerations";
import {
  createReservation,
  getUserReservations,
} from "../services/ReservationService";
import { defaultErrorMessage } from "../constants/Constants";
import {
  errorNotification,
  successNotification,
} from "../utils/toastNotificationUtil";

export interface ReservationState {
  reservations: IReservationDisplay[];
  stripeUrl: string;
  apiState: ApiCallState;
}

const initialState: ReservationState = {
  reservations: [],
  stripeUrl: "",
  apiState: ApiCallState.COMPLETED,
};

export const getUserReservationsAction = createAsyncThunk(
  "reservations/getUserReservations",
  async (id: string, thunkApi) => {
    try {
      const response = await getUserReservations(id);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const createReservationAction = createAsyncThunk(
  "reservations/newReservation",
  async (newReservation: INewReservation, thunkApi) => {
    try {
      const response = await createReservation(newReservation);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET USER RESERVATIONS
    builder.addCase(getUserReservationsAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(getUserReservationsAction.fulfilled, (state, action) => {
      state.apiState = ApiCallState.COMPLETED;
      state.reservations = [...action.payload];
    });
    builder.addCase(getUserReservationsAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });

    // CREATE RESERVATION
    builder.addCase(createReservationAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(createReservationAction.fulfilled, (state, action) => {
      state.apiState = ApiCallState.COMPLETED;
      state.stripeUrl = action.payload;
      successNotification("Succesfully made your reservation!");
    });
    builder.addCase(createReservationAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });
  },
});

export default reservationSlice.reducer;
