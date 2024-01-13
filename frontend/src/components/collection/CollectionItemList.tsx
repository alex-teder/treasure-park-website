import {
  Avatar,
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

const sampleItems = [
  { id: "1", title: "Crystal Orb of Divination" },
  { id: "2", title: "Ethereal Cloak of Invisibility" },
  { id: "3", title: "Phoenix Feather Quill" },
  { id: "4", title: "Potion of Timeless Wisdom" },
  { id: "5", title: "Sorcerer's Amulet of Protection" },
  { id: "6", title: "Mystic Rune Stone" },
  { id: "7", title: "Celestial Star Map" },
  { id: "8", title: "Arcane Crystal Wand" },
  { id: "9", title: "Enigmatic Shadow Mirror" },
  { id: "10", title: "Dreamweaver's Locket" },
  { id: "11", title: "Crown of Ethereal Flames" },
  { id: "12", title: "Astral Serpent Staff" },
  { id: "13", title: "Whispering Wind Chimes" },
  { id: "14", title: "Chrono-Shift Hourglass" },
  { id: "15", title: "Lunar Elixir Vial" },
  { id: "16", title: "Spectral Lantern of Illumination" },
  { id: "17", title: "Faerie Dust Vessel" },
  { id: "18", title: "Harmony Harmony Harmonica" },
  { id: "19", title: "Crescent Moon Tiara" },
  { id: "20", title: "Enchanted Sunflower Bloom" },
  { id: "21", title: "Dreamweaver's Locket" },
];

export function CollectionItemList() {
  const allItems = sampleItems;
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(0);
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  const IMAGE_HREF = "https://source.unsplash.com/featured/";

  useEffect(() => setPage(0), [searchField]);

  const visibleItems = useMemo(
    () =>
      allItems
        .map((item, idx) => ({ ...item, index: idx + 1 }))
        .filter((item) => {
          if (!searchField) return item;
          return item.title.toLowerCase().includes(searchField.toLowerCase());
        })
        .slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE),
    [page, searchField, allItems]
  );

  const emptyRows = visibleItems.length < ITEMS_PER_PAGE ? ITEMS_PER_PAGE - visibleItems.length : 0;

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Typography fontWeight={700} sx={{ mt: 4 }}>
        Total items: {allItems.length}
      </Typography>
      {true && (
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
                <Avatar variant="square" src={IMAGE_HREF}>
                  <ImageIcon />
                </Avatar>
              </TableCell>
            </TableRow>
          ))}

          {!visibleItems.length && <NoItemsPlaceholder />}

          <EmptyPadding emptyRows={emptyRows} />
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={sampleItems.length}
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
