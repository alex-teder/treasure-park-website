import {
  Delete,
  Edit,
  FavoriteBorder as LikeIcon,
  ModeCommentOutlined as CommentIcon,
} from "@mui/icons-material";
import {
  Avatar,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { CommentSection } from "../components/item/CommentSection";
import { ROUTES } from "../router";

export function ItemPage() {
  return (
    <Container maxWidth="md">
      <Card sx={{ my: 2 }}>
        <CardHeader
          avatar={<Avatar sx={{ color: "white", bgcolor: "indigo" }}>U</Avatar>}
          title={<Link to="/users/123/collections/7654">My Awesome Collection</Link>}
          subheader={<Link to="/users/123">@username</Link>}
          action={true && <OwnerActions />}
        />
        <Typography variant="h5" fontWeight="700" component="h5" sx={{ mx: 2 }}>
          My new item
        </Typography>
        <CardMedia
          component="img"
          image="https://source.unsplash.com/featured/"
          sx={{
            px: 2,
            py: 1,
            mx: "auto",
            display: "block",
            maxHeight: "650px",
            maxWidth: "100%",
            width: "auto",
            height: "auto",
          }}
        />
        <CardContent>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, libero.
          </Typography>
        </CardContent>
        <CardActions sx={{ mb: 1 }}>
          <IconButton color="inherit">
            <LikeIcon />
          </IconButton>
          5
          <IconButton color="inherit">
            <CommentIcon />
          </IconButton>
          3<div style={{ flexGrow: 1 }}></div>
          <Typography variant="caption" mr={2}>
            Yesterday, 17:45
          </Typography>
        </CardActions>
        <CommentSection />
      </Card>
    </Container>
  );
}

function OwnerActions() {
  const navigate = useNavigate();

  return (
    <ButtonGroup>
      <IconButton>
        <Delete />
      </IconButton>
      <IconButton onClick={() => navigate(ROUTES.EDIT_ITEM)}>
        <Edit />
      </IconButton>
    </ButtonGroup>
  );
}
