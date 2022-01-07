import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Paper } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getTaskById } from '../../../actions/tasks'
import { useDispatch, useSelector } from 'react-redux'
import {format} from 'date-fns'

const columns = [
  { field: 'firstName', headerName: 'Nombre', width: 130 },
  { field: 'lastName', headerName: 'Apellido', width: 130 },
  { field: 'end_date', headerName: 'Plazo de entrega', width: 130, valueFormatter: (params) => {
    return params.value ? format(new Date(params.value), 'dd/MM/yyyy'):"-"
  } },
  { field: 'fecha_entregada', headerName: 'Fecha de entrega', width: 130, valueFormatter: (params) => {
    return params.value ? format(new Date(params.value), 'dd/MM/yyyy'): "-"
  } },
  { field: 'status', headerName: 'Estado', width: 130 },
  { field: 'devolucion', headerName: 'Devolución', width: 130 },
  { field: 'grade', headerName: 'Nota', width: 130 },
  { field: 'observation', headerName: 'Observación', width: 130 },
]

export default function TablaEntregas({ tareaId, setTareaId }) {
  const handleClickGoBack = () => setTareaId(null)

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getTaskById(tareaId))
  }, [dispatch, tareaId])

  const studentTasks =  useSelector((state) => state.tasksReducer.dataEdit)

  const rows = studentTasks?.matriculas?.map((matricula) => {
    return {
      end_date: studentTasks.end_date,
      id: matricula.id,
      firstName: matricula.user.firstName,
      lastName: matricula.user.lastName,
      status: matricula.student_tasks.status,
      devolucion: matricula.student_tasks.devolucion? matricula.student_tasks.devolucion:"-",
      grade: matricula.student_tasks.grade? matricula.student_tasks.grade : "-",
      observation: matricula.student_tasks.observation? matricula.student_tasks.observation:"-",
      fecha_entregada: matricula.student_tasks.fecha_entregada
    }
  })

  return (
    <Box>
      <IconButton aria-label="delete" onClick={handleClickGoBack}>
        <ArrowBackIcon />
      </IconButton>
      <Box>
        <h3>{`Entregas`}</h3>
      </Box>
      <Paper elevation={24}>
        <Box sx={{ height: 'calc(100vh - 132px)', width: 1 }}>
          <DataGrid
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              border: 0,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
            rows={rows}
            columns={columns}
            pageSize={30}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
          />
        </Box>
      </Paper>
    </Box>
  )
}
