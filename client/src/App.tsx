import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import { lightTheme } from "./styles/theme";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <main className="container light">
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={lightTheme}>
          <AppRoutes />
          <ToastContainer theme="dark" />
        </ThemeProvider>
      </LocalizationProvider>
    </main>
  );
}

export default App;
