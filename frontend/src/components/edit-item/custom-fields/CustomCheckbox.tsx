import { Checkbox, Typography } from "@mui/material";

import { CustomFieldProps } from "./types";

export function CustomCheckbox({ title, value, onChange }: CustomFieldProps) {
  return (
    <label>
      <Typography display="inline-block">{title}</Typography>
      <Checkbox checked={value as boolean} onChange={onChange} />
    </label>
  );
}
