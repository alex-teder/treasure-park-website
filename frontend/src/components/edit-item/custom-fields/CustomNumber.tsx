import { TextField, Typography } from "@mui/material";

import { CustomFieldProps } from "./types";

export function CustomNumber({ title, value, onChange }: CustomFieldProps) {
  return (
    <label>
      <Typography>{title}</Typography>
      <TextField type="number" sx={{ width: "8rem" }} value={value} onChange={onChange} />
    </label>
  );
}
