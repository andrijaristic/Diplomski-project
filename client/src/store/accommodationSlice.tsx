/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IAccommodation,
  IAccommodationDisplay,
  ISearchParams,
} from "../shared/interfaces/accommodationInterfaces";
import { ApiCallState } from "../shared/types/enumerations";
import { defaultErrorMessage } from "../constants/Constants";
import { errorNotification } from "../utils/toastNotificationUtil";
import { getAccommodations } from "../services/AccommodationService";

export interface AccommodationState {
  accommodations: IAccommodationDisplay[];
  ownerAccommodations: IAccommodationDisplay[];
  detailedAccommodation: IAccommodation | null;
  page: number;
  totalPages: number;
  apiState: ApiCallState;
}

const initialState: AccommodationState = {
  accommodations: [],
  ownerAccommodations: [],
  detailedAccommodation: null,
  page: 1,
  totalPages: 10,
  apiState: ApiCallState.COMPLETED,
};

export const getAccommodationsAction = createAsyncThunk(
  "accommodations/getAccommodations",
  async (query: ISearchParams, thunkApi) => {
    try {
      const response = await getAccommodations(query);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const accommodationSlice = createSlice({
  name: "accommodation",
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearAccommodations(state) {
      state.accommodations = [];
      state.page = 1;
      state.totalPages = 0;
      state.apiState = ApiCallState.COMPLETED;
    },
    clearOwnerAccommodations(state) {
      state.ownerAccommodations = [];
      state.page = 1;
      state.totalPages = 0;
      state.apiState = ApiCallState.COMPLETED;
    },
    clearDetailedAccommodations(state) {
      state.detailedAccommodation = null;
      state.apiState = ApiCallState.COMPLETED;
    },
  },
  extraReducers: (builder) => {
    // GET ACCOMMODATIONS
    builder.addCase(getAccommodationsAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(getAccommodationsAction.fulfilled, (state, action) => {
      state.apiState = ApiCallState.COMPLETED;

      state.accommodations = [...action.payload.items];
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(getAccommodationsAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });
  },
});

export const {
  changePage,
  clearAccommodations,
  clearOwnerAccommodations,
  clearDetailedAccommodations,
} = accommodationSlice.actions;
export default accommodationSlice.reducer;
