import React, { FC, useState } from "react";
import { Paper, Box, Button } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RestoreIcon from "@mui/icons-material/Restore";
import UserInformationField from "./UserInformationField";
import StyledButton from "../UI/Styled/StyledButton";
import {
  defaultFormErrorMessage,
  emailRegex,
  minTextInputLength,
  phoneNumberRegex,
} from "../../constants/Constants";
import { HookTypes } from "../../shared/types/enumerations";
import { errorNotification } from "../../utils/toastNotificationUtil";

const DUMMY_USER = {
  firstName: "Andrija",
  lastName: "Ristic",
  email: "fake.email@gmail.com",
  country: "Serbia",
  address: "Adresa",
  phoneNumber: "063111111",
  role: "RENTEE",
};

const UserInformation: FC = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const handleEditToggle = () => {
    setEdit((prevEdit) => !prevEdit);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const country = data.get("country");
    const phoneNumber = data.get("phoneNumber");
    const address = data.get("address");
    const role = data.get("role");
    const email = data.get("email");

    if (
      !firstName ||
      !lastName ||
      !country ||
      !phoneNumber ||
      !address ||
      !role ||
      !email
    ) {
      errorNotification(defaultFormErrorMessage);
      return;
    }

    console.log(data);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="outlined"
        startIcon={<ModeEditIcon />}
        onClick={handleEditToggle}
        sx={{
          backgroundColor:
            edit === false ? "background.main" : "secondary.main",
        }}
      >
        Edit information
      </Button>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "80%",
        }}
      >
        <Button
          type="reset"
          startIcon={<RestoreIcon />}
          sx={{ width: "fit-content", pl: 2 }}
        >
          Revert all changes
        </Button>
        <Box
          sx={{
            p: 4,
            pb: 0,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <UserInformationField
              label="First name"
              id="firstName"
              defaultValue={DUMMY_USER.firstName}
              disabled={edit}
              type={HookTypes.TEXT}
              minChars={minTextInputLength}
            />
            <UserInformationField
              label="Last name"
              id="lastName"
              defaultValue={DUMMY_USER.lastName}
              disabled={edit}
              type={HookTypes.TEXT}
              minChars={minTextInputLength}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <UserInformationField
              label="Country"
              id="country"
              defaultValue={DUMMY_USER.country}
              disabled={edit}
              type={HookTypes.TEXT}
              minChars={minTextInputLength}
            />
            <UserInformationField
              label="Phone number"
              id="phoneNumber"
              defaultValue={DUMMY_USER.phoneNumber}
              disabled={edit}
              type={HookTypes.REGEX}
              regex={phoneNumberRegex}
            />
            <UserInformationField
              label="Role"
              id="role"
              defaultValue={DUMMY_USER.role}
              type={HookTypes.TEXT}
            />
          </Box>
          <UserInformationField
            label="Address"
            id="address"
            defaultValue={DUMMY_USER.address}
            disabled={edit}
            type={HookTypes.TEXT}
            minChars={minTextInputLength}
          />
          <UserInformationField
            label="Email addres"
            id="email"
            defaultValue={DUMMY_USER.email}
            disabled={edit}
            type={HookTypes.REGEX}
            regex={emailRegex}
          />
          <StyledButton submit disabled={!edit}>
            Submit
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInformation;
