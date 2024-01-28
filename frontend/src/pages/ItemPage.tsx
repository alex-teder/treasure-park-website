import { ModeCommentOutlined as CommentIcon } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { api } from "@/api";
import { DATE_STORING_FORMAT } from "@/components/edit-item/custom-fields/types";
import { CommentSection } from "@/components/item/CommentSection";
import { OwnerActions } from "@/components/item/OwnerActions";
import { LikeButton } from "@/components/reused/LikeButton";
import { UserContext } from "@/components/UserProvider";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ROUTES } from "@/router";
import { CustomAttributeValue } from "@/types";
import { formatDate } from "@/utils/formatDate";

export function ItemPage() {
  const { itemId } = useParams();
  const { user } = useContext(UserContext);

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: [itemId],
    queryFn: () => api.getItem(parseInt(itemId!)),
    retry: false,
  });

  if (isPending || isFetching) return null;
  if (isError) {
    console.error(error);
    return <NotFoundPage />;
  }

  const isOwner = Boolean(user?.id === data.item.collection.user.id || user?.isAdmin);

  const customValueRenderMethods = {
    smallText: (value: CustomAttributeValue) => <span>{value}</span>,
    bigText: (value: CustomAttributeValue) => (
      <p style={{ whiteSpace: "pre-line", marginTop: 0, padding: "1rem" }}>{value}</p>
    ),
    number: (value: CustomAttributeValue) => <span>{String(value)}</span>,
    checkbox: (value: CustomAttributeValue) => <span>{String(value)}</span>,
    date: (value: CustomAttributeValue) => (
      <span>{dayjs(value as string, DATE_STORING_FORMAT).format("DD MMM YYYY")}</span>
    ),
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ my: 2 }}>
        <CardHeader
          avatar={<Avatar />}
          title={
            <Link to={ROUTES.COLLECTION(data.item.collectionId)}>{data.item.collection.title}</Link>
          }
          subheader={
            <Link to={ROUTES.USER(data.item.collection.user.id)}>
              {"@" + data.item.collection.user.username}
            </Link>
          }
          action={isOwner && <OwnerActions item={data.item} />}
        />

        <Typography variant="h5" fontWeight="700" component="h5" sx={{ mx: 2 }}>
          {data.item.title}
        </Typography>

        {data.item.attachments[0] && (
          <CardMedia
            component="img"
            image={data.item.attachments[0].url}
            sx={{
              px: 2,
              py: 1,
              mx: "auto",
              display: "block",
              maxHeight: "650px",
              minHeight: "300px",
              maxWidth: "100%",
              width: "auto",
              height: "auto",
            }}
          />
        )}

        <CardContent>
          <Typography mb={1}>{data.item.description}</Typography>
          {data.item.itemAttributes.map(({ attribute, value }) => (
            <Typography key={attribute.id} component="div">
              <span style={{ fontWeight: 700 }}>{attribute.title}</span>:{" "}
              {customValueRenderMethods[attribute.type](value)}
            </Typography>
          ))}
        </CardContent>

        <CardActions sx={{ mb: 1 }}>
          <LikeButton
            initialLike={data.item.likes.some(({ userId }) => userId === user?.id)}
            initialCount={data.item.likes.length}
            itemId={data.item.id}
          />
          <IconButton color="inherit">
            <CommentIcon />
          </IconButton>
          {data.item.comments.length}

          <div style={{ flexGrow: 1 }}></div>

          <Typography variant="caption" mr={2}>
            {formatDate(data.item.createdAt)}
          </Typography>
        </CardActions>

        <CommentSection comments={data.item.comments} itemId={data.item.id} />
      </Card>
    </Container>
  );
}
