import React, { useState} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import { Close, Save } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
// import validate from './validate'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createTask, getTasks } from '../../../../actions/tasks'

export default function CreateTaskForm({
  open,
  handleClose,
  titleForm,
  handleClickMessage,
}) {

    const params = useParams()
    const dataparams = {
        ...params,
        class_id: params.clase_id,
    }
    
  const [input, setInput] = useState(dataparams)
  const dispatch = useDispatch()
  

  const [errorTitle, setErrorTitle] = useState(null)

  const handleChange = (event) => {
    setInput((input) => ({ ...input, [event.target.name]: event.target.value }))
    setErrorTitle(event.target.name === "title" && event.target.value ? null : "Campo necesario")
  }

  /* const handleDateChange = (value) => {
    setInput((input) => ({ ...input, end_date: value }))
    // setErrors((errors) =>
    //   validate({ ...input, end_date: value }, 'end_date', errors)
    // )
  } */

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(createTask(input))
    //Cerramos el formulario
    handleClose()
    // Iniciamos el mensaje de respuesta
    handleClickMessage()
    //Listamos las tareas
    await dispatch(getTasks(params))
  }

  return (
    <center>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`md`}
        width={`md`}
        scroll="paper"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{titleForm} Nueva Tarea </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <Box sx={{ width: '100%' }}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    error={errorTitle ? true : false}
                    name="title"
                    id="title"
                    label="Título"
                    placeholder="Titulo"
                    onChange={handleChange}
                    onFocus={handleChange}
                    helperText={errorTitle}
                    value={input.title}
                  />
                </Grid>
                <Grid item xs={5.8}>
                  <TextField
                    fullWidth
                    sx={{ ml: 2 }}
                    name="description"
                    id="description"
                    label="Descripción"
                    placeholder="Descripción"
                    value={input.description}
                  />
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      fullWidth
                      sx={{ mr: 2, width: '100%' }}
                      value={input.end_date}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          sx={{ mr: 2, width: '100%' }}
                          {...params}
                          name="end_date"
                          id="end_Date"
                          label="Fecha de Entrega"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                </Grid>       
            </Box>
          </DialogContent>
          <DialogActions>
           
              <>
                <Button
                  type="submit"
                  disabled={
                    input.title === undefined
                      ? true
                      : false
                  }
                  variant="contained"
                  endIcon={<Save />}
                >
                  Guardar
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleClose}
                  startIcon={<Close />}
                >
                  Cancelar
                </Button>
              </>
          </DialogActions>
        </form>
      </Dialog>
    </center>
  )
}
