import { Alert, Box, Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../../api";
import { ROUTES } from "../../../router";
import { commentSchema } from "../../../zod/forms";
import { UserContext } from "../../UserProvider";

export function NewCommentField({ itemId }: { itemId: number }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const formData = {
      text,
      itemId,
    };
    const validation = commentSchema.safeParse(formData);
    if (!validation.success) {
      setError("Please enter some text");
      return;
    }
    setError("");
    const { error } = await api.postComment(formData);
    if (error) setError("An error occured.");
    else queryClient.invalidateQueries();
  };

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
    <Box component="form" p={2} mb={2} display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        multiline
        minRows={2}
        size="small"
        placeholder="Leave a comment..."
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && (
        <Alert severity="error" sx={{ alignSelf: "stretch", my: 1 }}>
          {error}
        </Alert>
      )}
      <Button type="button" variant="contained" sx={{ mt: 1 }} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
