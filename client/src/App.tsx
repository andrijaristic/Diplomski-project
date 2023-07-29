import { ThemeProvider } from "@mui/material/styles";
import Navigation from "./components/UI/Navigation/Navigation";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { lightTheme } from "./styles/theme";
import HomePage from "./pages/HomePage";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App() {
  return (
    <main className="container light">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={lightTheme}>
          <Navigation />
          <HomePage />
        </ThemeProvider>
      </LocalizationProvider>
    </main>
  );
}

export default App;
