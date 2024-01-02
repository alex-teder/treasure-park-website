import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "./ThemeProvider";
import "./style.css";

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <h1>Test</h1>
    </ThemeProvider>
  );
}

export default App;
