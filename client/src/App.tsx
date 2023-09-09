import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, CssBaseline } from "@mui/material";
import AppRoutes from "./routes/AppRoutes";
import { lightTheme } from "./styles/theme";
import { enGB } from "date-fns/locale";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        component="main"
        className="container light"
        sx={{ backgroundColor: "background.default" }}
      >
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <AppRoutes />
          <ToastContainer theme="dark" limit={2} newestOnTop />
        </LocalizationProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
