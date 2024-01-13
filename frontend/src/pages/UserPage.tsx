import { Avatar, Box, Container, Typography } from "@mui/material";
import { UserActions } from "../components/user/UserActions";
import { CollectionList } from "../components/user/CollectionList";

export function UserPage() {
  const USER_NAME = "@username-123";

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
          {USER_NAME}
        </Typography>
      </Box>
      <UserActions />
      <h2>Personal collections:</h2>
      <CollectionList />
    </Container>
  );
}
