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
    typography: {
      fontFamily: [
        "Montserrat",
        '"Helvetica"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
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
    background: { default: "#e7e7e7" },
    ...basePalette,
  };

  const darkPalette: PaletteOptions = {
    mode: "dark",
    primary: { main: "#ffffff" },
    background: { default: "#070707", paper: "#070707" },
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
