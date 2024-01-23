import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { api } from "../../api";
import { ROUTES } from "../../router";
import { signupFormSchema } from "../../zod/forms";
import { UserContext } from "../UserProvider";

export function SignupForm() {
  const { state } = useLocation();
  const initialEmail = state?.email || "";
  const [email, setEmail] = useState<string>(initialEmail);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const validation = signupFormSchema.safeParse({ email, username, password });
    if (!validation.success) {
      setError(`${validation.error.issues[0].message}`);
      return;
    }
    setError("");
    const { user, error } = await api.signUp({ email, username, password });
    if (error) {
      setError(error.message!);
      return;
    }
    setUser(user);
    navigate(ROUTES.ROOT);
  };

  return (
    <Card
      component="form"
      sx={{ px: 2, py: 4, maxWidth: 360, display: "flex", flexDirection: "column", gap: 2 }}
      onSubmit={handleSubmit}
    >
      <Heading />
      <EmailField value={email} onChange={(e) => setEmail(e.target.value)} />
      <UsernameField
        autoFocus={!!initialEmail}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" color="secondary" variant="contained">
        Sign up
      </Button>
    </Card>
  );
}

function Heading() {
  return (
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
  );
}

function EmailField({ value, onChange }: TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      label="Email"
      spellCheck="false"
      value={value}
      onChange={onChange}
    />
  );
}

function UsernameField({ value, onChange, autoFocus }: TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      label="Username"
      helperText="Your username can only contain letters (A-Z, a-z), numbers, and hyphens (-)."
      spellCheck="false"
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
    />
  );
}

function PasswordField({ value, onChange }: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      type={showPassword ? "text" : "password"}
      variant="outlined"
      label="New password"
      spellCheck="false"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton disableTouchRipple onClick={() => setShowPassword((v) => !v)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={onChange}
    />
  );
}
