import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type DangerDialogProps = {
  isOpen: boolean;
  title?: string;
  close?: () => void;
  confirm?: () => void;
};

export function DangerDialog({
  title,
  isOpen,
  close = () => {},
  confirm = () => {},
}: DangerDialogProps) {
  return (
    <Dialog open={isOpen} PaperProps={{ sx: { pr: 1 } }} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>You cannot undo this action.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button color="error" onClick={confirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
