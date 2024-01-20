import { ThemeProvider } from "./components/ThemeProvider";
import { UserProvider } from "./components/UserProvider";
import { RouterProvider } from "./components/RouterProvider";
import "./typography.css";
import { QueryProvider } from "./components/QueryProvider";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <QueryProvider>
          <RouterProvider />
        </QueryProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
