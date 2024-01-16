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
import { api } from "../../api";
import { UserContext } from "../UserProvider";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router";
import { ResponseWithError, User } from "../../types";

export function LoginForm() {
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");
    const result = await api.logIn({ loginValue, password });
    if ((result as ResponseWithError).error !== undefined) {
      setError((result as ResponseWithError).error);
      return;
    }
    setUser(result as User);
    navigate(ROUTES.ROOT);
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

      {error && <Alert severity="error">{error}</Alert>}

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
