import { Box } from "@mui/material";

import { PostListItem } from "./PostListItem";

export function PostList() {
  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      <Box mt={2} display="flex" flexDirection="column" gap="2rem">
        <li>
          <PostListItem />
        </li>
        <li>
          <PostListItem />
        </li>
        <li>
          <PostListItem />
        </li>
        <li>
          <PostListItem />
        </li>
        <li>
          <PostListItem />
        </li>
      </Box>
    </ul>
  );
}
