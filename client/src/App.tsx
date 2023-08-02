import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { lightTheme } from "./styles/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <main className="container light">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={lightTheme}>
          <AppRoutes />
        </ThemeProvider>
      </LocalizationProvider>
    </main>
  );
}

export default App;
