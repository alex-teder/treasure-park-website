import {
  FavoriteBorder as LikeIcon,
  ModeCommentOutlined as CommentIcon,
} from "@mui/icons-material";
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
import { Link, useNavigate } from "react-router-dom";

import { ROUTES } from "../../router";
import { FeedPost } from "../../types";
import { formatDate } from "../../utils/formatDate";

export function PostListItem({ item }: { item: FeedPost }) {
  const navigate = useNavigate();

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
        <IconButton color="inherit">
          <LikeIcon />
        </IconButton>
        {item.likes.length}
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
