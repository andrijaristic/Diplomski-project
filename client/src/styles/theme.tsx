import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    custom: Palette["primary"];
  }

  interface PaletteOptions {
    custom?: PaletteOptions["primary"];
  }
}

export const lightTheme = createTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          color: "#050505",
        },
      },
    },
  },
  typography: {
    fontFamily: `"Readex Pro", sans-serif`,
    allVariants: {
      color: "#050505",
    },
  },
  palette: {
    background: {
      default: "#fafafa",
    },
    primary: {
      main: "#748ae2",
      dark: "#243ea8",
    },
    secondary: {
      main: "#d5dbf6",
      dark: "#243ea8",
    },
    text: {
      primary: "#050505",
    },
  },
});

export const darkTheme = createTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          color: "#fafafa",
        },
      },
    },
  },
  typography: {
    fontFamily: `"Readex Pro", sans-serif`,
    allVariants: {
      color: "#fafafa",
    },
  },
  palette: {
    background: {
      default: "#050505",
    },
    primary: {
      main: "#748ae2",
      dark: "#8195e4",
    },
    secondary: {
      main: "#090f2a",
      dark: "#8195e4",
    },
    text: {
      primary: "#fafafa",
    },
  },
});
