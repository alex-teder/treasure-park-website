import { ArrowDownward } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ReactNode } from "react";

export function SortingOptionButton({
  selected,
  onClick,
  children,
}: {
  selected?: boolean;
  onClick: () => void;
  children?: ReactNode | ReactNode[];
}) {
  return (
    <Button
      variant={selected ? "contained" : "outlined"}
      endIcon={selected ? <ArrowDownward /> : null}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
