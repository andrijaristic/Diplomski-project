/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IComment } from "../shared/interfaces/commentInterfaces";
import { getAccommodationComments } from "../services/CommentService";
import { ApiCallState } from "../shared/types/enumerations";
import { defaultErrorMessage } from "../constants/Constants";
import { errorNotification } from "../utils/toastNotificationUtil";

export interface CommentState {
  accommodationComments: IComment[];
  userComments: IComment[];
  apiState: ApiCallState;
}

const initialState: CommentState = {
  accommodationComments: [],
  userComments: [],
  apiState: ApiCallState.COMPLETED,
};

export const getAccommodationCommentsAction = createAsyncThunk(
  "comments/getAccommodationComments",
  async (accommodationId: string, thunkApi) => {
    try {
      const response = await getAccommodationComments(accommodationId);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getUserCommentsAction = createAsyncThunk(
  "comments/getAccommodationComments",
  async (accommodationId: string, thunkApi) => {
    try {
      const response = await getAccommodationComments(accommodationId);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ACCOMMODATION COMMENTS
    builder.addCase(getAccommodationCommentsAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(
      getAccommodationCommentsAction.fulfilled,
      (state, action) => {
        state.apiState = ApiCallState.COMPLETED;
        state.accommodationComments = [...action.payload];
      }
    );
    builder.addCase(
      getAccommodationCommentsAction.rejected,
      (state, action) => {
        state.apiState = ApiCallState.REJECTED;

        let error: string = defaultErrorMessage;
        if (typeof action.payload === "string") {
          error = action.payload;
        }
        errorNotification(error);
      }
    );
  },
});

export default commentSlice.reducer;
