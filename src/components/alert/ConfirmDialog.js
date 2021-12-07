import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ConfirmDialog({openConfirm, handleCloseConfirm, message, dataRole}) {

  return (
    <div>
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          CONFIRMAR
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
            <p><b>Id:</b> {dataRole.id}</p>
            <p><b>Name:</b> {dataRole.name}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseConfirm}>
            Cancelar
          </Button>
          <Button onClick={handleCloseConfirm}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
