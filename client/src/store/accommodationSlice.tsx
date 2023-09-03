/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IAccommodation,
  IAccommodationDisplay,
  ISearchParams,
} from "../shared/interfaces/accommodationInterfaces";
import { ApiCallState } from "../shared/types/enumerations";
import { defaultErrorMessage } from "../constants/Constants";
import {
  errorNotification,
  successNotification,
} from "../utils/toastNotificationUtil";
import {
  createNewAccommodation,
  getAccommodationById,
  getAccommodations,
  getUserAccommodations,
} from "../services/AccommodationService";

export interface AccommodationState {
  accommodations: IAccommodationDisplay[];
  userAccommodations: IAccommodationDisplay[];
  detailedAccommodation: IAccommodation | null;
  createdAccommodationId: string | null;
  page: number;
  totalPages: number;
  apiState: ApiCallState;
}

const initialState: AccommodationState = {
  accommodations: [],
  userAccommodations: [],
  detailedAccommodation: null,
  createdAccommodationId: null,
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

export const getUserAccommodationsAction = createAsyncThunk(
  "accommodations/getUserAccommodations",
  async (id: string, thunkApi) => {
    try {
      const response = await getUserAccommodations(id);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getAccommodationByIdAction = createAsyncThunk(
  "accommodations/getAccommodationById",
  async (id: string, thunkApi) => {
    try {
      const response = await getAccommodationById(id);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const createNewAccommodationAction = createAsyncThunk(
  "accommodations/newAccommodation",
  async (newAccommodation: FormData, thunkApi) => {
    try {
      const response = await createNewAccommodation(newAccommodation);
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
      state.userAccommodations = [];
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

    // GET USER ACCOMMODATIONS
    builder.addCase(getUserAccommodationsAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(getUserAccommodationsAction.fulfilled, (state, action) => {
      state.apiState = ApiCallState.COMPLETED;
      state.userAccommodations = [...action.payload];
    });
    builder.addCase(getUserAccommodationsAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });

    // GET ACCOMMODATION BY ID
    builder.addCase(getAccommodationByIdAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(getAccommodationByIdAction.fulfilled, (state, action) => {
      state.apiState = ApiCallState.COMPLETED;
      state.detailedAccommodation = action.payload;
    });
    builder.addCase(getAccommodationByIdAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });

    // CREATE NEW ACCOMMODATION
    builder.addCase(createNewAccommodationAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(createNewAccommodationAction.fulfilled, (state, action) => {
      state.apiState = ApiCallState.COMPLETED;
      state.createdAccommodationId = action.payload.id;
      successNotification(
        "Successfully created new accommodation. Please add some rooms"
      );
    });
    builder.addCase(createNewAccommodationAction.rejected, (state, action) => {
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
