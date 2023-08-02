import React, { FC } from "react";
import { Button, SxProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyStyledButton = styled(Button)(({ theme }) => ({
  cursor: "pointer",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary,
  },
}));

interface IProps extends React.PropsWithChildren {
  sx: SxProps<Theme> | undefined;
  onClick?: () => void;
}

const StyledButton: FC<IProps> = ({ sx, children, onClick }) => {
  return (
    <MyStyledButton variant="contained" onClick={onClick} sx={sx}>
      {children}
    </MyStyledButton>
  );
};

export default StyledButton;
