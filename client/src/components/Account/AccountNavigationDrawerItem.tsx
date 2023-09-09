import { FC } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

interface IProps {
  title: string;
  secondary?: string;
  icon: JSX.Element;
  selected: boolean;
  onClick: () => void;
}

const AccountNavigationDrawerItem: FC<IProps> = ({
  title,
  icon,
  secondary,
  selected,
  onClick,
}) => {
  return (
    <>
      <ListItem disablePadding sx={{ width: "100%" }}>
        <ListItemButton onClick={onClick} selected={selected}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} secondary={secondary} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default AccountNavigationDrawerItem;
