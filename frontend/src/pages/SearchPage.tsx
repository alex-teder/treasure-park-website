import { ArrowDownward, Search } from "@mui/icons-material";
import { Autocomplete, TextField, Container, Button, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactNode, useState } from "react";
import { SearchList } from "../components/search/SearchList";

export function SearchPage() {
  const [sortBy, setSortBy] = useState<"relevance" | "newest" | "oldest">("relevance");

  return (
    <Container maxWidth="md">
      <h1>Search items</h1>
      <Box display="flex" gap={1} component="form" onSubmit={(e) => e.preventDefault()}>
        <Autocomplete
          freeSolo
          sx={{ flexGrow: 1 }}
          options={["tag1", "tag2", "tag3"]}
          getOptionLabel={(tag) => tag}
          renderInput={(params) => (
            <TextField {...params} autoFocus placeholder="Type a keyword..." />
          )}
        />
        <Button type="submit" variant="contained" disableElevation>
          <Search />
        </Button>
      </Box>
      <Grid container columnSpacing={2} my={2}>
        <Grid xs={12} md={6}>
          <Autocomplete
            options={[]}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Filter by category" />
            )}
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          mt={{ xs: 2, md: 0 }}
          display="flex"
          flexWrap="wrap"
          justifyContent={{ md: "space-between" }}
          gap={{ xs: 1, md: 0 }}
        >
          <SortingOptionButton
            selected={sortBy === "relevance"}
            onClick={() => setSortBy("relevance")}
          >
            Most relevant
          </SortingOptionButton>
          <SortingOptionButton selected={sortBy === "newest"} onClick={() => setSortBy("newest")}>
            Newest
          </SortingOptionButton>
          <SortingOptionButton selected={sortBy === "oldest"} onClick={() => setSortBy("oldest")}>
            Oldest
          </SortingOptionButton>
        </Grid>
      </Grid>

      <SearchList />
    </Container>
  );
}

function SortingOptionButton({
  selected,
  onClick,
  children,
}: {
  selected?: boolean;
  onClick: () => void;
  children?: ReactNode | ReactNode[];
}) {
  return (
    <Button
      variant={selected ? "contained" : "outlined"}
      endIcon={selected ? <ArrowDownward /> : null}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
