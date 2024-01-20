import { ThemeProvider } from "./components/ThemeProvider";
import { UserProvider } from "./components/UserProvider";
import { RouterProvider } from "./components/RouterProvider";
import "./typography.css";
import { QueryProvider } from "./components/QueryProvider";

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <UserProvider>
          <RouterProvider />
        </UserProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
