import { FC } from "react";
import { Card, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface IProps {
  message: string;
}

const EmptyArrayMessage: FC<IProps> = ({ message }) => {
  return (
    <Card
      sx={{
        p: 2,
        pt: 1,
        display: "flex",
        justifyContent: "center",
        borderRadius: 4,
        height: "fit-content",
        border: `1px solid ${grey[400]}`,
      }}
    >
      <Typography variant="h3" color="info">
        {message}
      </Typography>
    </Card>
  );
};

export default EmptyArrayMessage;
