import { SyntheticEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ROUTES } from "../router";

export function SignupPage() {
  const { state: initialEmail } = useLocation();
  const [email, setEmail] = useState<string>(initialEmail || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Container
      sx={{
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        component="form"
        sx={{ px: 2, py: 4, maxWidth: 360, display: "flex", flexDirection: "column", gap: 2 }}
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h5"
          component="h1"
          fontWeight={700}
          mb={2}
          display="flex"
          gap={2}
          alignSelf="center"
        >
          Create account
        </Typography>

        <TextField
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          variant="outlined"
          label="Username"
          helperText="Your username can only contain letters (A-Z, a-z), numbers, and hyphens (-)."
          autoFocus={!!initialEmail}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          type={showPassword ? "text" : "password"}
          variant="outlined"
          label="New password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disableTouchRipple onClick={() => setShowPassword((v) => !v)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" color="secondary" variant="contained">
          Sign up
        </Button>
      </Card>

      <p>
        Already have an account?{" "}
        <Link to={ROUTES.LOGIN} style={{ textDecoration: "underline" }}>
          Log in!
        </Link>
      </p>
    </Container>
  );
}
