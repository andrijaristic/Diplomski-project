import { FC, useMemo } from "react";
import { Paper } from "@mui/material";
import AccountNavigationItem from "./AccountNavigationItem";

type NavItem = {
  title: string;
  to: string;
};

const generateNavigationItems = (isPropertyOwner: boolean = false) => {
  const items: NavItem[] = [];

  items.push({ title: "account", to: "id/account" });
  items.push({ title: "change password", to: "id/change-password" });
  items.push({ title: "comments", to: "id/comments" });
  items.push({ title: "reservations", to: "id/reservations" });

  if (isPropertyOwner) {
    items.push({ title: "listings", to: "id/listings" });
  }

  return items;
};

const AccountNavigation: FC = () => {
  const items: NavItem[] = useMemo(() => {
    return generateNavigationItems();
  }, []);
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
