import { Add, Image as ImageIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/router";
import { Collection } from "@/types";

import { EmptyPadding } from "./EmptyPadding";
import { NoItemsPlaceholder } from "./NoItemsPlaceholder";
import { SearchField } from "./SearchField";

const ITEMS_PER_PAGE = 10;

export function CollectionItemList({
  collection,
  items,
  isOwner,
}: {
  collection: Collection;
  items: Collection["items"];
  isOwner: boolean;
}) {
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
      <Typography fontWeight={700}>Total items: {items.length}</Typography>

      {isOwner && (
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ mt: 1 }}
          onClick={() => navigate(ROUTES.EDIT_ITEM, { state: { collection } })}
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
              onClick={() => navigate(ROUTES.ITEM(item.id))}
            >
              <TableCell width={1}>{item.index}.</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell width={1}>
                <Avatar variant="square">
                  <ImageIcon />
                </Avatar>
              </TableCell>
            </TableRow>
          ))}
          {!visibleItems.length && <NoItemsPlaceholder />}
          <EmptyPadding emptyRows={items.length >= ITEMS_PER_PAGE ? emptyRows : 0} />
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
