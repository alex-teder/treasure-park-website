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

export function PostListItem() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ color: "white", bgcolor: "indigo" }}>U</Avatar>}
        title={<Link to="#">My Awesome Collection</Link>}
        subheader={<Link to="/users/123">@username</Link>}
      />
      <Link to={"/users/32/collections/4/items/2"}>
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
          maxHeight: "450px",
          maxWidth: "100%",
          width: "auto",
          height: "auto",
          cursor: "pointer",
        }}
        onClick={() => navigate("/users/32/collections/4/items/2")}
      />
      <CardContent>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At, libero.
        </Typography>
      </CardContent>
      <CardActions sx={{ mb: 1 }}>
        <IconButton color="inherit">
          <LikeIcon />
        </IconButton>
        5
        <IconButton color="inherit" onClick={() => navigate("/users/32/collections/4/items/2")}>
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
