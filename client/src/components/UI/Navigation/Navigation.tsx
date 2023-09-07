import React, { FC, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import {
  AppBar,
  Box,
  Button,
  Link,
  Divider,
  List,
  ListItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Logo from "../Logo/Logo";
import AvatarWithOptions from "../Avatar/AvatarWithOptions";

interface IItem {
  name: string;
  to: string;
}

const generateNavItems = (
  isLoggedIn: boolean,
  isPropertyOwner: boolean
): IItem[] | null => {
  const items: IItem[] = [];

  items.push({ name: "Properties", to: "/listings" });
  if (isLoggedIn) {
    isPropertyOwner &&
      items.push({ name: "New property", to: "/listings/new" });
  }

  return items;
};

const Navigation: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const user = useAppSelector((state) => state.user.user);
  const isVerifiedOwner = user?.role === "PROPERTYOWNER" && user?.isVerified;

  const items = useMemo(() => {
    return generateNavItems(isLoggedIn, isVerifiedOwner);
  }, [isLoggedIn, isVerifiedOwner]);

  const content: React.ReactNode[] | undefined = items?.map((item) => {
    return (
      <ListItem key={item.to} sx={{ width: "fit-content" }}>
        <NavLink to={item.to} style={{ textDecoration: "none" }}>
          <Typography variant="button" fontSize={18}>
            {item.name}
          </Typography>
        </NavLink>
      </ListItem>
    );
  });

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "6rem",
          backgroundColor: "background.default",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 1,
            mr: 1,
          }}
        >
          <Logo />
          <List sx={{ display: "flex", height: "100%", mt: 1 }}>{content}</List>
          <Box sx={{ ml: "auto", mt: 1 }}>
            {isLoggedIn ? (
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <AvatarWithOptions />
                <Button
                  sx={{
                    fontSize: 18,
                    color: "secondary.main",
                    ":hover": {
                      bgcolor: "secondary.main",
                      color: "white",
                    },
                  }}
                >
                  Logout
                </Button>
              </Stack>
            ) : (
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                <NavLink to="/login">
                  <Button
                    sx={{
                      fontSize: 18,
                      ":hover": {
                        bgcolor: "secondary.main",
                        color: "white",
                      },
                    }}
                  >
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/registration">
                  <Button
                    sx={{
                      fontSize: 18,
                      ":hover": {
                        bgcolor: "secondary.main",
                        color: "white",
                      },
                    }}
                  >
                    Register
                  </Button>
                </NavLink>
              </Stack>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
