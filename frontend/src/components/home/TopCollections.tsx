import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { api } from "../../api";
import { ROUTES } from "../../router";

export function TopCollections() {
  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["top_collections"],
    queryFn: () => api.getTopCollections(),
    retry: false,
  });

  if (isPending || isFetching) return null;
  if (isError) {
    console.error(error);
    return null;
  }

  return (
    <section>
      <Box mb={2}>
        <h3>Top collections:</h3>
        <ol style={{ padding: 0, listStyle: "none" }}>
          {data.map((collection, idx) => (
            <li key={collection.id}>
              <Link to={ROUTES.COLLECTION({ id: collection.id })}>
                <Typography variant="body2">
                  {idx + 1}. {collection.title} - @{collection.username}
                </Typography>
              </Link>
            </li>
          ))}
        </ol>
      </Box>
    </section>
  );
}
