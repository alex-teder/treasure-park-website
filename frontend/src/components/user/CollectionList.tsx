import Grid from "@mui/material/Unstable_Grid2";
import { CollectionListItem } from "./CollectionListItem";

export function CollectionList() {
  return (
    <Grid container rowSpacing={8} columnSpacing={4} my={4}>
      <CollectionListItem />
      <CollectionListItem />
      <CollectionListItem />
      <CollectionListItem />
      <CollectionListItem />
      <CollectionListItem />
      <CollectionListItem />
      <CollectionListItem />
    </Grid>
  );
}
