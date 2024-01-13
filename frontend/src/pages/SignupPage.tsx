import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { ROUTES } from "../router";
import { SignupForm } from "../components/signup/SignupForm";

export function SignupPage() {
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
      <SignupForm />
      <p>
        Already have an account?{" "}
        <Link to={ROUTES.LOGIN} style={{ textDecoration: "underline" }}>
          Log in!
        </Link>
      </p>
    </Container>
  );
}
