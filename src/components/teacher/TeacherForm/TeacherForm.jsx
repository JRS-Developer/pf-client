import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
/* import LoadingButton from '@mui/lab/LoadingButton' */
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import {
  getTeachers as listTeachers,
  modifiedTeacher,
  createTeacher,
  getTeacherMaterias,
} from '../../../actions/teacher'
import { getCicloElectivos as listCicloElectivos } from '../../../actions/cicloElectivo'
import { getSchools as listSchools } from '../../../actions/school'

import { AutocompleteDiv } from '../../matricula/MatriculaStyles'
import Autocomplete from '@mui/material/Autocomplete'
import MateriasTransfer from './MateriasTransfer'

const TeacherForm = ({
  open,
  handleClose,
  titleForm,
  dataForm,
  handleClickMessage,
}) => {
  // useStates
  const [rowTeacher, setRowTeacher] = useState({
    teacher_id: dataForm.id,
    school_id: '',
    clase_id: '',
    materias: [],
    ciclo_lectivo_id: '',
  })

  // Clase seleccionada
  const [valueClase, setValueClase] = useState()
  // Escuela seleccionada
  const [valueSchool, setValueSchool] = useState()
  // Ciclo seleccionado
  const [valueCiclo, setValueCiclo] = useState()

  // Dispatch
  const dispatch = useDispatch()

  // useSelector
  /* const getTeachers = useSelector((state) => state.teacherReducer) */
  /* const { loading } = getTeachers */

  const obtenerCiclo = useSelector((state) => state.cicloElectivoReducer)
  const { cicloElectivos } = obtenerCiclo

  const obtenerSchools = useSelector((state) => state.schoolReducer)
  const { schools, loadingSchool } = obtenerSchools

  const getMateriasData = async (clase = valueClase, school = valueSchool) => {
    const body = {
      ...rowTeacher,
      school_id: school.id,
      clase_id: clase.id,
    }

    const body2 = { ...body }

    // Obtengo todas las materias, sin importar si el profesor es parte
    delete body.teacher_id
    dispatch(getTeacherMaterias(body, true))

    // Obtengo las materias que el profesor es parte
    dispatch(getTeacherMaterias(body2))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (rowTeacher.id) {
      await dispatch(modifiedTeacher(rowTeacher))
    } else {
      await dispatch(createTeacher(rowTeacher))
    }
    //Cerramos el formulario
    handleClose()
    // Iniciamos el mensaje de respuesta
    handleClickMessage()
    //Listamos las Teachers
    dispatch(listTeachers())
  }

  // useEffects
  // Listamos las clases, ciclos y escuelas
  useEffect(() => {
    dispatch(listCicloElectivos())
    dispatch(listSchools())
  }, [dispatch])

  // Obtenemos la clase seleccionada inicial
  useEffect(() => {
    if (schools?.length) {
      const school = schools[0]

      setValueSchool(school)
      // Guardo el id de la escuela y la clase en el estado de rowTeacher para enviarlo al server
      setRowTeacher((rowTeacher) => ({
        ...rowTeacher,
        school_id: school.id,
        clase_id: school.classes[0].id,
      }))
    }
  }, [schools])

  useEffect(() => {
    if (cicloElectivos?.length) {
      // Seteamos el ciclo con fecha mayor
      const ciclo = cicloElectivos[0]
      setValueCiclo(ciclo)
      setRowTeacher((rowTeacher) => ({
        ...rowTeacher,
        ciclo_lectivo_id: ciclo.id,
      }))
    }
  }, [cicloElectivos])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`md`}
        width={'md'}
        scroll="paper"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{titleForm} Teacher, Asignar Materias</DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                id="id"
                name="id"
                variant="standard"
                type="hidden"
                value={rowTeacher.id}
              />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      value={valueSchool || ''}
                      inputValue={valueSchool?.name || ''}
                      // defaultValue={valueSchool?.name || ''}
                      loading={loadingSchool}
                      onChange={async (_event, newValue) => {
                        const school = newValue
                        const classSelected = school?.classes?.[0]
                        // Cuando cambia el valor, seteo el valor de la escuela y la clase
                        setValueSchool(school)
                        // Seteo el id de la escuela en el estado de rowTeacher para enviarlo al server
                        setRowTeacher((rowTeacher) => ({
                          ...rowTeacher,
                          school_id: school.id,
                          clase_id: classSelected.id,
                        }))
                        // Seteo las nueva clase
                        classSelected && setValueClase(classSelected)

                        // Obtengo las materias del profesor
                        await getMateriasData(classSelected, school)
                      }}
                      id="school_id"
                      options={schools}
                      sx={{ width: '100%' }}
                      renderInput={(params) => (
                        <TextField {...params} label="Escuela" />
                      )}
                      getOptionLabel={(option) =>
                        option?.name ? option.name : ''
                      }
                    />
                    <br />
                  </AutocompleteDiv>
                </Grid>
                <Grid item xs={12}>
                  <AutocompleteDiv>
                    <Autocomplete
                      value={valueCiclo || ''}
                      inputValue={valueCiclo?.name || ''}
                      onChange={(_event, newValue) => {
                        setValueCiclo(newValue)
                        // Seteo el id del ciclo en el estado de rowTeacher para enviarlo al server
                        setRowTeacher((rowTeacher) => ({
                          ...rowTeacher,
                          ciclo_lectivo_id: newValue.id,
                        }))
                      }}
                      id="ciclo_lectivo_id"
                      options={cicloElectivos}
                      sx={{ width: '100%' }}
                      renderInput={(params) => (
                        <TextField {...params} label="Ciclo Lectivo" />
                      )}
                      getOptionLabel={(option) =>
                        option?.name ? option.name : ''
                      }
                    />
                    <br />
                  </AutocompleteDiv>
                </Grid>
                {valueSchool && (
                  <Grid item xs={12}>
                    <AutocompleteDiv>
                      <Autocomplete
                        value={valueClase || ''}
                        inputValue={valueClase?.name || ''}
                        id="clase_id"
                        options={valueSchool.classes}
                        onChange={async (_event, newValue) => {
                          setValueClase(newValue)
                          // Seteo el id de la clase en el estado de rowTeacher para enviarlo al server
                          setRowTeacher((rowTeacher) => ({
                            ...rowTeacher,
                            clase_id: newValue.id,
                          }))

                          // Obtengo las materias que ya tiene el profesor
                          await getMateriasData(newValue)
                        }}
                        sx={{ width: '100%' }}
                        renderInput={(params) => (
                          <TextField {...params} label="Clase" />
                        )}
                        getOptionLabel={(option) =>
                          option?.name ? option.name : ''
                        }
                      />
                      <br />
                    </AutocompleteDiv>
                  </Grid>
                )}
                <MateriasTransfer
                  rowTeacher={rowTeacher}
                  clase={valueClase}
                  school={valueSchool}
                />
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Aceptar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default TeacherForm
