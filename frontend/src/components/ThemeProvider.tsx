import { createContext, ReactElement, useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  PaletteOptions,
  ThemeOptions,
} from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material/";

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
        ":root": {
          fontSize: 16,
          "@media (min-width: 600px)": {
            fontSize: 18,
          },
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        "a:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
};

const basePalette: PaletteOptions = { secondary: { main: "#3f51b5" } };

const lightPalette: PaletteOptions = {
  ...basePalette,
  mode: "light",
  primary: { main: "#212121" },
  background: { default: "#e7e7e7" },
};

const darkPalette: PaletteOptions = {
  ...basePalette,
  mode: "dark",
  primary: { main: "#ffffff" },
  background: { default: "#070707", paper: "#101010" },
};

const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: lightPalette,
});

const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: darkPalette,
});

export const ThemeSwitcherContext = createContext<() => void>(() => {});

export function ThemeProvider({ children }: { children: ReactElement | ReactElement[] }) {
  const [mode, setMode] = useState<PaletteMode>(
    (localStorage.getItem("preferredTheme") as PaletteMode) || "light"
  );
  const toggleMode = () => {
    setMode((v) => (v === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("preferredTheme", mode);
  }, [mode]);

  return (
    <ThemeSwitcherContext.Provider value={toggleMode}>
      <MuiThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
}
