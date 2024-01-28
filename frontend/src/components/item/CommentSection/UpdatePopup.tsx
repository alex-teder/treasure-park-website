import { Refresh } from "@mui/icons-material";
import { Box, Button, Collapse } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  areCommentsCurrent: boolean;
  difference?: number;
};

export function UpdatePopup({ areCommentsCurrent, difference }: Props) {
  const queryClient = useQueryClient();

  return (
    <Collapse in={!areCommentsCurrent}>
      <Box display="flex" justifyContent="center" p={1}>
        <Button
          color="inherit"
          size={"small"}
          endIcon={<Refresh />}
          onClick={() => queryClient.invalidateQueries()}
        >
          new comments {difference && `(${difference})`}
        </Button>
      </Box>
    </Collapse>
  );
}
