import { Box, IconButton } from "@mui/material";
import { Language as LanguageIcon, Person as PersonIcon } from "@mui/icons-material";
import { ThemeSwitcherButton } from "../components/ThemeSwitcherButton";

export function RightSideToolbar() {
  return (
    <Box display="flex" gap="0.25rem">
      <ThemeSwitcherButton />
      <IconButton>
        <LanguageIcon color="primary" />
      </IconButton>
      <IconButton>
        <PersonIcon color="primary" />
      </IconButton>
    </Box>
  );
}
