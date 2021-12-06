import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Profile.css'

const ProfileForm =  ({open, handleClose}) => {

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
      >
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
          <TextField
            name="name"
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfileForm