/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAmenities } from "../services/AmenityService";
import { IAmenity } from "../shared/interfaces/amenityInterfaces";
import { ApiCallState } from "../shared/types/enumerations";
import { defaultErrorMessage } from "../constants/Constants";
import { errorNotification } from "../utils/toastNotificationUtil";

export interface AmenityState {
  amenities: IAmenity[];
  apiState: ApiCallState;
}

const initialState: AmenityState = {
  amenities: [],
  apiState: ApiCallState.COMPLETED,
};

export const getAllAmenitiesAction = createAsyncThunk(
  "amenities/getAll",
  async (id: null, thunkApi) => {
    try {
      const response = await getAllAmenities();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const amenitySlice = createSlice({
  name: "amenity",
  initialState,
  reducers: {
    clearAmenities(state) {
      state.amenities = [];
      state.apiState = ApiCallState.COMPLETED;
    },
  },
  extraReducers: (builder) => {
    // GET AMENITIES
    builder.addCase(getAllAmenitiesAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(getAllAmenitiesAction.fulfilled, (state, action) => {
      state.amenities = [...action.payload];
      state.apiState = ApiCallState.COMPLETED;
    });
    builder.addCase(getAllAmenitiesAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });
  },
});

export const { clearAmenities } = amenitySlice.actions;
export default amenitySlice.reducer;
