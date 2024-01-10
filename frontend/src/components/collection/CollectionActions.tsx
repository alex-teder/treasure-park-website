import { Button, Box } from "@mui/material";

export function CollectionActions() {
  return (
    <Box mb={2} display="flex" gap={2} flexWrap="wrap">
      <Button variant="outlined">Edit collection</Button>
      <Button variant="outlined" color="error">
        Delete collection
      </Button>
    </Box>
  );
}
