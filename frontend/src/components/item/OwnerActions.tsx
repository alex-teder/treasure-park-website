import { Delete, Edit } from "@mui/icons-material";
import { ButtonGroup, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../api";
import { ROUTES } from "../../router";
import { Item } from "../../types";
import { DangerDialog } from "../DangerDialog";

export function OwnerActions({ item }: { item: Item }) {
  const navigate = useNavigate();
  const [isDialog, setIsDialog] = useState(false);

  const handleDelete = async () => {
    const { error } = await api.deleteItem(item.id);
    if (error) {
      console.error(error);
      return;
    }
    navigate(ROUTES.COLLECTION({ id: item.collectionId }));
  };

  return (
    <>
      <ButtonGroup>
        <IconButton onClick={() => setIsDialog(true)}>
          <Delete />
        </IconButton>
        <IconButton onClick={() => navigate(ROUTES.EDIT_ITEM, { state: { item } })}>
          <Edit />
        </IconButton>
      </ButtonGroup>
      {isDialog && (
        <DangerDialog
          isOpen={isDialog}
          close={() => setIsDialog(false)}
          confirm={handleDelete}
          title={"Are you sure you want to delete this item?"}
        />
      )}
    </>
  );
}
