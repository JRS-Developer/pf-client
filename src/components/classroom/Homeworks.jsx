import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import Typography from '@mui/material/Typography'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { alumnoGetTasks } from '../../actions/tasks'

export default function Homeworks() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasksReducer.tasks)
  const { materiaId, claseId, cicloLectivoId, schoolId } = useParams()
  //console.log(tasks)
  const history = useHistory()

  function handleClick(id) {
    history.push(`/tareas/${id}`)
  }

  useEffect(() => {
    //datos mockeados para mandar por body asi devuelve la tarea de la clase 4to año materia biología.
    /* let body = {class_id:"57e3dc00-da1f-4522-b71c-3a09af7b670b" , materia_id:"10910772-1b07-4622-833c-633bcaddbe91"} */
    dispatch(
      alumnoGetTasks({
        materia_id: materiaId,
        class_id: claseId,
        ciclo_lectivo_id: cicloLectivoId,
        school_id: schoolId,
      })
    )
  }, [dispatch, materiaId, claseId, cicloLectivoId, schoolId])

  return (
    <Box sx={{ overflow: 'auto', height: 'calc(100vh - 180px)' }}>
      <Box sx={{ backgroundColor: 'primary.light', height: 40 }}></Box>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid
          item
          xs={6}
          display="flex"
          align="center"
          sx={{ flexDirection: 'column' }}
        >
          Tareas sin entregar
          <Paper display="flex" sx={{ flexDirection: 'column' }}>
            {/* {tareas.filter(t => t.complete === false).map((t, i) => {return ( */}
            {tasks &&
              tasks
                .filter(
                  (t) => t.matriculas[0].student_tasks.status === 'Pendiente'
                )
                .map((t, i) => {
                  return (
                    <ListItem
                      key={`${t.id + i}`}
                      sx={{ p: 0 }}
                      onClick={() => handleClick(t.id)}
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar>
                            <AssignmentSharpIcon />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography
                              sx={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                width: 'calc(46vw - 200px)',
                              }}
                            >
                              {t.title}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              sx={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                width: 'calc(46vw - 200px)',
                              }}
                            >
                              {t.description}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
          </Paper>
        </Grid>
        <Grid
          item
          xs={6}
          display="flex"
          align="center"
          sx={{ flexDirection: 'column' }}
        >
          Tareas entregadas
          <Paper display="flex" sx={{ flexDirection: 'column' }}>
            {/* {tareas.filter(t => t.complete === false).map((t, i) => {return ( */}
            {tasks &&
              tasks
                .filter(
                  (t) => t.matriculas[0].student_tasks.status === 'submitted'
                )
                .map((t, i) => {
                  return (
                    <ListItem
                      key={`${t.id + i}`}
                      sx={{ p: 0 }}
                      onClick={() => handleClick(t.id)}
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar>
                            <AssignmentSharpIcon />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography
                              sx={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                width: 'calc(46vw - 200px)',
                              }}
                            >
                              {t.title}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              sx={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                width: 'calc(46vw - 200px)',
                              }}
                            >
                              {t.description}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
