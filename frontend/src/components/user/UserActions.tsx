import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router";

export function UserActions() {
  const navigate = useNavigate();

  return (
    <Box mb={2} display="flex" gap={2} flexWrap="wrap">
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() => navigate(ROUTES.EDIT_COLLECTION)}
      >
        New collection
      </Button>
    </Box>
  );
}
