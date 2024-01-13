import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";

export function LoginForm() {
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Card
      component="form"
      sx={{ px: 2, py: 4, display: "flex", flexDirection: "column", gap: 2 }}
      onSubmit={handleSubmit}
    >
      <Heading />
      <LoginValueField value={loginValue} onChange={(e) => setLoginValue(e.target.value)} />
      <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" color="secondary" variant="contained">
        Log in
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
      Log in
    </Typography>
  );
}

function LoginValueField({ value, onChange }: TextFieldProps) {
  return (
    <TextField variant="outlined" label="Username or Email" value={value} onChange={onChange} />
  );
}

function PasswordField({ value, onChange }: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
      value={value}
      onChange={onChange}
    />
  );
}
