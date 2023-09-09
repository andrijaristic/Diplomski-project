import { grey } from "@mui/material/colors";
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
    custom: Palette["secondary"];
    nav: { default: string };
  }

  interface PaletteOptions {
    custom?: PaletteOptions["secondary"];
    nav?: { default: string };
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
    nav: {
      default: "#fafafa",
    },
    background: {
      default: grey[200],
    },
    primary: {
      main: "#748ae2",
      dark: "#243ea8",
      contrastText: "#050505",
    },
    secondary: {
      main: "#111d4f",
      dark: "#8195e4",
      contrastText: "#fafafa",
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
      color: "#050505",
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
  },
});
