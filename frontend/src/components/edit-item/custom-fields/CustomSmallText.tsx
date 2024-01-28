import { TextField, Typography } from "@mui/material";

import { CustomFieldProps } from "./types";

export function CustomSmallText({ title, value, onChange }: CustomFieldProps) {
  return (
    <label>
      <Typography>{title}</Typography>
      <TextField fullWidth value={value} onChange={onChange} />
    </label>
  );
}
