import { Search as SearchIcon } from "@mui/icons-material";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";

export function SearchField({ value, onChange }: TextFieldProps) {
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
