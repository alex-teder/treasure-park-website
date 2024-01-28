import { ArrowRight as ArrowRightIcon } from "@mui/icons-material";
import { Box, Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/router";
import { SignUpRouteState } from "@/types";

export function BannerEmailForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <Box
      component="form"
      display="flex"
      gap={2}
      flexWrap="wrap"
      onSubmit={(e) => e.preventDefault()}
    >
      <Card sx={{ maxWidth: "fit-content" }}>
        <TextField
          size="small"
          placeholder="Enter your email:"
          spellCheck="false"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Card>

      <Button
        type="submit"
        variant="contained"
        endIcon={<ArrowRightIcon />}
        sx={{ border: "1px solid rgba(0,0,0,0.2)" }}
        onClick={() => {
          navigate(ROUTES.SIGNUP, { state: { email } as SignUpRouteState });
        }}
      >
        Sign up
      </Button>
    </Box>
  );
}
