import { FC } from "react";
import { Card, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const NoUsersMessage: FC = () => {
  return (
    <Card
      sx={{
        p: 2,
        pt: 1,
        display: "flex",
        justifyContent: "center",
        borderRadius: 1,
        height: "fit-content",
        border: `1px solid ${grey[400]}`,
      }}
    >
      <Typography variant="h3" color="info">
        There are no users awaiting verification
      </Typography>
    </Card>
  );
};

export default NoUsersMessage;
