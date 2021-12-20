import * as React from 'react';
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
// import {getActions as listActions} from "../../actions/action";

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

export default function ConfirmDialog({openConfirm, handleCloseConfirm, message, dataForm, fnModifiedStatus, listData, handleClickMessage}) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault()
    dataForm.status === true ? dataForm.status = false : dataForm.status = true;
    let dataStatus = {
      id: dataForm.id,
      status: dataForm.status
    }
    await dispatch(fnModifiedStatus(dataStatus));

    handleCloseConfirm();
    //Iniciamos el mensaje respuesta
    handleClickMessage()
    //Listamos la data
    dispatch(listData());
  }

  return (
    <div>
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            CONFIRMAR
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseConfirm}>
              Cancelar
            </Button>
            <Button type="submit">SI, Eliminar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
