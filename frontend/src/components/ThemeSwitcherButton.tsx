import { useContext } from "react";
import { IconButton, useTheme } from "@mui/material";
import { NightlightRound as DarkIcon, LightModeRounded as LightIcon } from "@mui/icons-material";
import { ThemeSwitcherContext } from "./ThemeProvider";

export function ThemeSwitcherButton() {
  const toggleMode = useContext(ThemeSwitcherContext);
  const theme = useTheme();
  const currentMode = theme.palette.mode;
  return (
    <IconButton color="primary" disableTouchRipple onClick={toggleMode}>
      {currentMode === "light" ? <DarkIcon /> : <LightIcon />}
    </IconButton>
  );
}
