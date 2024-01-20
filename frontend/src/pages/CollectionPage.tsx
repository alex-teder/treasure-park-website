import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, Container, Typography } from "@mui/material";
import MuiMarkdown from "mui-markdown";
import { CollectionTagList } from "../components/collection/CollectionTagList";
import { CollectionItemList } from "../components/collection/CollectionItemList";
import { CollectionActions } from "../components/collection/CollectionActions";
import { ROUTES } from "../router";
import { UserContext } from "../components/UserProvider";
import { api } from "../api";
import { NotFoundPage } from "./NotFoundPage";

export function CollectionPage() {
  const { collectionId } = useParams();
  const { user } = useContext(UserContext);
  const { data, isPending, isError } = useQuery({
    queryKey: ["collection"],
    queryFn: () => api.getCollection(parseInt(collectionId!)),
    retry: false,
  });

  if (isPending) return null;
  if (isError) {
    return <NotFoundPage />;
  }

  const isOwner = Boolean(user?.id === data.collection.userId || user?.isAdmin);

  return (
    <Container maxWidth="md">
      <Typography my={2} variant="h5" fontWeight={700} component="p">
        {data.collection.title}
      </Typography>
      <Typography mb={2}>
        Author:{" "}
        <Link
          to={ROUTES.USER({ userId: String(data.collection.userId) })}
          style={{ textDecoration: "underline" }}
        >
          {"@" + data.collection.user.username}
        </Link>
      </Typography>
      <Typography mb={2}>
        Category:{" "}
        <Link to={ROUTES.SEARCH} style={{ textDecoration: "underline" }}>
          Books
        </Link>
      </Typography>
      <CollectionTagList />
      {isOwner && <CollectionActions />}
      <Card sx={{ mb: 2, p: 2, fontSize: "0.875rem" }}>
        <MuiMarkdown
          overrides={{
            h1: {
              component: "h1",
            },
          }}
        >
          {data.collection.description}
        </MuiMarkdown>
        <CollectionItemList items={data.collection.items} isOwner={isOwner} />
      </Card>
    </Container>
  );
}
