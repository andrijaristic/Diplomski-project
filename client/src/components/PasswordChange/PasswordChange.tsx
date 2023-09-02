import React, { FC, useState } from "react";
import jwtDecode from "jwt-decode";
import { Box } from "@mui/material";
import PasswordInputField from "./PasswordInputField";
import StyledButton from "../UI/Styled/StyledButton";
import { defaultFormErrorMessage } from "../../constants/Constants";
import { errorNotification } from "../../utils/toastNotificationUtil";
import {
  IJwt,
  IPasswordChangeData,
} from "../../shared/interfaces/userInterfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { passwordChangeAction } from "../../store/userSlice";

const PasswordChange: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const { id } = jwtDecode<IJwt>(token ? token : "");

  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const currentPassword = data.get("currentPassword");
    const confirmCurrentPassword = data.get("confirmCurrentPassword");
    const newPassword = data.get("newPassword");

    if (!currentPassword || !confirmCurrentPassword || !newPassword) {
      errorNotification(defaultFormErrorMessage);
      return;
    }

    if (currentPassword !== confirmCurrentPassword) {
      setPasswordError("Passwords must match!");
      return;
    }

    setPasswordError("");
    const passwordChangeData: IPasswordChangeData = {
      id: id,
      body: {
        currentPassword: currentPassword.toString().trim(),
        newPassword: newPassword.toString().trim(),
      },
    };

    const currentTarget = event.currentTarget;
    const response = await dispatch(passwordChangeAction(passwordChangeData));
    if (response.meta.requestStatus === "fulfilled") {
      currentTarget.reset();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        pb: 0,
        display: "flex",
        flexDirection: "column",
        width: "40%",
        gap: 3,
      }}
    >
      <PasswordInputField
        label="Current password"
        id="currentPassword"
        helperText={passwordError}
      />
      <PasswordInputField
        label="Confirm current password"
        id="confirmCurrentPassword"
        helperText={passwordError}
      />
      <PasswordInputField label="New password" id="newPassword" />
      <StyledButton submit sx={{ width: "100%" }}>
        Submit
      </StyledButton>
    </Box>
  );
};

export default PasswordChange;
