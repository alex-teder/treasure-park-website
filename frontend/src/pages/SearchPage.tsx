import { ArrowDownward, Search } from "@mui/icons-material";
import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { api } from "../api";
import { SearchList } from "../components/search/SearchList";

export function SearchPage() {
  const { state } = useLocation();
  const initialInputValue = state ? state.q : "";

  const [searchState, setSearchState] = useState<{
    q?: string;
    category?: number;
    sort?: "newest" | "oldest";
  }>({});

  const [inputValue, setInputValue] = useState(initialInputValue);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.getCategories(),
    retry: false,
  });

  const { data: searchResults } = useQuery({
    queryKey: [searchState],
    queryFn: () => {
      const newParams = new URLSearchParams();
      if (searchState.q) newParams.append("q", searchState.q);
      if (searchState.category) newParams.append("category", String(searchState.category));
      if (searchState.sort) newParams.append("sort", searchState.sort);
      return api.getSearchResults(newParams.toString());
    },
    retry: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchState((state) => ({ ...state, q: inputValue }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <Container maxWidth="md">
      <h1>Search items</h1>
      <Box display="flex" gap={1} component="form" onSubmit={(e) => e.preventDefault()}>
        <TextField
          fullWidth
          placeholder="Type a keyword..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" variant="contained" disableElevation>
          <Search />
        </Button>
      </Box>
      <Grid container columnSpacing={2} my={2}>
        <Grid xs={12} md={6}>
          <Autocomplete
            options={categories?.map(({ title, id }) => ({ label: title, id })) || []}
            isOptionEqualToValue={({ id: id1 }, { id: id2 }) => id1 === id2}
            onChange={(_, value) => setSearchState((state) => ({ ...state, category: value?.id }))}
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
            selected={searchState.sort === undefined}
            onClick={() => setSearchState((state) => ({ ...state, sort: undefined }))}
          >
            Most popular
          </SortingOptionButton>
          <SortingOptionButton
            selected={searchState.sort === "newest"}
            onClick={() => setSearchState((state) => ({ ...state, sort: "newest" }))}
          >
            Newest
          </SortingOptionButton>
          <SortingOptionButton
            selected={searchState.sort === "oldest"}
            onClick={() => setSearchState((state) => ({ ...state, sort: "oldest" }))}
          >
            Oldest
          </SortingOptionButton>
        </Grid>
      </Grid>

      <SearchList searchResults={searchResults || []} />
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
