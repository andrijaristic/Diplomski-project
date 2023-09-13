/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  INewReservation,
  IReservationDisplay,
} from "../shared/interfaces/reservationInterface";
import { ApiCallState } from "../shared/types/enumerations";
import {
  cancelReservation,
  createInPersonPaymentReservation,
  createOnlinePaymentReservation,
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
  successfulReservation: boolean;
  apiState: ApiCallState;
}

const initialState: ReservationState = {
  reservations: [],
  stripeUrl: "",
  successfulReservation: false,
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

export const createOnlinePaymentReservationAction = createAsyncThunk(
  "reservations/onlinePayment",
  async (newReservation: INewReservation, thunkApi) => {
    try {
      const response = await createOnlinePaymentReservation(newReservation);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const createInPersonPaymentReservationAction = createAsyncThunk(
  "reservations/inPersonPayment",
  async (newReservation: INewReservation, thunkApi) => {
    try {
      const response = await createInPersonPaymentReservation(newReservation);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const cancelReservationAction = createAsyncThunk(
  "reservations/cancelReservation",
  async (id: string, thunkApi) => {
    try {
      const response = await cancelReservation(id);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    clearSuccessfulReservation(state) {
      state.successfulReservation = false;
      state.apiState = ApiCallState.COMPLETED;
    },
  },
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

    // CREATE ONLINE PAYMENT RESERVATION
    builder.addCase(createOnlinePaymentReservationAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(
      createOnlinePaymentReservationAction.fulfilled,
      (state, action) => {
        state.apiState = ApiCallState.COMPLETED;
        state.stripeUrl = action.payload;
        successNotification("Succesfully made your reservation!");
      }
    );
    builder.addCase(
      createOnlinePaymentReservationAction.rejected,
      (state, action) => {
        state.apiState = ApiCallState.REJECTED;

        let error: string = defaultErrorMessage;
        if (typeof action.payload === "string") {
          error = action.payload;
        }
        errorNotification(error);
      }
    );

    // CREATE IN PERSON PAYMENT RESERVATION
    builder.addCase(createInPersonPaymentReservationAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(
      createInPersonPaymentReservationAction.fulfilled,
      (state) => {
        state.apiState = ApiCallState.COMPLETED;
        state.successfulReservation = true;
        successNotification("Succesfully made your reservation!");
      }
    );
    builder.addCase(
      createInPersonPaymentReservationAction.rejected,
      (state, action) => {
        state.apiState = ApiCallState.REJECTED;

        let error: string = defaultErrorMessage;
        if (typeof action.payload === "string") {
          error = action.payload;
        }
        errorNotification(error);
      }
    );

    // CANCEL RESERVATION
    builder.addCase(cancelReservationAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(cancelReservationAction.fulfilled, (state) => {
      state.apiState = ApiCallState.COMPLETED;
      successNotification("Succesfully cancelled your reservation");
    });
    builder.addCase(cancelReservationAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });
  },
});

export const { clearSuccessfulReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
