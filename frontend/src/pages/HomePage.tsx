import { Container, useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { TopCollections } from "../components/home/TopCollections";
import { PopularTags } from "../components/home/PopularTags";
import { PostList } from "../components/home/PostList";
import { NoAuthBanner } from "../components/home/NoAuthBanner";

export function HomePage() {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <NoAuthBanner />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs={12} md={7} order={isScreenSmall ? 1 : 0}>
            <h2>Latest posts:</h2>
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
