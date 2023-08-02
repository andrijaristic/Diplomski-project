import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiCallState } from "../shared/types/enumerations";
import {
  IAuth,
  IExternalLogin,
  IUserLogin,
} from "../shared/interfaces/userInterfaces";
import { externalLogin, login } from "../services/UserService";
import { defaultErrorMessage } from "../constants/Constants";
import { errorNotification } from "../utils/toastNotificationUtil";

export interface UserState {
  token: string | null;
  isLoggedIn: boolean;
  apiState: ApiCallState;
}

const initialState: UserState = {
  token: localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") !== null,
  apiState: ApiCallState.COMPLETED,
};

export const loginAction = createAsyncThunk(
  "user/login",
  async (user: IUserLogin, thunkApi) => {
    try {
      const response = await login(user);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const externalLoginAction = createAsyncThunk(
  "user/external-login",
  async (loginData: IExternalLogin, thunkApi) => {
    try {
      const response = await externalLogin(loginData);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    receivedToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setToken("token", action.payload);
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(
      loginAction.fulfilled,
      (state, action: PayloadAction<IAuth>) => {
        state.apiState = ApiCallState.COMPLETED;
        const token = action.payload.token;

        state.token = token;
        state.isLoggedIn = true;
        localStorage.setItem("token", token);
      }
    );
    builder.addCase(loginAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });

    // SOCIAL MEDIAL LOGIN
    builder.addCase(externalLoginAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(externalLoginAction.fulfilled, (state, action) => {
      state.apiState = ApiCallState.COMPLETED;
      const token = action.payload.token;

      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem("token", token);
    });
    builder.addCase(externalLoginAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });
  },
});

export const { receivedToken } = userSlice.actions;
export default userSlice.reducer;
