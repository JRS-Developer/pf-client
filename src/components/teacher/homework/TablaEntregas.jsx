import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Paper } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getTaskById } from '../../../actions/tasks'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import EditIcon from '@mui/icons-material/Edit'
import Tooltip from '@mui/material/Tooltip'
import CorregirTarea from './forms/CorregirTarea.jsx'
import AlertDialog from '../../alert/AlertDialog'
import Chip from '@mui/material/Chip'

const chipProps = {
  component: 'a',
  color: 'primary',
  clickable: true,
  rel: 'noreferrer',
  target: '_blank',
}

const columns = [
  { field: 'firstName', headerName: 'Nombre', width: 130 },
  { field: 'lastName', headerName: 'Apellido', width: 130 },
  {
    field: 'end_date',
    headerName: 'Plazo de entrega',
    width: 130,
    valueFormatter: (params) => {
      return params.value ? format(new Date(params.value), 'dd/MM/yyyy') : '-'
    },
  },
  {
    field: 'fecha_entregada',
    headerName: 'Fecha de entrega',
    width: 130,
    valueFormatter: (params) => {
      return params.value ? format(new Date(params.value), 'dd/MM/yyyy') : '-'
    },
  },
  { field: 'status', headerName: 'Estado', width: 130 },
  { field: 'devolucion', headerName: 'Devolución', width: 130 },
  { field: 'grade', headerName: 'Nota', width: 80 },
  { field: 'observation', headerName: 'Observación', width: 350 },
  {
    field: 'file',
    headerName: 'Archivo',
    width: 120,
    renderCell: (params) => {
      const value = params.value
      return (
        <Chip
          {...chipProps}
          label={value ? 'Ver documento' : 'Sin documento'}
          href={value?.url ? value.url : '#'}
          disabled={value?.url ? false : true}
        />
      )
    },
  },
]

export default function TablaEntregas({ tareaId, setTareaId }) {
  const [open, setOpen] = React.useState(false)
  const [selection, setSelection] = React.useState({})
  /*Dialog Alert*/
  const [openAlert, setOpenAlert] = React.useState(false)

  const handleClickGoBack = () => setTareaId(null)

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getTaskById(tareaId))
  }, [dispatch, tareaId])

  const studentTasks = useSelector((state) => state.tasksReducer.dataEdit)
  //const tareaUrl = studentTasks.matriculas.student_tasks.file.url
  //console.log(tareaUrl)
  const rows = studentTasks?.matriculas?.map((matricula) => {
    return {
      end_date: studentTasks.end_date,
      id: matricula.id,
      matricula_id: matricula.id,
      firstName: matricula.user.firstName,
      lastName: matricula.user.lastName,
      status:
        matricula.student_tasks.status === 'submitted'
          ? 'Entregada'
          : matricula.student_tasks.status,
      devolucion: matricula.student_tasks.devolucion
        ? matricula.student_tasks.devolucion
        : '-',
      grade: matricula.student_tasks.grade
        ? matricula.student_tasks.grade
        : '-',
      observation: matricula.student_tasks.observation
        ? matricula.student_tasks.observation
        : '-',
      fecha_entregada: matricula.student_tasks.fecha_entregada,
      file: matricula.student_tasks.file,
    }
  })

  /*Open DialogForm*/
  const handleClickOpen = () => {
    selection.id ? setOpen(true) : setOpenAlert(true)
  }
  /** Close DialogForm*/
  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  return rows ? (
    <Box>
      {openAlert && (
        <AlertDialog
          title="ADVERTENCIA"
          message="Seleccione un registro para poder continuar"
          openAlert={openAlert}
          handleCloseAlert={handleCloseAlert}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <IconButton aria-label="delete" onClick={handleClickGoBack}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Tooltip title="edit">
            <IconButton
              aria-label="edit"
              size="large"
              onClick={handleClickOpen}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {open && (
        <CorregirTarea
          open={open}
          handleClose={handleClose}
          titleForm="Corregir"
          selection={selection}
          task_id={tareaId}
          // handleClickMessage={handleClickMessage}
        ></CorregirTarea>
      )}
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
            onRowClick={(newSelection) => {
              setSelection(newSelection.row)
            }}
            columns={columns}
            pageSize={25}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection={false}
          />
        </Box>
      </Paper>
    </Box>
    ) : null
}
