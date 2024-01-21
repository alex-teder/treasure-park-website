import { Box } from "@mui/material";

import { SearchListItem } from "./SearchListItem";

export function SearchList() {
  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      <Box mt={2} display="flex" flexDirection="column" gap="1rem">
        <li>
          <SearchListItem />
        </li>
        <li>
          <SearchListItem />
        </li>
        <li>
          <SearchListItem />
        </li>
        <li>
          <SearchListItem />
        </li>
        <li>
          <SearchListItem />
        </li>
        <li>
          <SearchListItem />
        </li>
      </Box>
    </ul>
  );
}
