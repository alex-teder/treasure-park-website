import { Box, IconButton } from "@mui/material";
import {
  NightlightRound as NightlightRoundIcon,
  Language as LanguageIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

export function RightSideToolbar() {
  return (
    <Box display="flex" gap="0.25rem">
      <IconButton>
        <NightlightRoundIcon color="primary" />
      </IconButton>
      <IconButton>
        <LanguageIcon color="primary" />
      </IconButton>
      <IconButton>
        <PersonIcon color="primary" />
      </IconButton>
    </Box>
  );
}
