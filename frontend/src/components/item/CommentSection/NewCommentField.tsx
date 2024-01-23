import { Box, Button, TextField } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../router";
import { UserContext } from "../../UserProvider";

export function NewCommentField() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  if (!user)
    return (
      <Box
        p={2}
        my={2}
        display={{ xs: "flex", sm: "block" }}
        flexDirection="column"
        textAlign={{ xs: "center", sm: "left" }}
      >
        <Button variant="contained" sx={{ m: 1 }} onClick={() => navigate(ROUTES.LOGIN)}>
          Log in
        </Button>{" "}
        or{" "}
        <Button variant="contained" sx={{ m: 1 }} onClick={() => navigate(ROUTES.SIGNUP)}>
          Sign up
        </Button>{" "}
        <Box display={{ xs: "block", sm: "none" }} />
        to leave a comment.
      </Box>
    );

  return (
    <Box p={2} mb={2} display="flex" flexDirection="column" alignItems="flex-end">
      <TextField multiline minRows={2} size="small" placeholder="Leave a comment..." fullWidth />
      <Button variant="contained" sx={{ mt: 1 }}>
        Submit
      </Button>
    </Box>
  );
}
