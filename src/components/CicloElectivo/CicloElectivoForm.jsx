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
import { getCicloElectivos as listCicloElectivos, createCicloElectivo, modifiedCicloElectivo } from "../../actions/cicloElectivo";
import LoadingButton from "@mui/lab/LoadingButton";

const CicloElectivoForm =  ({open, handleClose, titleForm, dataForm, handleClickMessage}) => {
  const [rowCicloElectivo, setRowCicloElectivo] = React.useState(dataForm);

  const dispatch = useDispatch();

  const getStatusReducer = useSelector(state => state.cicloElectivoReducer);
  const { loading, message, error } = getStatusReducer;

  const handleChange = (e) => {
    setRowCicloElectivo({
      ...rowCicloElectivo, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(rowCicloElectivo.id){
      await dispatch(modifiedCicloElectivo(rowCicloElectivo))
    }else{
      await dispatch(createCicloElectivo(rowCicloElectivo));
    }

    //Iniciamos la alerta de la respuesta
    handleClickMessage();
    //Listamos los módulos actualizados o nuevos
    dispatch(listCicloElectivos());
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
            <TextField id="outlined-basic" name="id" variant="standard" type="hidden" value={rowCicloElectivo.id}/>
            <TextField
              name="name"
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              value={rowCicloElectivo.name}
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

export default CicloElectivoForm