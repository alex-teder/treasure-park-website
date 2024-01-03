import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
// import "./my-reset.css";
import "./typography.css";
import { router } from "./router";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
