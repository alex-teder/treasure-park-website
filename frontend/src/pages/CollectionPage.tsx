import { Card, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import MuiMarkdown from "mui-markdown";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { api } from "../api";
import { CollectionActions } from "../components/collection/CollectionActions";
import { CollectionItemList } from "../components/collection/CollectionItemList";
import { CollectionTagList } from "../components/collection/CollectionTagList";
import { UserContext } from "../components/UserProvider";
import { ROUTES } from "../router";
import { NotFoundPage } from "./NotFoundPage";

export function CollectionPage() {
  const { collectionId } = useParams();
  const { user } = useContext(UserContext);
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: [collectionId],
    queryFn: () => api.getCollection(parseInt(collectionId!)),
    retry: false,
  });

  if (isPending || isFetching) return null;
  if (isError) {
    console.error(error);
    return <NotFoundPage />;
  }

  const category = data.collection.category ? data.collection.category.title : "Other";
  const isOwner = Boolean(user?.id === data.collection.userId || user?.isAdmin);

  return (
    <Container maxWidth="md">
      <Typography my={2} variant="h5" fontWeight={700} component="p">
        {data.collection.title}
      </Typography>
      <Typography mb={2}>
        Author:{" "}
        <Link
          to={ROUTES.USER({ id: data.collection.userId })}
          style={{ textDecoration: "underline" }}
        >
          {"@" + data.collection.user.username}
        </Link>
      </Typography>
      <Typography mb={2}>
        Category: <Link to={ROUTES.SEARCH}>{category}</Link>
      </Typography>
      <CollectionTagList tags={data.collection.collectionTags} />

      {isOwner && <CollectionActions collection={data.collection} />}

      <MuiMarkdown
        overrides={{
          h1: {
            component: "h1",
          },
        }}
      >
        {data.collection.description}
      </MuiMarkdown>

      <Card sx={{ my: 2, p: 2, fontSize: "0.875rem" }}>
        <CollectionItemList
          collection={data.collection}
          items={data.collection.items}
          isOwner={isOwner}
        />
      </Card>
    </Container>
  );
}
