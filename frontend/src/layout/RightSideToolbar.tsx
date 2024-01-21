import { Language as LanguageIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

import { ThemeSwitcherButton } from "./ThemeSwitcherButton";
import { UserButton } from "./UserButton";

export function RightSideToolbar() {
  return (
    <Box display="flex" gap="0.25rem">
      <ThemeSwitcherButton />
      <IconButton>
        <LanguageIcon color="primary" />
      </IconButton>
      <UserButton />
    </Box>
  );
}
