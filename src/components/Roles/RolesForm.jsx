import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Close, Save } from '@mui/icons-material';
import { getRoles as listRoles, createRole, modifiedRole } from "../../actions/role";
import LoadingButton from "@mui/lab/LoadingButton";

const ProfileForm =  ({open, handleClose, titleForm, dataForm, handleClickMessage}) => {
  const [rowRole, setRowRole] = React.useState(dataForm);

  const dispatch = useDispatch();

  const getRoles = useSelector(state => state.rolesReducer);
  const { loading,/*  message, error */ } = getRoles;

  const handleChange = (e) => {
    setRowRole({
      ...rowRole, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(rowRole.id){
      await dispatch(modifiedRole(rowRole))
    }else{
      await dispatch(createRole(rowRole));
    }

    //Iniciamos la alerta de la respuesta
    handleClickMessage();
    //Listamos los módulos actualizados o nuevos
    dispatch(listRoles());
    //Cerramos el modal del formulario
    handleClose();

  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`sm`}
        width={`sm`}
        scroll='paper'
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{titleForm}</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <TextField id="outlined-basic" name="id" variant="standard" type="hidden" value={rowRole.id}/>
            <TextField
              name="name"
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              value={rowRole.name}
              onChange={handleChange}
              fullWidth={true}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            {!loading ?
              <>
                <Button type="submit" variant="contained" endIcon={<Save />}>Save</Button>
                <Button variant="outlined" onClick={handleClose} startIcon={<Close />}>Cancel</Button>
              </>
              : <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<Save />}
                variant="outlined"
              >
                Save
              </LoadingButton>}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ProfileForm