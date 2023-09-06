import { FC, useMemo } from "react";
import { Paper } from "@mui/material";
import AccountNavigationItem from "./AccountNavigationItem";
import { useAppSelector } from "../../store/hooks";

type NavItem = {
  title: string;
  to: string;
};

const generateNavigationItems = (userType: string) => {
  const items: NavItem[] = [];

  items.push({ title: "account", to: `/account` });
  items.push({
    title: "change password",
    to: `/account/change-password`,
  });
  items.push({ title: "comments", to: `/account/comments` });
  items.push({ title: "reservations", to: `/account/reservations` });

  if (userType === "PROPERTYOWNER") {
    items.push({ title: "my listings", to: `/account/my-listings` });
  }

  if (userType === "ADMIN") {
    items.push({ title: "unverified users", to: "/account/unverified-users" });
  }

  return items;
};

const AccountNavigation: FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const items: NavItem[] = useMemo(() => {
    return generateNavigationItems(user?.role || "");
  }, [user?.role]);

  const content: JSX.Element[] = items?.map((item) => (
    <AccountNavigationItem key={item.to} title={item.title} to={item.to} />
  ));

  return (
    <Paper
      sx={{
        width: "100%",
        p: 4,
        gap: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {content}
    </Paper>
  );
};

export default AccountNavigation;
