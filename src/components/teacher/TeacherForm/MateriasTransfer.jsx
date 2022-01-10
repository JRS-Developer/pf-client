import {
  Grid,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material/'
import { modifiedTeacher, resetTeacherMaterias } from '../../../actions/teacher'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1)
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1)
}

function union(a, b) {
  return [...a, ...not(b, a)]
}

const MateriasTransfer = ({ rowTeacher, clase, school }) => {
  const [checked, setChecked] = useState([])
  const [left, setLeft] = useState([])
  const [right, setRight] = useState([])

  const dispatch = useDispatch()
  // Selectprs
  const { teacherMaterias, allTeacherMaterias } = useSelector(
    (state) => state.teacherReducer
  )

  // Otras variables
  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)
  const numberOfChecked = (items) => intersection(checked, items).length

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

  // INFO: Intento fallido de que muestre la materia desabilitada en vez de ocultarla
  // const identifyOwnedMaterias = (materias, allMaterias) => {
  //   const result = materias.map((materia) => {
  //     const found = allMaterias.find((a) => a.materia_id === materia.id)
  //     return {
  //       ...materia,
  //       disabled: found ? true : false,
  //     }
  //   })
  //
  //   return result
  // }

  // Cuando clase o school cambian, entonces a left le seteo todas las materias y a right lo vacio
  useEffect(() => {
    // clase?.materias && setLeft(() => identifyOwnedMaterias(clase.materias, allTeacherMaterias))
    clase?.materias && setLeft(clase?.materias)
    setRight([])
  }, [clase, school, allTeacherMaterias])

  // Al cambiar las materias que posee el profesor, entonces los muestro en el lado derecho
  useEffect(() => {
    const materias = teacherMaterias.map((t) => t.materia)
    const allMaterias = allTeacherMaterias

    setLeft((left) => {
      if (allMaterias.length === 0) return allMaterias
      // Si el profesor no tiene materias, entonces muestro todas las materias
      let result = left.filter((materia) => {
        const found = allMaterias.find((a) => a.materia_id === materia.id)
        return !found
      })

      return result

      // Si el profesor tiene materias, entonces coloco el parametro disabled en true
      // let result =  identifyOwnedMaterias(left, allMaterias)
      //
      //   return result
    })

    setRight(materias)
  }, [teacherMaterias, allTeacherMaterias, rowTeacher.teacher_id])

  // Cuando se cierra el component, reinicio la lista de teacherMaterias, y asi cuando vaya a editar otro profesor no muestre la lista de materias que tenia el anterior
  useEffect(() => {
    return dispatch(resetTeacherMaterias())
  }, [dispatch])

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

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
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
  )
}

export default MateriasTransfer
