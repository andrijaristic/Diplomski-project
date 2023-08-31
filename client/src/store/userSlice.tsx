import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiCallState } from "../shared/types/enumerations";
import {
  IAuth,
  IDisplayUser,
  IExternalLogin,
  IUserLogin,
  IUserRegistration,
} from "../shared/interfaces/userInterfaces";
import {
  externalLogin,
  getUserById,
  login,
  register,
} from "../services/UserService";
import { defaultErrorMessage } from "../constants/Constants";
import {
  errorNotification,
  successNotification,
} from "../utils/toastNotificationUtil";
import { localStorageJsonParse } from "../utils/localStorageFetchUtil";

export interface UserState {
  token: string | null;
  user: IDisplayUser | null;
  isLoggedIn: boolean;
  apiState: ApiCallState;
}

const initialState: UserState = {
  token: localStorage.getItem("token"),
  user: localStorageJsonParse("user"),
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

export const registerAction = createAsyncThunk(
  "user/register",
  async (userRegistration: IUserRegistration, thunkApi) => {
    try {
      const response = await register(userRegistration);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const getUserByIdAction = createAsyncThunk(
  "user/getById",
  async (id: string, thunkApi) => {
    try {
      const response = await getUserById(id);
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
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
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

    // REGISTER
    builder.addCase(registerAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(registerAction.fulfilled, (state) => {
      state.apiState = ApiCallState.COMPLETED;
      successNotification("You have successfully registered!");
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });

    // GET USER BY ID
    builder.addCase(getUserByIdAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(getUserByIdAction.fulfilled, (state, action) => {
      state.apiState = ApiCallState.COMPLETED;

      state.user = { ...action.payload };
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(getUserByIdAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });
  },
});

export const { receivedToken, logout } = userSlice.actions;
export default userSlice.reducer;
