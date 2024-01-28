import { Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { CustomDateFieldProps, DATE_STORING_FORMAT } from "./types";

export function CustomDate({ title, value, onChange }: CustomDateFieldProps) {
  const date = dayjs(value as string, DATE_STORING_FORMAT);

  return (
    <label>
      <Typography>{title}</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker format="DD MMM YYYY" value={date} onChange={onChange} />
      </LocalizationProvider>
    </label>
  );
}
