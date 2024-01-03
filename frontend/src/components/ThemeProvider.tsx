import { createContext, ReactElement, useState } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  PaletteOptions,
  ThemeOptions,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material/";

export const ThemeSwitcherContext = createContext<() => void>(() => {});

export function ThemeProvider({ children }: { children: ReactElement | ReactElement[] }) {
  // const initialMode = useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    setMode((v) => (v === "light" ? "dark" : "light"));
  };

  const baseThemeOptions: ThemeOptions = {
    shape: {
      borderRadius: 2,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "all 0.25s ease",
          },
        },
      },
    },
  };

  const basePalette: PaletteOptions = { secondary: { main: "#3f51b5" } };

  const lightPalette: PaletteOptions = {
    mode: "light",
    primary: { main: "#212121", contrastText: "fff" },
    ...basePalette,
  };

  const darkPalette: PaletteOptions = {
    mode: "dark",
    primary: { main: "#ffffff" },
    ...basePalette,
  };

  const lightTheme = createTheme({
    palette: lightPalette,
    ...baseThemeOptions,
  });

  const darkTheme = createTheme({
    palette: darkPalette,
    ...baseThemeOptions,
  });

  return (
    <ThemeSwitcherContext.Provider value={toggleMode}>
      <MuiThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
}
