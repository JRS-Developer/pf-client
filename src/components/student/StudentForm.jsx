import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Close, Save } from '@mui/icons-material';

import { getStudents as listStudents, modifiedStudent, createStudent } from "../../actions/student";

const StudentForm =  ({open, handleClose, titleForm, dataForm, handleClickMessage}) => {
  const [rowStudent, setRowStudent] = React.useState(dataForm);
  console.log(dataForm)
  const dispatch = useDispatch();

  const getStudents = useSelector(state => state.studentReducer);
  const { loading/* , message, error  */} = getStudents;

  const handleChange = (e) => {
    setRowStudent({
      ...rowStudent, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(rowStudent.id){
      await dispatch(modifiedStudent(rowStudent))
    }else{
      await dispatch(createStudent(rowStudent));
    }
    //Cerramos el formulario
    handleClose()
    // Iniciamos el mensaje de respuesta
    handleClickMessage()
    //Listamos las students
    dispatch(listStudents());
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
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <TextField id="id" name="id" variant="standard" type="hidden" value={rowStudent.id}/>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    value={rowStudent.firstName}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="onclick"
                    margin="dense"
                    id="onclick"
                    label="OnClick"
                    type="text"
                    value={rowStudent.onclick}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="action_param"
                    margin="dense"
                    id="action_param"
                    label="Action Param"
                    type="text"
                    value={rowStudent.action_param}
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
                    value={rowStudent.icon}
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

export default StudentForm