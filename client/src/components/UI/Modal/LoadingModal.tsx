import { FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface IProps {
  show: boolean;
}

const LoadingModal: FC<IProps> = ({ show = false }) => {
  return (
    <Backdrop
      open={show}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" size="4rem" />
    </Backdrop>
  );
};

export default LoadingModal;
