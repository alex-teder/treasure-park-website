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
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../router";

export function LoginPage() {
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Container
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        component="form"
        sx={{ px: 2, py: 4, display: "flex", flexDirection: "column", gap: 2 }}
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
          Log in
        </Typography>

        <TextField
          variant="outlined"
          label="Username or Email"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
        />

        <TextField
          type={showPassword ? "text" : "password"}
          variant="outlined"
          label="Password"
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
          Log in
        </Button>
      </Card>

      <p>
        No account yet?{" "}
        <Link to={ROUTES.SIGNUP} style={{ textDecoration: "underline" }}>
          Sign up!
        </Link>
      </p>
    </Container>
  );
}
