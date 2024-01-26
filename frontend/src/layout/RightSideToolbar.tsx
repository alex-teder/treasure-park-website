import { Box } from "@mui/material";

import { ThemeSwitcherButton } from "./ThemeSwitcherButton";
import { UserButton } from "./UserButton";

export function RightSideToolbar() {
  return (
    <Box display="flex" gap="0.25rem">
      <ThemeSwitcherButton />
      <UserButton />
    </Box>
  );
}
