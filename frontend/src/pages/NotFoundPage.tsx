import { Close as CloseIcon } from "@mui/icons-material";
import { Avatar, Container } from "@mui/material";
import { Link } from "react-router-dom";

import { ROUTES } from "@/router";

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
