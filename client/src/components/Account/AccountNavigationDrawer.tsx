import { FC, useEffect, useMemo, useState } from "react";
import { Box, Container, Drawer, List, Stack } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import PersonIcon from "@mui/icons-material/Person";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import MessageIcon from "@mui/icons-material/Message";
import BedIcon from "@mui/icons-material/Bed";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountNavigationDrawerItem from "./AccountNavigationDrawerItem";
import { useLocation, useNavigate } from "react-router-dom";
import EmptyArrayMessage from "../UI/EmptyArrayMessage/EmptyArrayMessage";

type NavItem = {
  title: string;
  to: string;
  icon: JSX.Element;
  secondary?: string;
  index: number;
};
const generateNavigationItems = (userType: string, isVerified: boolean) => {
  const items: NavItem[] = [];
  let index = 0;

  items.push({
    title: "Account",
    to: `/account`,
    icon: <PersonIcon fontSize="large" />,
    secondary: "Basic information",
    index: index++,
  });
  items.push({
    title: "Change password",
    to: `/account/change-password`,
    icon: <EnhancedEncryptionIcon fontSize="large" />,
    index: index++,
  });
  items.push({
    title: "Comments",
    to: `/account/comments`,
    icon: <MessageIcon fontSize="large" />,
    index: index++,
  });
  items.push({
    title: "Reservations",
    to: `/account/reservations`,
    icon: <BedIcon fontSize="large" />,
    index: index++,
  });

  if (userType === "OWNER" && isVerified) {
    items.push({
      title: "My listings",
      to: `/account/my-listings`,
      secondary: "What you own",
      icon: <MapsHomeWorkIcon fontSize="large" />,
      index: index++,
    });
  }

  if (userType === "ADMIN") {
    items.push({
      title: "Unverified users",
      to: "/account/unverified-users",
      icon: <PeopleAltIcon color="error" fontSize="large" />,
      index: index++,
    });
  }

  return items;
};

const AccountNavigationDrawer: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const user = useAppSelector((state) => state.user.user);
  const items: NavItem[] = useMemo(() => {
    return generateNavigationItems(user?.role || "", user?.isVerified || false);
  }, [user?.role, user?.isVerified]);

  useEffect(() => {
    const item = items.find((item) => item.to === pathname);
    setSelectedIndex(item?.index || 0);
  }, []);

  const handleNavigation = (to: string, index: number) => () => {
    navigate(to);
    setSelectedIndex(index);
  };

  const content: JSX.Element[] = items?.map((item) => (
    <AccountNavigationDrawerItem
      key={item.to}
      title={item.title}
      secondary={item?.secondary || ""}
      selected={selectedIndex === item.index}
      onClick={handleNavigation(item.to, item.index)}
      icon={item.icon}
    />
  ));

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: "nav.default",
        },
      }}
    >
      <List sx={{ mt: "60%" }}>{content}</List>
    </Drawer>
  );
};

export default AccountNavigationDrawer;
