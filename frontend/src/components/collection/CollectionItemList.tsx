import {
  // Avatar,
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Add, Image as ImageIcon, Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router";
import { Collection } from "../../types";

export function CollectionItemList({
  items,
  isOwner,
}: {
  items: Collection["items"];
  isOwner: boolean;
}) {
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(0);
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  useEffect(() => setPage(0), [searchField]);

  const visibleItems = useMemo(
    () =>
      items
        .map((item, idx) => ({ ...item, index: idx + 1 }))
        .filter((item) => {
          if (!searchField) return item;
          return item.title.toLowerCase().includes(searchField.toLowerCase());
        })
        .slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE),
    [page, searchField, items]
  );

  const emptyRows = visibleItems.length < ITEMS_PER_PAGE ? ITEMS_PER_PAGE - visibleItems.length : 0;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Typography fontWeight={700} sx={{ mt: 4 }}>
        Total items: {items.length}
      </Typography>
      {isOwner && (
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ mt: 1 }}
          onClick={() => navigate(ROUTES.EDIT_ITEM)}
        >
          Add item
        </Button>
      )}

      <SearchField value={searchField} onChange={(e) => setSearchField(e.target.value)} />

      <Table size="small">
        <TableBody>
          {visibleItems.map((item) => (
            <TableRow
              key={item.id}
              hover
              role="button"
              sx={{ cursor: "pointer" }}
              onClick={() =>
                navigate(ROUTES.ITEM({ userId: "123", collectionId: "321", itemId: "1" }))
              }
            >
              <TableCell width={1}>{item.index}.</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell width={1}>
                {/* <Avatar variant="square" src={IMAGE_HREF}> */}
                <ImageIcon />
                {/* </Avatar> */}
              </TableCell>
            </TableRow>
          ))}

          {!visibleItems.length && <NoItemsPlaceholder />}

          <EmptyPadding emptyRows={emptyRows} />
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={items.length}
        rowsPerPage={ITEMS_PER_PAGE}
        rowsPerPageOptions={[]}
        sx={{ mt: 1 }}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
}

function SearchField({ value, onChange }: TextFieldProps) {
  return (
    <TextField
      size="small"
      placeholder="Quick search"
      autoComplete="false"
      sx={{ display: "block", my: 2 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={onChange}
    />
  );
}

function NoItemsPlaceholder() {
  return (
    <TableRow>
      <Typography component="td" sx={{ color: "grey", textAlign: "center", p: 2 }}>
        no items...
      </Typography>
    </TableRow>
  );
}

function EmptyPadding({ emptyRows }: { emptyRows: number }) {
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
