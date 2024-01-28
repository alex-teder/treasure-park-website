import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

import { PostListItem } from "./PostListItem";

export function PostList() {
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["feed"],
    queryFn: () => api.getFeed(),
    retry: false,
  });

  if (isPending || isFetching) return null;
  if (isError) {
    console.error(error);
    return null;
  }

  if (!data.length) {
    return <p style={{ color: "grey" }}>No posts here yet...</p>;
  }

  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      <Box mt={2} display="flex" flexDirection="column" gap="2rem">
        {data.map((item) => (
          <li key={item.id}>
            <PostListItem item={item} />
          </li>
        ))}
      </Box>
    </ul>
  );
}
