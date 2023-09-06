/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiCallState } from "../shared/types/enumerations";
import {
  IAuth,
  IDisplayUser,
  IExternalLogin,
  IPasswordChangeData,
  IUserLogin,
  IUserRegistration,
  IUserUpdate,
  IUserVerification,
} from "../shared/interfaces/userInterfaces";
import {
  externalLogin,
  getUnverifiedUsers,
  getUserById,
  login,
  passwordChange,
  register,
  sendUserVerification,
  update,
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
  unverifiedUsers: IDisplayUser[];
  isLoggedIn: boolean;
  apiState: ApiCallState;
}

const initialState: UserState = {
  token: localStorage.getItem("token"),
  user: localStorageJsonParse("user"),
  unverifiedUsers: [],
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

export const updateAction = createAsyncThunk(
  "user/update",
  async (userUpdate: IUserUpdate, thunkApi) => {
    try {
      const response = await update(userUpdate);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const passwordChangeAction = createAsyncThunk(
  "user/change-password",
  async (passwordChangeData: IPasswordChangeData, thunkApi) => {
    try {
      const response = await passwordChange(
        passwordChangeData.id,
        passwordChangeData.body
      );
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

export const getUnverifiedUsersAction = createAsyncThunk(
  "user/getUnverified",
  async (id: string, thunkApi) => {
    try {
      const response = await getUnverifiedUsers();
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const sendUserVerificationAction = createAsyncThunk(
  "user/sendVerification",
  async (userVerification: IUserVerification, thunkApi) => {
    try {
      const response = await sendUserVerification(
        userVerification.id,
        userVerification.isAccepted
      );
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
    clearUnverifiedUsers(state) {
      state.unverifiedUsers = [];
      state.apiState = ApiCallState.COMPLETED;
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

    // UPDATE
    builder.addCase(updateAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(updateAction.fulfilled, (state, action) => {
      state.apiState = ApiCallState.COMPLETED;
      successNotification("You have successfully updated your information!");

      state.user = { ...action.payload };
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(updateAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });

    // PASSWORD CHANGE
    builder.addCase(passwordChangeAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(passwordChangeAction.fulfilled, (state) => {
      state.apiState = ApiCallState.COMPLETED;
      successNotification("You have successfully changed your password!");
    });
    builder.addCase(passwordChangeAction.rejected, (state, action) => {
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

    // GET UNVERIFIED USERS
    builder.addCase(getUnverifiedUsersAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(getUnverifiedUsersAction.fulfilled, (state, action) => {
      state.apiState = ApiCallState.COMPLETED;

      state.unverifiedUsers = [...action.payload];
    });
    builder.addCase(getUnverifiedUsersAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });

    // SEND USER VERIFICATION
    builder.addCase(sendUserVerificationAction.pending, (state) => {
      state.apiState = ApiCallState.PENDING;
    });
    builder.addCase(sendUserVerificationAction.fulfilled, (state) => {
      state.apiState = ApiCallState.COMPLETED;
      successNotification("Successfully send new verification status");
    });
    builder.addCase(sendUserVerificationAction.rejected, (state, action) => {
      state.apiState = ApiCallState.REJECTED;

      let error: string = defaultErrorMessage;
      if (typeof action.payload === "string") {
        error = action.payload;
      }
      errorNotification(error);
    });
  },
});

export const { receivedToken, logout, clearUnverifiedUsers } =
  userSlice.actions;
export default userSlice.reducer;
