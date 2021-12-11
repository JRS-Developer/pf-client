import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Close, Save } from '@mui/icons-material';

import { getModules as listModules, createModule, modifiedModule } from "../../actions/module";
import LoadingButton from "@mui/lab/LoadingButton";

const ModuleForm =  ({open, handleClose, titleForm, dataForm, handleClickMessage}) => {

  const [rowModule, setRowModule] = React.useState(dataForm);

  const dispatch = useDispatch();

  const getModules = useSelector(state => state.modulesReducer);
  const { loading, message, error } = getModules;

  const handleChange = (e) => {
    setRowModule({
      ...rowModule, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(rowModule.id){
      await dispatch(modifiedModule(rowModule))
    }else{
      await dispatch(createModule(rowModule));
    }

    //Iniciamos la alerta de la respuesta
    handleClickMessage();
    //Listamos los módulos actualizados o nuevos
    dispatch(listModules());
    //Cerramos el modal del formulario
    handleClose();

  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`sm`}
        fullWidth={`sm`}
        scroll='paper'
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{titleForm}</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <TextField id="outlined-basic" name="id" variant="standard" type="hidden" value={rowModule.id}/>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    value={rowModule.name}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="url"
                    margin="dense"
                    id="url"
                    label="Url"
                    type="text"
                    value={rowModule.url}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="icon"
                    margin="dense"
                    id="icon"
                    label="Icon"
                    type="text"
                    value={rowModule.icon}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
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

export default ModuleForm