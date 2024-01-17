import { ThemeProvider } from "./components/ThemeProvider";
import { UserProvider } from "./components/UserProvider";
import { RouterProvider } from "./components/RouterProvider";
import "./typography.css";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <RouterProvider />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
