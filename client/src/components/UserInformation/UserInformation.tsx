import React, { FC, useState } from "react";
import jwtDecode from "jwt-decode";
import { Box, Button } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RestoreIcon from "@mui/icons-material/Restore";
import UserInformationField from "./UserInformationField";
import StyledButton from "../UI/Styled/StyledButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { HookTypes } from "../../shared/types/enumerations";
import { IJwt, IUserUpdate } from "../../shared/interfaces/userInterfaces";
import {
  defaultFormErrorMessage,
  emailRegex,
  minTextInputLength,
  phoneNumberRegex,
} from "../../constants/Constants";
import { errorNotification } from "../../utils/toastNotificationUtil";
import { updateAction } from "../../store/userSlice";

const UserInformation: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const token = useAppSelector((state) => state.user.token);

  const { id } = jwtDecode<IJwt>(token ? token : "");

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
    const email = data.get("email");

    if (!firstName || !lastName || !country || !phoneNumber || !email) {
      errorNotification(defaultFormErrorMessage);
      return;
    }

    const userUpdate: IUserUpdate = {
      id: id,
      firstName: firstName.toString().trim(),
      lastName: lastName.toString().trim(),
      country: country.toString().trim(),
      phoneNumber: phoneNumber.toString().trim(),
      email: email.toString().trim(),
    };

    dispatch(updateAction(userUpdate));
    setEdit(false); // Closes off form for edit / spam submit
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
              defaultValue={user?.firstName}
              disabled={edit}
              type={HookTypes.TEXT}
              minChars={minTextInputLength}
            />
            <UserInformationField
              label="Last name"
              id="lastName"
              defaultValue={user?.lastName}
              disabled={edit}
              type={HookTypes.TEXT}
              minChars={minTextInputLength}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <UserInformationField
              label="Country"
              id="country"
              defaultValue={user?.country}
              disabled={edit}
              type={HookTypes.TEXT}
              minChars={minTextInputLength}
            />
            <UserInformationField
              label="Phone number"
              id="phoneNumber"
              defaultValue={user?.phoneNumber}
              disabled={edit}
              type={HookTypes.REGEX}
              regex={phoneNumberRegex}
            />
            <UserInformationField
              label="Role"
              id="role"
              defaultValue={user?.role}
              type={HookTypes.TEXT}
            />
          </Box>
          <UserInformationField
            label="Email addres"
            id="email"
            defaultValue={user?.email}
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
