import { ThemeProvider } from "@mui/material/styles";
import Navigation from "./components/UI/Navigation/Navigation";
import { lightTheme, darkTheme } from "./styles/theme";

function App() {
  return (
    <main className="container">
      <ThemeProvider theme={darkTheme}>
        <Navigation />
        <div className="card">Something</div>
      </ThemeProvider>
    </main>
  );
}

export default App;
