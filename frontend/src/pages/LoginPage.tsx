import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { ROUTES } from "../router";
import { LoginForm } from "../components/login/LoginForm";

export function LoginPage() {
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
      <LoginForm />
      <p>
        No account yet?{" "}
        <Link to={ROUTES.SIGNUP} style={{ textDecoration: "underline" }}>
          Sign up!
        </Link>
      </p>
    </Container>
  );
}
