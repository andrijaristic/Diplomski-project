/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiCallState } from "../shared/types/enumerations";
import { defaultErrorMessage } from "../constants/Constants";
import { errorNotification } from "../utils/toastNotificationUtil";
import { createNewRoomType } from "../services/RoomTypeService";
import { INewRoomType } from "../shared/interfaces/roomTypeInterfaces";

export interface RoomTypeState {
  apiState: ApiCallState;
}

const initialState: RoomTypeState = {
  apiState: ApiCallState.COMPLETED,
};

export const createNewRoomTypeAction = createAsyncThunk(
  "roomTypes/newRoomType",
  async (newRoomType: INewRoomType, thunkApi) => {
    try {
      const response = await createNewRoomType(newRoomType);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const roomTypeSlice = createSlice({
  name: "roomTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET USER RESERVATIONS
    builder.addCase(createNewRoomTypeAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(createNewRoomTypeAction.fulfilled, (state) => {
      state.apiState = ApiCallState.COMPLETED;
    });
    builder.addCase(createNewRoomTypeAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });
  },
});

export default roomTypeSlice.reducer;
