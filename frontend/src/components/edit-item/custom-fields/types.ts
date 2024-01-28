import { Dayjs } from "dayjs";
import { ChangeEventHandler } from "react";

import { CustomAttributeValue } from "@/types";

export const DATE_STORING_FORMAT = "YYYY-MM-DD";

export type CustomFieldProps = {
  title: string;
  value: CustomAttributeValue;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export type CustomDateFieldProps = {
  title: string;
  value: CustomAttributeValue;
  onChange: (value: Dayjs | null) => void;
};
