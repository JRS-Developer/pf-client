import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Close, Save } from '@mui/icons-material';

const ProfileForm =  ({open, handleClose, titleForm, dataRole}) => {
  const [role, setRole] = React.useState(dataRole);

  const handleChange = (e) => {
    setRole({
      ...role, [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      {/*
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>*/}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`sm`}
        fullWidth={`sm`}
        scroll='paper'
      >
        <DialogTitle>{titleForm}</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
          <TextField id="outlined-basic" variant="standard" type="hidden" value={role.id}/>
          <TextField
            name="name"
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={role.name}
            onChange={handleChange}
            fullWidth={true}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} endIcon={<Save />}>
            Guardar
          </Button>
          <Button variant="outlined" onClick={handleClose} startIcon={<Close />}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileForm