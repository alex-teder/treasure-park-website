import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { TagCloud } from "react-tagcloud";

import { api } from "@/api";
import { ROUTES } from "@/router";

export function PopularTags() {
  const navigate = useNavigate();
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["popular_tags"],
    queryFn: () => api.getPopularTags(),
    retry: false,
  });

  if (isPending || isFetching) return null;
  if (isError) {
    console.error(error);
    return null;
  }

  return (
    <section>
      <h2 style={{ marginBottom: 0 }}>Popular Tags:</h2>
      <Box maxWidth={350}>
        <TagCloud
          tags={data}
          disableRandomColor
          minSize={15}
          maxSize={30}
          onClick={({ value }) => navigate(ROUTES.SEARCH(`?q=${value}`))}
          onMouseOver={(_, e) => {
            const tagElement = e.target as HTMLElement;
            tagElement.style.textDecoration = "underline";
          }}
          onMouseOut={(_, e) => {
            const tagElement = e.target as HTMLElement;
            tagElement.style.textDecoration = "none";
          }}
          style={{ cursor: "pointer" }}
        />
      </Box>
    </section>
  );
}
