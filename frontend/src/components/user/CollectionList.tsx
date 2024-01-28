import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { UserProfile } from "@/types";

import { CollectionListItem } from "./CollectionListItem";

export function CollectionList({ collections }: { collections: UserProfile["collections"] }) {
  if (!collections.length) {
    return (
      <Typography variant="body1" sx={{ color: "grey" }}>
        No collections yet...
      </Typography>
    );
  }

  return (
    <Grid container rowSpacing={8} columnSpacing={4} my={4}>
      {collections.map((collection) => (
        <CollectionListItem key={collection.id} collection={collection} />
      ))}
    </Grid>
  );
}
