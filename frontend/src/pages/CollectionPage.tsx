import { Link } from "react-router-dom";
import { Card, Container, Typography } from "@mui/material";
import MuiMarkdown from "mui-markdown";
import { CollectionTagList } from "../components/collection/CollectionTagList";
import { CollectionItemList } from "../components/collection/CollectionItemList";
import { CollectionActions } from "../components/collection/CollectionActions";

const sampleMarkdown = `
# Mystical Artifacts Collection

Welcome to the enchanting world of mystical artifacts! Our collection features extraordinary items crafted by ancient wizards and skilled artisans. Each artifact possesses unique powers, adding a touch of magic to your life.
`;

export function CollectionPage() {
  return (
    <Container>
      <Typography my={2} variant="h5" fontWeight={700} component="p">
        My awesome collection
      </Typography>
      <Typography mb={2}>
        Author:{" "}
        <Link to={"/users/548493"} style={{ textDecoration: "underline" }}>
          @username
        </Link>
      </Typography>
      <Typography mb={2}>
        Category:{" "}
        <Link to={"#"} style={{ textDecoration: "underline" }}>
          Magic Potions
        </Link>
      </Typography>
      <CollectionTagList />
      {true && <CollectionActions />}
      <Card sx={{ mb: 2, p: 2, fontSize: "0.875rem" }}>
        <MuiMarkdown
          overrides={{
            h1: {
              component: "h1",
            },
          }}
        >
          {sampleMarkdown}
        </MuiMarkdown>
        <CollectionItemList />
      </Card>
    </Container>
  );
}
