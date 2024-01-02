import { ReactElement } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  PaletteOptions,
  ThemeOptions,
} from "@mui/material/styles";

export function ThemeProvider({
  children,
  mode = "light",
}: {
  children: ReactElement | ReactElement[];
  mode?: "light" | "dark";
}) {
  const baseThemeOptions: ThemeOptions = {
    shape: {
      borderRadius: 2,
    },
  };

  const basePalette: PaletteOptions = { secondary: { main: "#3f51b5" } };
  const lightPalette: PaletteOptions = {
    mode: "light",
    primary: { main: "#212121" },
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
    <>
      <MuiThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        {children}
      </MuiThemeProvider>
    </>
  );
}
