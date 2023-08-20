import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { grey } from "@mui/material/colors";
import StyledButton from "../UI/Styled/StyledButton";
import Logo from "../UI/Logo/Logo";
import { useAppDispatch } from "../../store/hooks";
import { externalLoginAction, loginAction } from "../../store/userSlice";
import { IUserLogin } from "../../shared/interfaces/userInterfaces";
import {
  minPasswordLength,
  minUsernameLength,
} from "../../constants/Constants";
import { errorNotification } from "../../utils/toastNotificationUtil";
import styles from "./Login.module.css";

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
  const [isUsernameTouched, setIsUsernameTouched] = useState<boolean>(false);

  const [isPasswordValid, setIsPasswordValid] = useState<boolean>();
  const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUsernameValid(event.target.value.trim().length >= minUsernameLength);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordValid(event.target.value.trim().length >= minPasswordLength);
  };

  const handleUsernameBlur = () => {
    setIsUsernameTouched(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordTouched(true);
  };

  const handleGoogleLogin = async (response: CredentialResponse) => {
    dispatch(
      externalLoginAction({
        token: response.credential,
        service: "google",
        role: "RENTEE",
      })
    );
  };

  const handleGoogleLoginError = () => {
    errorNotification("Google login error");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    if (!username && !password) {
      return;
    }

    const userLogin: IUserLogin = {
      username: username.toString().trim(),
      password: password.toString().trim(),
    };

    dispatch(loginAction(userLogin));
  };

  return (
    <div className={styles.container__login}>
      <Logo />
      <Typography variant="h5" sx={{ mb: 6 }}>
        USER LOGIN
      </Typography>
      <div className={styles.login__inner}>
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            required
            variant="outlined"
            label="Username"
            name="username"
            id="username"
            error={!isUsernameValid && isUsernameTouched}
            autoComplete="username"
            placeholder="Input username"
            onChange={handleUsernameChange}
            onBlur={handleUsernameBlur}
            sx={{
              width: "24rem",
              mb: 6,
              backgroundColor: grey[100],
            }}
          />
          <TextField
            required
            variant="outlined"
            label="Password"
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            error={!isPasswordValid && isPasswordTouched}
            placeholder="Input password"
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: "24rem", mb: 2, backgroundColor: grey[100] }}
          />
          <NavLink to="/">Don't have an account? Register</NavLink>
          <StyledButton
            submit
            disabled={!isUsernameValid || !isPasswordValid}
            sx={{ height: "2.4rem", mt: 2, width: "100%" }}
          >
            Sign in
          </StyledButton>
        </Box>
        <Divider variant="middle" sx={{ mt: 2, width: "100%" }}>
          Or sign in with
        </Divider>
        <div className={styles["social-media"]}>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleLoginError}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
