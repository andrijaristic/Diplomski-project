import { FC, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import UnverifiedUsersItem from "./UnverifiedUsersItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearUnverifiedUsers,
  getUnverifiedUsersAction,
  sendUserVerificationAction,
} from "../../store/userSlice";
import NoUnverifiedUsersMessage from "./NoUnverifiedUsersMessage";

const UnverifiedUsers: FC = () => {
  const dispatch = useAppDispatch();
  const [refresh, setRefresh] = useState<boolean>();
  const unverifiedUsers = useAppSelector((state) => state.user.unverifiedUsers);

  useEffect(() => {
    if (!refresh) {
      return;
    }

    dispatch(clearUnverifiedUsers());
    dispatch(getUnverifiedUsersAction(""));
    setRefresh(false);
  }, [refresh, dispatch]);

  const handleApplicationAcceptance = (id: string) => async () => {
    const response = await dispatch(
      sendUserVerificationAction({
        id: id,
        isAccepted: true,
      })
    );
    if (response) {
      setRefresh(true);
    }
  };

  const handleApplicationDenial = (id: string) => async () => {
    const response = await dispatch(
      sendUserVerificationAction({
        id: id,
        isAccepted: false,
      })
    );
    if (response) {
      setRefresh(true);
    }
  };

  const handleListRefresh = () => {
    setRefresh(true);
  };

  const content = unverifiedUsers?.map((user) => {
    return (
      <UnverifiedUsersItem
        key={user?.id}
        unverifiedUser={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
        }}
        onAccept={handleApplicationAcceptance(user?.id)}
        onDeny={handleApplicationDenial(user?.id)}
      />
    );
  });

  return (
    <>
      <Button onClick={handleListRefresh}>
        <RefreshIcon sx={{ mr: 1 }} />
        Refresh user list
      </Button>
      <Box
        sx={{ p: 4, pt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {content.length > 0 ? content : <NoUnverifiedUsersMessage />}
      </Box>
    </>
  );
};

export default UnverifiedUsers;
