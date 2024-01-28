import { Search } from "@mui/icons-material";
import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { api } from "@/api";
import { SearchList } from "@/components/search/SearchList";
import { SortingOptionButton } from "@/components/search/SortingOptionButton";

const INPUT_DEBOUNCE_TIME = 500;

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.getCategories(),
    retry: false,
  });

  const {
    data: searchResults,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [params.toString()],
    queryFn: () => {
      return api.getSearchResults(params.toString());
    },
    retry: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setInputValue(params.get("q") || ""), []);

  const initialCategory = categories?.find(({ id }) => id.toString() === params.get("category"));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParams((state) => {
        if (inputValue) {
          state.set("q", inputValue);
        } else {
          state.delete("q");
        }
        return state;
      });
    }, INPUT_DEBOUNCE_TIME);
    return () => clearTimeout(timeout);
  }, [inputValue, setParams]);

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
            onChange={(_, value) =>
              setParams((state) => {
                if (value?.id) {
                  state.set("category", value.id.toString());
                } else {
                  state.delete("category");
                }
                return state;
              })
            }
            defaultValue={
              initialCategory ? { label: initialCategory.title, id: initialCategory.id } : null
            }
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
            selected={params.get("sort") === null}
            onClick={() =>
              setParams((state) => {
                state.delete("sort");
                return state;
              })
            }
          >
            Most popular
          </SortingOptionButton>
          <SortingOptionButton
            selected={params.get("sort") === "newest"}
            onClick={() =>
              setParams((state) => {
                state.set("sort", "newest");
                return state;
              })
            }
          >
            Newest
          </SortingOptionButton>
          <SortingOptionButton
            selected={params.get("sort") === "oldest"}
            onClick={() =>
              setParams((state) => {
                state.set("sort", "oldest");
                return state;
              })
            }
          >
            Oldest
          </SortingOptionButton>
        </Grid>
      </Grid>

      {!isPending && !isFetching && !isError && <SearchList searchResults={searchResults || []} />}
    </Container>
  );
}
