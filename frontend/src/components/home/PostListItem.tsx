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
import { Link, useNavigate } from "react-router-dom";

export function PostListItem() {
  const navigate = useNavigate();

  return (
    <Card onClick={() => {}}>
      <CardHeader
        avatar={<Avatar sx={{ color: "white", bgcolor: "indigo" }}>U</Avatar>}
        title={<Link to="#">My Awesome Collection</Link>}
        subheader={<Link to="#">@username</Link>}
      />
      <Link to={"#"}>
        <Typography variant="h6" fontWeight="700" component="h5" sx={{ mx: 2 }}>
          My new item
        </Typography>
      </Link>
      <CardMedia
        component="img"
        image="https://source.unsplash.com/featured/"
        sx={{
          px: 2,
          py: 1,
          mx: "auto",
          display: "block",
          maxHeight: "500px",
          maxWidth: "100%",
          width: "auto",
          height: "auto",
          cursor: "pointer",
        }}
        onClick={() => navigate("#")}
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
