import "./typography.css";

import { QueryProvider } from "./components/QueryProvider";
import { RouterProvider } from "./components/RouterProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { UserProvider } from "./components/UserProvider";

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
