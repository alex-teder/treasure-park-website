import { useTheme } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  CardHeader,
  Container,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { UIEventHandler, useState } from "react";
import { Link } from "react-router-dom";

export function CommentSection() {
  const OVERLAY_HEIGHT = 150;
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { mode } = useTheme().palette;
  const handleScroll: UIEventHandler = (e) => {
    const element = e.target as HTMLDivElement;
    if (element.scrollHeight - element.scrollTop - element.clientHeight < 32) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  return (
    <Container>
      <Divider />
      <div
        style={{ maxHeight: 500, overflow: "auto", position: "relative" }}
        onScroll={handleScroll}
      >
        <div style={{ marginBottom: `${-OVERLAY_HEIGHT}px` }}>
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
          <SingleComment />
        </div>
        <div
          style={{
            display: isAtBottom ? "none" : "block",
            position: "sticky",
            bottom: 0,
            width: "100%",
            height: `${OVERLAY_HEIGHT}px`,
            background: `linear-gradient(0deg, hsla(0,0%,${
              mode === "dark" ? 11 : 100
            }%,1) 0%, hsla(0,0%,${mode === "dark" ? 11 : 100}%,0) 100%)`,
            pointerEvents: "none",
          }}
        />
      </div>
      <NewCommentField />
    </Container>
  );
}

function NewCommentField() {
  return (
    <Box p={2} mb={2} display="flex" flexDirection="column" alignItems="flex-end">
      <TextField multiline minRows={2} size="small" placeholder="Leave a comment..." fullWidth />
      <Button variant="contained" sx={{ mt: 1 }}>
        Submit
      </Button>
    </Box>
  );
}

function SingleComment() {
  return (
    <>
      <CardHeader
        avatar={<Avatar>U</Avatar>}
        title={
          <Link to="/users/123">
            <b>@username</b>
          </Link>
        }
        subheader="Today, 13:31"
        action={true && <SingleCommentActions />}
      />
      <CardContent sx={{ fontSize: "0.875rem", pt: 0 }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe cum vitae doloremque
        reiciendis id perspiciatis exercitationem odit impedit corrupti necessitatibus!
      </CardContent>
      <Divider />
    </>
  );
}

function SingleCommentActions() {
  return (
    <IconButton>
      <Delete />
    </IconButton>
  );
}
