import { Link } from "react-router-dom";
import { Avatar, Container } from "@mui/material";
import { ROUTES } from "../router";
import { Close as CloseIcon } from "@mui/icons-material";

export function NotFoundPage() {
  return (
    <Container>
      <Avatar sx={{ mx: "auto", mt: 2 }}>
        <CloseIcon />
      </Avatar>
      <p style={{ textAlign: "center" }}>
        Sorry, page not found.{" "}
        <Link to={ROUTES.ROOT} style={{ textDecoration: "underline" }}>
          Go to homepage
        </Link>
      </p>
    </Container>
  );
}
