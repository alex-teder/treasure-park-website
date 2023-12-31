import { Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

export function CommentSection() {
  return (
    <>
      <SingleComment />
      <SingleComment />
      <SingleComment />
      <Box p={2} mb={2} display="flex" flexDirection="column" alignItems="flex-end">
        <TextField multiline minRows={2} size="small" placeholder="Leave a comment..." fullWidth />
        <Button variant="contained" sx={{ mt: 1 }}>
          Submit
        </Button>
      </Box>
    </>
  );
}

function SingleComment() {
  return (
    <>
      <Divider />
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
