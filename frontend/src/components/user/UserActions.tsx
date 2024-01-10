import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export function UserActions() {
  return (
    <Box mb={2} display="flex" gap={2} flexWrap="wrap">
      <Button variant="outlined" startIcon={<Add />}>
        New collection
      </Button>
    </Box>
  );
}
