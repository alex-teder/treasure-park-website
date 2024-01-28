import { Avatar, Box, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";

import { api } from "@/api";
import { CollectionList } from "@/components/user/CollectionList";
import { UserActions } from "@/components/user/UserActions";
import { UserContext } from "@/components/UserProvider";

import { NotFoundPage } from "./NotFoundPage";

export function UserPage() {
  const { userId } = useParams();
  const { user } = useContext(UserContext);

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: [userId],
    queryFn: () => api.getUserProfile(parseInt(userId!)),
    retry: false,
  });

  if (isPending || isFetching) return null;
  if (isError) {
    console.error(error);
    return <NotFoundPage />;
  }

  const isOwner = Boolean((user && user.id === parseInt(userId!)) || user?.isAdmin);

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap={2}
        mt={2}
        mb={6}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Avatar sx={{ height: "5rem", width: "5rem" }} />
        <Typography variant="h5" component="h1">
          {"@" + data.userProfile.username}
        </Typography>
      </Box>

      {isOwner && <UserActions />}

      <h2>Personal collections:</h2>
      <CollectionList collections={data.userProfile.collections} />
    </Container>
  );
}
