import { Box } from "@mui/material";

import { SearchResult } from "../../types";
import { SearchListItem } from "./SearchListItem";

export function SearchList({ searchResults }: { searchResults: SearchResult[] }) {
  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      <Box mt={2} display="flex" flexDirection="column" gap="1rem">
        {searchResults.map((item) => (
          <li key={item.itemId}>
            <SearchListItem item={item} />
          </li>
        ))}
      </Box>
    </ul>
  );
}
