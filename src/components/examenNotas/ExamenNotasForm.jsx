import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Close, Save } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'
import { AutocompleteDiv } from './ExamenNotasStyles'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

import {
  getNotasExamen as listExamenNotas,
  addNotasExamen,
  editNotasExamen,
} from '../../actions/examenNotas'
import { getStudentsMatricula } from '../../actions/matricula'

const ExamenNotasForm = ({
  open,
  handleClose,
  titleForm,
  dataForm,
  handleClickMessage,
}) => {
  const { school_id, clase_id, ciclo_lectivo_id, materia_id } = useParams() // id = id de la materia
  let initialMatricula = []
  if (dataForm?.id) {
    initialMatricula = {
      matricula_id: dataForm?.matriculaId,
      label: `${dataForm?.matricula?.user.identification} - ${dataForm?.matricula?.user.firstName} ${dataForm?.matricula?.user.lastName}`,
    }
  }

  //console.log(initialMatricula)

  const [rowExamenNotas, setRowExamenNotas] = React.useState(dataForm)

  const [valueMatricula, setValueMatricula] = React.useState(initialMatricula)

  const dispatch = useDispatch()

  const getStatusReducer = useSelector((state) => state.examenNotasReducer)
  const { loading } = getStatusReducer

  const getStudents = useSelector((state) => state.matriculaReducer)
  const { studentsMatricula } = getStudents

  useEffect(() => {
    const body = {
      school_id,
      clase_id,
      ciclo_lectivo_id,
    }
    dispatch(getStudentsMatricula(body))
  }, [school_id, clase_id, ciclo_lectivo_id, dispatch])

  //Listamos los estudiantes matriculados en la materia
  let listaEstudiantes = []
  studentsMatricula?.forEach((st) => {
    listaEstudiantes.push({
      matricula_id: st.matricula_id,
      label: st.student,
    })
  })

  const handleChange = (e) => {
    setRowExamenNotas({
      ...rowExamenNotas,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (rowExamenNotas.id) {
      await dispatch(editNotasExamen(rowExamenNotas))
    } else {
      await dispatch(addNotasExamen(rowExamenNotas))
    }

    //Iniciamos la alerta de la respuesta
    handleClickMessage()
    //Listamos los notas actualizados o nuevos
    const body = {
      school_id,
      clase_id,
      ciclo_lectivo_id,
      id: materia_id,
    }
    dispatch(listExamenNotas(body))
    //Cerramos el modal del formulario
    handleClose()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`sm`}
        fullWidth={`sm`}
        scroll="paper"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{titleForm} Nota</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                id="outlined-basic"
                name="id"
                variant="standard"
                type="hidden"
                value={rowExamenNotas.id}
              />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      value={valueMatricula || ''}
                      onChange={(event, newValue) => {
                        setValueMatricula(newValue)
                        setRowExamenNotas({
                          ...rowExamenNotas,
                          matriculaId: newValue?.matricula_id,
                          materia_id: materia_id,
                        })
                      }}
                      inputValue={valueMatricula?.label || ''}
                      id="matricula_id"
                      options={listaEstudiantes}
                      sx={{ width: '100%' }}
                      renderInput={(params) => (
                        <TextField {...params} label="Student" />
                      )}
                    />
                  </AutocompleteDiv>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                      fullWidth
                      sx={{ mr: 2, width: '100%' }}
                      value={rowExamenNotas.fecha}
                      onChange={handleChange}
                      renderInput={(params) => (
                        <TextField
                          fullWidth={true}
                          sx={{ mr: 2, width: '100%' }}
                          {...params}
                          name="fecha"
                          id="fecha"
                          label="Fecha de evaluación"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="examen"
                    margin="dense"
                    id="examen"
                    label="Número de Evaluación (Ejem. Examen 1)"
                    type="text"
                    value={rowExamenNotas.examen}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="nota"
                    margin="dense"
                    id="nota"
                    label="Nota obtenida"
                    type="text"
                    value={rowExamenNotas.nota}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="periodo"
                    margin="dense"
                    id="periodo"
                    label="Periodo de evaluación (Ejem. T1, T2)"
                    type="text"
                    value={rowExamenNotas.periodo}
                    onChange={handleChange}
                    fullWidth={true}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            {!loading ? (
              <>
                <Button type="submit" variant="contained" endIcon={<Save />}>
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  startIcon={<Close />}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<Save />}
                variant="outlined"
              >
                Save
              </LoadingButton>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default ExamenNotasForm
