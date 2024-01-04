import { Box, IconButton } from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { ThemeSwitcherButton } from "./ThemeSwitcherButton";
import { NoAuthUserButton } from "./NoAuthUserButton";

export function RightSideToolbar() {
  return (
    <Box display="flex" gap="0.25rem">
      <ThemeSwitcherButton />
      <IconButton>
        <LanguageIcon color="primary" />
      </IconButton>
      <NoAuthUserButton />
    </Box>
  );
}
