import { FC } from "react";
import { Box, Card, Stack, Typography, Button, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import { IUnverifiedUser } from "../../shared/interfaces/userInterfaces";

interface IProps {
  unverifiedUser: IUnverifiedUser;
  onAccept: () => void;
  onDeny: () => void;
}

const UnverifiedUsersItem: FC<IProps> = ({
  unverifiedUser,
  onAccept,
  onDeny,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        height: "fit-content",
        border: `1px solid ${grey[400]}`,
      }}
    >
      <Paper sx={{ height: 8, bgcolor: "secondary.main" }} />
      <Stack direction="row" sx={{ p: 2, pt: 1 }}>
        <Box>
          <Typography variant="h4">{`${unverifiedUser?.firstName} ${unverifiedUser?.lastName}`}</Typography>
          <Typography variant="subtitle2">{`${unverifiedUser?.email}`}</Typography>
        </Box>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            ml: "auto",
          }}
        >
          <Button variant="outlined" color="success" onClick={onAccept}>
            Accept application
          </Button>
          <Button variant="outlined" color="error" onClick={onDeny}>
            Deny application
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default UnverifiedUsersItem;
