import { Link } from "react-router-dom";
import { Card, Container, Typography } from "@mui/material";
import MuiMarkdown from "mui-markdown";
import { CollectionTagList } from "../components/collection/CollectionTagList";
import { CollectionItemList } from "../components/collection/CollectionItemList";
import { CollectionActions } from "../components/collection/CollectionActions";
import { ROUTES } from "../router";

const sampleMarkdown = `
# Mystical Artifacts Collection

Welcome to the enchanting world of mystical artifacts! Our collection features extraordinary items crafted by ancient wizards and skilled artisans. Each artifact possesses unique powers, adding a touch of magic to your life.
`;

export function CollectionPage() {
  const COLLECTION_NAME = "My Awesome Collection";
  const USER_NAME = "@username";
  const USER_LINK = ROUTES.USER({ userId: "123" });
  const CATEGORY_TITLE = "Magic potions";

  return (
    <Container>
      <Typography my={2} variant="h5" fontWeight={700} component="p">
        {COLLECTION_NAME}
      </Typography>
      <Typography mb={2}>
        Author:{" "}
        <Link to={USER_LINK} style={{ textDecoration: "underline" }}>
          {USER_NAME}
        </Link>
      </Typography>
      <Typography mb={2}>
        Category:{" "}
        <Link to={ROUTES.SEARCH} style={{ textDecoration: "underline" }}>
          {CATEGORY_TITLE}
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
