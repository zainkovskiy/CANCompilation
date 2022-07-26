import React from "react";
import Dialog from '@mui/material/Dialog';

export function ModalWindow(props) {
  const { onClose, open, children, maxSize } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={maxSize || 'sm'}
      sx={{zIndex: 99}}
    >
      {children}
    </Dialog>
  )
}