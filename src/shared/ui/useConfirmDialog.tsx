import * as React from "react";
import Button, { ButtonOwnProps } from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRef, useState } from "react";

type ConfirmButtons = {
  okColor?: ButtonOwnProps["color"];
  ok?: string;
  cancel?: string;
};

export function useConfirmDialog() {
  const [isOpen, setOpen] = React.useState(false);
  let close = useRef<(ok: boolean) => void>(() => {});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [buttons, setButtons] = useState({});

  function showDialog(
    title: string,
    text: string,
    buttons?: ConfirmButtons
  ): Promise<boolean> {
    setTitle(title), setText(text);
    setButtons(buttons ?? {});
    setOpen(true);
    return new Promise((res) => (close.current = res));
  }

  return {
    dialog: (
      <AlertDialog
        isOpen={isOpen}
        onClose={(isOk) => {
          setOpen(false);
          close.current(isOk);
        }}
        title={title}
        text={text}
        buttons={buttons}
      />
    ),
    showDialog,
  };
}

interface AlertDialogProps {
  title: string;
  text: string;
  buttons: ConfirmButtons;
  isOpen: boolean;
  onClose: (confirmed: boolean) => void;
}

const AlertDialog = ({
  isOpen,
  onClose,
  title,
  text,
  buttons,
}: AlertDialogProps) => (
  <Dialog
    open={isOpen}
    onClose={() => onClose(false)}
    aria-describedby="alert-dialog-description"
  >
    {title && <DialogTitle>{title}</DialogTitle>}
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {text}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => onClose(false)}>
        {buttons.cancel ?? "Отмена"}
      </Button>
      <Button onClick={() => onClose(true)} color={buttons.okColor}>
        {buttons.ok ?? "ОК"}
      </Button>
    </DialogActions>
  </Dialog>
);
