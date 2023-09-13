/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IComment, INewComment } from "../shared/interfaces/commentInterfaces";
import {
  createComment,
  getAccommodationComments,
  getUserComments,
} from "../services/CommentService";
import { ApiCallState } from "../shared/types/enumerations";
import { defaultErrorMessage } from "../constants/Constants";
import {
  errorNotification,
  successNotification,
} from "../utils/toastNotificationUtil";

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
  async (userId: string, thunkApi) => {
    try {
      const response = await getUserComments(userId);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const createCommentAction = createAsyncThunk(
  "comments/createComment",
  async (newComment: INewComment, thunkApi) => {
    try {
      const response = await createComment(newComment);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearAccommodationComments(state) {
      state.accommodationComments = [];
      state.apiState = ApiCallState.COMPLETED;
    },
  },
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

    // CREATE COMMENT
    builder.addCase(createCommentAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(createCommentAction.fulfilled, (state) => {
      state.apiState = ApiCallState.COMPLETED;
      successNotification("Successfully left a comment");
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });
  },
});

export const { clearAccommodationComments } = commentSlice.actions;
export default commentSlice.reducer;
