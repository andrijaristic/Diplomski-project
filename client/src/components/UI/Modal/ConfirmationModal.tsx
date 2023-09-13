import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";

interface IProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onClick: () => void;
}

const ConfirmationModal: FC<IProps> = ({
  open,
  title,
  content,
  onClose,
  onClick,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="large" onClick={onClose}>
          Close
        </Button>
        <Button size="large" onClick={onClick} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
