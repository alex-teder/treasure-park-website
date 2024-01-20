import {
  Avatar,
  Card,
  CardHeader,
  CardActions,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
} from "@mui/material";
import {
  FavoriteBorder as LikeIcon,
  ModeCommentOutlined as CommentIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../router";

export function PostListItem() {
  const navigate = useNavigate();

  const COLLECTION_NAME = "My Awesome Collection";
  const COLLECTION_LINK = ROUTES.COLLECTION({ id: 123 });
  const USER_NAME = "@username";
  const USER_LINK = ROUTES.USER({ id: 123 });
  const ITEM_NAME = "My new item";
  const ITEM_LINK = ROUTES.ITEM({ id: 123 });
  const IMAGE_HREF = "https://source.unsplash.com/featured/";
  const DESCRIPTION = "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, libero.";
  const LIKE_COUNT = "5";
  const COMMENT_COUNT = "1";
  const CREATED_AT_CAPTION = "Yesterday, 17:45";

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ color: "white", bgcolor: "indigo" }}>U</Avatar>}
        title={<Link to={COLLECTION_LINK}>{COLLECTION_NAME}</Link>}
        subheader={<Link to={USER_LINK}>{USER_NAME}</Link>}
      />
      <Link to={ITEM_LINK}>
        <Typography variant="h6" fontWeight="700" component="h5" sx={{ mx: 2 }}>
          {ITEM_NAME}
        </Typography>
      </Link>
      <CardMedia
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
      />
      <CardContent>
        <Typography variant="body2">{DESCRIPTION}</Typography>
      </CardContent>
      <CardActions sx={{ mb: 1 }}>
        <IconButton color="inherit">
          <LikeIcon />
        </IconButton>
        {LIKE_COUNT}
        <IconButton color="inherit" onClick={() => navigate(ITEM_LINK)}>
          <CommentIcon />
        </IconButton>
        {COMMENT_COUNT}
        <div style={{ flexGrow: 1 }}></div>
        <Typography variant="caption" mr={2}>
          {CREATED_AT_CAPTION}
        </Typography>
      </CardActions>
    </Card>
  );
}
