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
import { Close/* , Save  */} from '@mui/icons-material'

import List from '@mui/material/List'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'

import {
  getTeachers as listTeachers,
  modifiedTeacher,
  createTeacher,
  getTeacherMaterias,
  resetTeacherMaterias,
} from '../../actions/teacher'
import { getCicloElectivos as listCicloElectivos } from '../../actions/cicloElectivo'
import { getSchools as listSchools } from '../../actions/school'

import { AutocompleteDiv } from '../matricula/MatriculaStyles'
import Autocomplete from '@mui/material/Autocomplete'

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1)
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1)
}

function union(a, b) {
  return [...a, ...not(b, a)]
}

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

  const [checked, setChecked] = useState([])
  const [left, setLeft] = useState([])
  const [right, setRight] = useState([])

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

  const obtenerMateriasTeacher = useSelector((state) => state.teacherReducer)
  const { teacherMaterias, allTeacherMaterias } = obtenerMateriasTeacher

  const obtenerCiclo = useSelector((state) => state.cicloElectivoReducer)
  const { cicloElectivos } = obtenerCiclo

  const obtenerSchools = useSelector((state) => state.schoolReducer)
  const { schools, loadingSchool } = obtenerSchools

  // Otras variables
  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  // Handlers
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const numberOfChecked = (items) => intersection(checked, items).length

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items))
    } else {
      setChecked(union(checked, items))
    }
  }

  // Envio las materias al server para que las coloque al profesor
  const saveTeacherMaterias = (materias, status = true) => {
    const teacherMaterias = materias.map((materia) => materia.id)

    const body = {
      ...rowTeacher,
      materias: teacherMaterias,
      status,
    }

    dispatch(modifiedTeacher(body))
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))

    saveTeacherMaterias(leftChecked)
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))

    saveTeacherMaterias(rightChecked, false)
  }

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 250,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`

          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Card>
  )

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

  // Al cambiar las materias que posee el profesor, entonces los muestro en el lado derecho
  useEffect(() => {
    const materias = teacherMaterias.map((t) => t.materia)
    const allMaterias = allTeacherMaterias

    setLeft((left) => {
      // Elimino las materias de la izquierda que ya tengan un profesor asignado
      let result = left.filter((materia) => {
        const found = allMaterias.find((a) => a.materia_id === materia.id)
        return !found
      })
      return result
    })

    setRight(materias)
  }, [teacherMaterias, allTeacherMaterias, rowTeacher.teacher_id])

  // Cuando se cierra el component, reinicio la lista de teacherMaterias, y asi cuando vaya a editar otro profesor no muestre la lista de materias que tenia el anterior
  useEffect(() => {
    return dispatch(resetTeacherMaterias())
  }, [dispatch])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={`md`}
        width={"md"}
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

                        // Coloco las materias a la izquierda y reinicio los de la derecha
                        setLeft(classSelected.materias)
                        setRight([])

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

                          // Coloro las materias a la izquierda y reinicio los de la derecha
                          setLeft(newValue?.materias)
                          setRight([])

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
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>{customList('Materias', left)}</Grid>
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                      >
                        &gt;
                      </Button>
                      <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                      >
                        &lt;
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item>{customList('Materias Asignadas', right)}</Grid>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions>

            <Button
              variant="outlined"
              onClick={handleClose}
              startIcon={<Close />}
            >
              Aceptar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default TeacherForm
