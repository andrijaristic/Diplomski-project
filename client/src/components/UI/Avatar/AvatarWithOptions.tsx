import { FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import { IJwt } from "../../../shared/interfaces/userInterfaces";
import PersonIcon from "@mui/icons-material/Person";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import MessageIcon from "@mui/icons-material/Message";
import BedIcon from "@mui/icons-material/Bed";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

type NavItem = {
  title: string;
  to: string;
  icon: JSX.Element;
};

const generateNavigationItems = (userType: string, isVerified: boolean) => {
  const items: NavItem[] = [];

  items.push({ title: "Account", to: `/account`, icon: <PersonIcon /> });
  items.push({
    title: "Change password",
    to: `/account/change-password`,
    icon: <EnhancedEncryptionIcon />,
  });
  items.push({
    title: "Comments",
    to: `/account/comments`,
    icon: <MessageIcon />,
  });
  items.push({
    title: "Reservations",
    to: `/account/reservations`,
    icon: <BedIcon />,
  });

  if (userType === "OWNER" && isVerified) {
    items.push({
      title: "My listings",
      to: `/account/my-listings`,
      icon: <MapsHomeWorkIcon />,
    });
  }

  if (userType === "ADMIN") {
    items.push({
      title: "Unverified users",
      to: "/account/unverified-users",
      icon: <PeopleAltIcon color="error" />,
    });
  }

  return items;
};

const AvatarWithOptions: FC = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.user);

  const items: NavItem[] = useMemo(() => {
    return generateNavigationItems(user?.role || "", user?.isVerified || false);
  }, [user?.role, user?.isVerified]);

  const { firstName, lastName } = jwtDecode<IJwt>(token ? token : "");

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  const handleAccountClick = (to: string) => () => {
    navigate(to);
    setAnchorEl(null);
  };

  const content: JSX.Element[] = items?.map((item) => (
    <MenuItem key={item.to} onClick={handleAccountClick(item.to)}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      {item.title}
    </MenuItem>
  ));

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
            sx={{ textTransform: "capitalize" }}
          >
            <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
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
        <Stack divider={<Divider orientation="horizontal" flexItem />}>
          {content}
        </Stack>
      </Menu>
    </>
  );
};

export default AvatarWithOptions;
