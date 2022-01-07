import * as React from 'react'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'
import Draggable from 'react-draggable'
import { removeTask } from '../../../../actions/tasks'
// import {getActions as listActions} from "../../actions/action";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}

export default function ConfirmDelete({
  openConfirm,
  handleCloseConfirm,
  message,
  tareaAborrar,
  handleClickMessage,
  deletedTask,
  setDeletedTask,
}) {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await dispatch(removeTask(tareaAborrar))
    setDeletedTask(deletedTask + 1)

    handleCloseConfirm()
    //Iniciamos el mensaje respuesta
    handleClickMessage()
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
            <DialogContentText>{message}</DialogContentText>
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
  )
}
