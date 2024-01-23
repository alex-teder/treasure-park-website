import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../api";
import { ROUTES } from "../../router";
import { Collection } from "../../types";
import { DangerDialog } from "../DangerDialog";

type CollectionActionsProps = {
  collection: Collection;
};

export function CollectionActions({ collection }: CollectionActionsProps) {
  const navigate = useNavigate();
  const [isDialog, setIsDialog] = useState(false);

  const handleDelete = async () => {
    const { error } = await api.deleteCollection(collection.id);
    if (error) {
      console.error(error);
      return;
    }
    navigate(ROUTES.USER({ id: collection.userId }));
  };

  return (
    <Box mb={2} display="flex" gap={2} flexWrap="wrap">
      <Button
        variant="outlined"
        onClick={() => navigate(ROUTES.EDIT_COLLECTION, { state: collection })}
      >
        Edit collection
      </Button>
      <Button variant="outlined" color="error" onClick={() => setIsDialog(true)}>
        Delete collection
      </Button>
      {isDialog && (
        <DangerDialog
          isOpen={isDialog}
          close={() => setIsDialog(false)}
          confirm={handleDelete}
          title={"Are you sure?"}
        />
      )}
    </Box>
  );
}
