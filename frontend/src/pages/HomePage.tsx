import { Container, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";

import { NoAuthBanner } from "@/components/home/NoAuthBanner";
import { PopularTags } from "@/components/home/PopularTags";
import { PostList } from "@/components/home/PostList";
import { TopCollections } from "@/components/home/TopCollections";
import { UserContext } from "@/components/UserProvider";

export function HomePage() {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useContext(UserContext);

  return (
    <>
      {!user && <NoAuthBanner />}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs={12} md={7} order={isScreenSmall ? 1 : 0}>
            <PostList />
          </Grid>

          <Grid xs={12} md={5}>
            <TopCollections />
            <PopularTags />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
