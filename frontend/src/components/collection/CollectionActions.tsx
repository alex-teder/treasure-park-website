import { Box,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../router";

export function CollectionActions() {
  const navigate = useNavigate();

  return (
    <Box mb={2} display="flex" gap={2} flexWrap="wrap">
      <Button variant="outlined" onClick={() => navigate(ROUTES.EDIT_COLLECTION)}>
        Edit collection
      </Button>
      <Button variant="outlined" color="error">
        Delete collection
      </Button>
    </Box>
  );
}
