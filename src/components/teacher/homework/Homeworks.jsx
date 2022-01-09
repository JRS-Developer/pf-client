import * as React from 'react'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import ListItemButton from '@mui/material/ListItemButton'
import TablaEntregas from './TablaEntregas.jsx'
import { getTasks, cleanStore } from '../../../actions/tasks/index.js'
import { getDataById } from '../../../actions/materia/index.js'
import { getDataById as getDataByIdClase } from '../../../actions/clase/index.js'
import { useParams } from 'react-router-dom'
import CreateTaskForm from './forms/CreateTaskForm.jsx'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import ConfirmDelete from './alert/ConfirmDelete.jsx'

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

export default function Entregas() {
  const [tareaId, setTareaId] = React.useState(null)
  const [deletedTask, setDeletedTask] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [openMessage, setOpenMessage] = React.useState(false)
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const [tareaAborrar, setTareaAborrar] = React.useState()
  const tasks = useSelector((state) => state.tasksReducer.tasks)
  const message = useSelector((state) => state.tasksReducer.message)
  const materia = useSelector((state) => state.materiasReducer.dataEdit)
  const clase = useSelector((state) => state.clasesReducer.dataEdit)

  let params = useParams()
  const dispatch = useDispatch()
  //console.log(params)

  React.useEffect(() => {
    dispatch(getDataById(params.materia_id))
  }, [dispatch, params.materia_id])

  React.useEffect(() => {
    dispatch(getDataByIdClase(params.clase_id))
  }, [dispatch, params.clase_id])

  React.useEffect(() => {
    dispatch(getTasks(params))
    return () => dispatch(cleanStore())
  }, [dispatch, params, deletedTask])

  const openDeleteClick = (id) => {
    setTareaAborrar(id)
    setOpenConfirm(true)
  }

  /*Open DialogForm*/
  const handleClickOpen = (action) => {
    setOpen(true)
  }
  /** Close DialogForm*/
  const handleClose = () => {
    setOpen(false)
  }
  /* Close DialogConfirm */
  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  }

  //Open message
  const handleClickMessage = () => {
    setOpenMessage(true)
  }
  //Close message
  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return 
    }

    setOpenMessage(false)
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })

  return (
    <>
      {
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar
            open={openMessage}
            autoHideDuration={6000}
            onClose={handleCloseMessage}
          >
            <Alert
              onClose={handleCloseMessage}
              severity={/* error ? 'error' :  */ 'success'}
              sx={{ width: '100%' }}
            >
              {/* error ? error : */ message.message}
            </Alert>
          </Snackbar>
        </Stack>
      }
      {openConfirm && (
        <ConfirmDelete
          openConfirm={openConfirm}
          handleCloseConfirm={handleCloseConfirm}
          message="¿ Esta seguro de eliminar esta tarea ?"
          handleClickMessage={handleClickMessage}
          tareaAborrar={tareaAborrar}
          deletedTask={deletedTask}
          setDeletedTask={setDeletedTask}
        />
      )}
      {tareaId ? (
        <TablaEntregas tareaId={tareaId} setTareaId={setTareaId} />
      ) : (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
          {open && (
            <CreateTaskForm
              open={open}
              handleClose={handleClose}
              titleForm="Crear nueva tarea"
              handleClickMessage={handleClickMessage}
            ></CreateTaskForm>
          )}
          <div>
            <Button variant="contained" onClick={handleClickOpen}>
              Crear Tarea
            </Button>
          </div>

          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Tareas de {`${materia?.name ? materia.name : '-'}`} de la clase{' '}
            {`${clase?.name ? clase.name : '-'}`}
          </Typography>

          <Demo>
            {tasks?.length <= 1 ? (
              <List>
                {tasks?.map((tasks, i) => {
                  return (
                    <ListItem
                      key={`${tasks.id + i}`}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => openDeleteClick(tasks.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemButton onClick={() => setTareaId(tasks.id)}>
                        <ListItemAvatar>
                          <Avatar>
                            <AssignmentSharpIcon />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primary={tasks.title}
                          secondary={tasks.description}
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            ) : (
              <Grid container>
                <Grid item xs={12} md={6}>
                  <List>
                    {tasks
                      ?.slice(0, Math.round(tasks.length / 2))
                      ?.map((tasks, i) => {
                        return (
                          <ListItem
                            key={`${tasks.id + i}`}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => openDeleteClick(tasks.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemButton
                              onClick={() => setTareaId(tasks.id)}
                            >
                              <ListItemAvatar>
                                <Avatar>
                                  <AssignmentSharpIcon />
                                </Avatar>
                              </ListItemAvatar>

                              <ListItemText
                                primary={tasks.title}
                                secondary={tasks.description}
                              />
                            </ListItemButton>
                          </ListItem>
                        )
                      })}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List>
                    {tasks
                      ?.slice(Math.round(tasks.length / 2))
                      ?.map((tasks, i) => {
                        return (
                          <ListItem
                            key={`${tasks.id + i}`}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => openDeleteClick(tasks.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemButton
                              onClick={() => setTareaId(tasks.id)}
                            >
                              <ListItemAvatar>
                                <Avatar>
                                  <AssignmentSharpIcon />
                                </Avatar>
                              </ListItemAvatar>

                              <ListItemText
                                primary={tasks.title}
                                secondary={tasks.description}
                              />
                            </ListItemButton>
                          </ListItem>
                        )
                      })}
                  </List>
                </Grid>
              </Grid>
            )}
          </Demo>
        </Box>
      )}
    </>
  )
}
