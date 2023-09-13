/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiCallState } from "../shared/types/enumerations";
import { defaultErrorMessage } from "../constants/Constants";
import {
  errorNotification,
  successNotification,
} from "../utils/toastNotificationUtil";
import {
  createNewRoomType,
  getRoomTypesForAccommodation,
  updateRoomType,
} from "../services/RoomTypeService";
import {
  INewRoomType,
  IRoomTypeDisplay,
  IUpdateRoomType,
} from "../shared/interfaces/roomTypeInterfaces";

export interface RoomTypeState {
  roomTypes: IRoomTypeDisplay[];
  apiState: ApiCallState;
}

const initialState: RoomTypeState = {
  roomTypes: [],
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

export const getRoomTypesForAccommodationAction = createAsyncThunk(
  "roomTypes/getRoomTypesForAccommodation",
  async (id: string, thunkApi) => {
    try {
      const response = await getRoomTypesForAccommodation(id);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const updateRoomTypeAction = createAsyncThunk(
  "roomTypes/updateRoomType",
  async (updatRoomTypeData: IUpdateRoomType, thunkApi) => {
    try {
      const response = await updateRoomType(updatRoomTypeData);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const roomTypeSlice = createSlice({
  name: "roomTypes",
  initialState,
  reducers: {
    clearRoomTypes(state) {
      state.roomTypes = [];
      state.apiState = ApiCallState.COMPLETED;
    },
  },
  extraReducers: (builder) => {
    // CREATE NEW ROOM TYPE ACTION
    builder.addCase(createNewRoomTypeAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(createNewRoomTypeAction.fulfilled, (state) => {
      state.apiState = ApiCallState.COMPLETED;
      successNotification("Succesfully added new room type!");
    });
    builder.addCase(createNewRoomTypeAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });

    // GET ROOM TYPES FOR ACCOMMODATION
    builder.addCase(getRoomTypesForAccommodationAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(
      getRoomTypesForAccommodationAction.fulfilled,
      (state, action) => {
        state.apiState = ApiCallState.COMPLETED;
        state.roomTypes = [...action.payload];
      }
    );
    builder.addCase(
      getRoomTypesForAccommodationAction.rejected,
      (state, action) => {
        state.apiState = ApiCallState.REJECTED;

        let error: string = defaultErrorMessage;
        if (typeof action.payload === "string") {
          error = action.payload;
        }
        errorNotification(error);
      }
    );

    // UPDATE ROOM TYPE
    builder.addCase(updateRoomTypeAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(updateRoomTypeAction.fulfilled, (state) => {
      state.apiState = ApiCallState.COMPLETED;
      successNotification("Successfully updated room type price list");
    });
    builder.addCase(updateRoomTypeAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });
  },
});

export const { clearRoomTypes } = roomTypeSlice.actions;
export default roomTypeSlice.reducer;
