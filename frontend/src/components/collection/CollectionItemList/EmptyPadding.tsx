import { TableCell, TableRow } from "@mui/material";

export function EmptyPadding({ emptyRows }: { emptyRows: number }) {
  return emptyRows ? (
    <TableRow
      style={{
        height: 53 * emptyRows,
      }}
    >
      <TableCell colSpan={6} />
    </TableRow>
  ) : null;
}
