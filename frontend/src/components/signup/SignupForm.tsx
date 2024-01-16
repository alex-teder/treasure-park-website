import { SyntheticEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { api } from "../../api";

export function SignupForm() {
  const { state } = useLocation();
  const initialEmail = state?.email || "";
  const [email, setEmail] = useState<string>(initialEmail);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await api.signUp({ email, username, password });
    console.log(result);
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
  return <TextField variant="outlined" label="Email" value={value} onChange={onChange} />;
}

function UsernameField({ value, onChange, autoFocus }: TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      label="Username"
      helperText="Your username can only contain letters (A-Z, a-z), numbers, and hyphens (-)."
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
