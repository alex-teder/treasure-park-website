import {
  Avatar,
  Card,
  CardHeader,
  CardActions,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import {
  FavoriteBorder as LikeIcon,
  ModeCommentOutlined as CommentIcon,
} from "@mui/icons-material";

export function PostListItem() {
  return (
    <Card raised sx={{ m: 2 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "blue" }}>U</Avatar>}
        title="My Awesome Collection"
        subheader="@username"
      />
      <Typography variant="h6" fontWeight="700" component="h5" sx={{ mx: 2 }}>
        My new item
      </Typography>
      <CardMedia
        component="img"
        height="300"
        image="https://source.unsplash.com/featured/"
        sx={{ px: 2, py: 1 }}
      />
      <CardActions sx={{ mb: 1 }}>
        <IconButton color="inherit">
          <LikeIcon />
        </IconButton>
        5
        <IconButton color="inherit">
          <CommentIcon />
        </IconButton>
        1<div style={{ flexGrow: 1 }}></div>
        <Typography variant="caption" mr={2}>
          Yesterday, 17:45
        </Typography>
      </CardActions>
    </Card>
  );
}
