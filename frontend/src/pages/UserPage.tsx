import { Avatar, Box, Container, Typography } from "@mui/material";
import { UserActions } from "../components/user/UserActions";
import { CollectionList } from "../components/user/CollectionList";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";
import { useContext } from "react";
import { UserContext } from "../components/UserProvider";

export function UserPage() {
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.getUserProfile(parseInt(userId!)),
    retry: false,
  });

  if (isPending) return null;
  if (isError) {
    return <NotFoundPage />;
  }

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
      {user && user.id === parseInt(userId!) && <UserActions />}
      <h2>Personal collections:</h2>
      <CollectionList collections={data.userProfile.collections} />
    </Container>
  );
}
