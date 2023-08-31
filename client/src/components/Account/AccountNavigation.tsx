import { FC, useMemo } from "react";
import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import AccountNavigationItem from "./AccountNavigationItem";

type NavItem = {
  title: string;
  to: string;
};

const generateNavigationItems = (
  id: string | undefined,
  isPropertyOwner: boolean = false
) => {
  const items: NavItem[] = [];

  items.push({ title: "account", to: `/account` });
  items.push({
    title: "change password",
    to: `/account/change-password`,
  });
  items.push({ title: "comments", to: `/account/comments` });
  items.push({ title: "reservations", to: `/account/reservations` });
  items.push({ title: "my listings", to: `/account/my-listings` });

  if (isPropertyOwner) {
    items.push({ title: "my listings", to: `/account/my-listings` });
  }

  return items;
};

const AccountNavigation: FC = () => {
  const { id: path } = useParams();
  const items: NavItem[] = useMemo(() => {
    return generateNavigationItems(path);
  }, [path]);
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
