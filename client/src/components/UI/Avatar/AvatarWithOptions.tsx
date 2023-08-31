import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Logout, Settings } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { logout } from "../../../store/userSlice";
import { IJwt } from "../../../shared/interfaces/userInterfaces";

const AvatarWithOptions: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);

  const { firstName, lastName } = jwtDecode<IJwt>(token ? token : "");

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  const handleAccountClick = () => {
    navigate("/account");
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Settings">
        <Box
          sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
        >
          <Button
            size="small"
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Typography>{`${firstName} ${lastName}`}</Typography>
          </Button>
        </Box>
      </Tooltip>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeHandler}
        onClick={closeHandler}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleAccountClick}>
          <ListItemIcon>
            <PersonIcon fontSize="medium" />
          </ListItemIcon>
          Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarWithOptions;
