import React, { FC, useState } from "react";
import { Box } from "@mui/material";
import PasswordInputField from "./PasswordInputField";
import StyledButton from "../UI/Styled/StyledButton";
import { errorNotification } from "../../utils/toastNotificationUtil";
import { defaultFormErrorMessage } from "../../constants/Constants";

const PasswordChange: FC = () => {
  const [passwordError, setPasswordError] = useState<string>("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    const passwordChangeData = {
      currentPassword: currentPassword.toString().trim(),
      newPassword: newPassword.toString().trim(),
    };

    console.log(passwordChangeData);
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
