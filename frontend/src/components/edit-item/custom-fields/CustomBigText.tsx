import { TextField, Typography } from "@mui/material";

import { CustomFieldProps } from "./types";

export function CustomBigText({ title, value, onChange }: CustomFieldProps) {
  return (
    <label>
      <Typography>{title}</Typography>
      <TextField multiline minRows={8} size="small" fullWidth value={value} onChange={onChange} />
    </label>
  );
}
