import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import "./typography.css";
import { router } from "./router";
import { UserProvider } from "./components/UserProvider";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
