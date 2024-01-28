import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { api } from "@/api";
import { DangerDialog } from "@/components/reused/DangerDialog";
import { Item } from "@/types";

export function SingleCommentActions({ comment }: { comment: Item["comments"][number] }) {
  const queryClient = useQueryClient();
  const [isDialog, setIsDialog] = useState(false);

  const handleDelete = async () => {
    const { error } = await api.deleteComment(comment.id);
    if (error) {
      console.error(error);
      return;
    }
    setIsDialog(false);
    queryClient.invalidateQueries();
  };

  return (
    <>
      <IconButton onClick={() => setIsDialog(true)}>
        <Delete />
      </IconButton>
      {isDialog && (
        <DangerDialog
          isOpen={isDialog}
          close={() => setIsDialog(false)}
          confirm={handleDelete}
          title={"Delete this comment?"}
        />
      )}
    </>
  );
}
