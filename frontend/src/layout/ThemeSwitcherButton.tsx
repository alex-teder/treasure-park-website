import { LightModeRounded as LightIcon,NightlightRound as DarkIcon } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { useContext } from "react";

import { ThemeSwitcherContext } from "../components/ThemeProvider";

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
