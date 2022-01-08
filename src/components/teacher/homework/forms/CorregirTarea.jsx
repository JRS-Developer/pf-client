import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Close, Save } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
// import validate from './validate'
import { useDispatch } from 'react-redux'
import { getTaskById, corregirTask } from '../../../../actions/tasks'
import enAULocale from 'date-fns/locale/en-AU'
import MenuItem from '@mui/material/MenuItem'

export default function CorrregirTarea({
  open,
  handleClose,
  titleForm,
  handleClickMessage,
  matricula_id,
  task_id,
  selection,
}) {
  //const params = useParams()
  //console.log(selection)
  const notas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const devoluciones = ['APROBADO', 'DESAPROBADO']
  const [input, setInput] = useState({
    matricula_id: selection.matricula_id,
    task_id,
    devolucion: selection.devolucion,
    grade: selection.grade,
    observation: selection.observation,
  })
  const dispatch = useDispatch()

  // const [errorTitle, setErrorTitle] = useState(null)

  const handleChange = (event) => {
    setInput((input) => ({ ...input, [event.target.name]: event.target.value }))
  }

  // const handleDateChange = (value) => {
  //   setInput((input) => ({ ...input, end_date: value }))
  //   // setErrors((errors) =>
  //   //   validate({ ...input, end_date: value }, 'end_date', errors)
  //   // )
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(corregirTask(input))
    //Cerramos el formulario
    handleClose()
    // Iniciamos el mensaje de respuesta
    /* handleClickMessage() */
    //Listamos las tareas
    await dispatch(getTaskById(task_id))
  }

  return (
    <center>
      <Dialog
        open={true}
        onClose={handleClose}
        maxWidth={`md`}
        width={`md`}
        scroll="paper"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{titleForm} Corregir Tarea </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <Box sx={{ width: '100%' }}>
              <Grid container spacing={2} columns={12} sx={{ p: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="devolucion"
                    sx={{ width: '100%' }}
                    id="devolucion"
                    select
                    label="Devolución"
                    value={input.devolucion || ''}
                    onChange={handleChange}
                  >
                    <MenuItem disabled value="">
                      <em>Seleccione</em>
                    </MenuItem>

                    {devoluciones?.map((valor) => (
                      <MenuItem key={valor} value={valor}>
                        {valor}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    locale={enAULocale}
                  >
                    <TextField
                      fullWidth
                      name="grade"
                      sx={{ width: '100%' }}
                      id="grade"
                      select
                      label="Nota"
                      value={input.grade}
                      onChange={handleChange}
                    >
                      <MenuItem disabled value="">
                        <em>Seleccione</em>
                      </MenuItem>

                      {notas.map((valor) => (
                        <MenuItem key={valor} value={valor}>
                          {valor}
                        </MenuItem>
                      ))}
                    </TextField>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    name="observation"
                    id="observation"
                    label="Observación"
                    placeholder="Observación"
                    onChange={handleChange}
                    //onFocus={handleDescriptionChange}
                    value={input.observation || ''}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
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
