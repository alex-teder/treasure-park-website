import { TableRow, Typography } from "@mui/material";

export function NoItemsPlaceholder() {
  return (
    <TableRow>
      <Typography component="td" sx={{ color: "grey", textAlign: "center", p: 2 }}>
        no items...
      </Typography>
    </TableRow>
  );
}
