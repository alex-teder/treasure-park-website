import { ModeCommentOutlined as CommentIcon } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  // CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ROUTES } from "../../router";
import { FeedPost } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { LikeButton } from "../LikeButton";
import { UserContext } from "../UserProvider";

export function PostListItem({ item }: { item: FeedPost }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ color: "white", bgcolor: "indigo" }}>U</Avatar>}
        title={
          <Link to={ROUTES.COLLECTION({ id: item.collection.id })}>{item.collection.title}</Link>
        }
        subheader={
          <Link to={ROUTES.USER({ id: item.collection.user.id })}>
            {"@" + item.collection.user.username}
          </Link>
        }
      />
      <Link to={ROUTES.ITEM({ id: item.id })}>
        <Typography variant="h6" fontWeight="700" component="h5" sx={{ mx: 2 }}>
          {item.title}
        </Typography>
      </Link>
      {/* <CardMedia
        component="img"
        image={IMAGE_HREF}
        sx={{
          px: 2,
          py: 1,
          mx: "auto",
          display: "block",
          maxHeight: "450px",
          maxWidth: "100%",
          width: "auto",
          height: "auto",
          cursor: "pointer",
        }}
        onClick={() => navigate(ITEM_LINK)}
      /> */}
      <CardContent>
        <Typography variant="body2">{item.description}</Typography>
      </CardContent>
      <CardActions sx={{ mb: 1 }}>
        <LikeButton
          initialLike={item.likes.some(({ userId }) => userId === user?.id)}
          initialCount={item.likes.length}
          itemId={item.id}
        />

        <IconButton color="inherit" onClick={() => navigate(ROUTES.ITEM({ id: item.id }))}>
          <CommentIcon />
        </IconButton>
        {item.comments.length}
        <div style={{ flexGrow: 1 }}></div>
        <Typography variant="caption" mr={2}>
          {formatDate(item.createdAt)}
        </Typography>
      </CardActions>
    </Card>
  );
}
