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
import Divider from '@mui/material/Divider'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { alumnoGetTasks } from '../../actions/tasks'
import { format } from 'date-fns'

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
          <Typography variant="h5">Tareas sin entregar</Typography>
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
                      sx={{ p: 0, border: 1, borderColor: "primary.main", pr: 1 }}
                      onClick={() => handleClick(t.id)}
                    >
                      <ListItemButton sx={{p: 1}}>
                        <ListItemAvatar sx={{pl:1}}>
                          <Avatar sx={{width: 35, height: 35}}>
                            <AssignmentSharpIcon />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          disableTypography
                          primary={
                            <Box>
                            <Typography
                            variant="h6"
                              sx={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                width: 'calc(46vw - 200px)'
                              }}
                            >
                              {t.title}
                            </Typography>
                            <Divider sx={{pb: 0.5}}/>
                            </Box>
                          }
                          secondary={
                            <Grid container>
                              <Grid item xs={8}>
                            <Typography
                            variant="body2"
                              sx={{
                                pt: 0.5,
                                width: '100%',
                                lineHeight: "1.5em",
                                height: "4.5em",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "normal",
                              }}
                            >
                              {t.description}
                            </Typography>
                            </Grid>
                            <Grid item xs={4}>
                            <Typography variant="body2" sx={{pt: 0.5, textAlign: "right"}}>
                     
                             {'Fecha de entrega:'} <br/> {format(new Date(t.end_date), 'dd/MM/yy')}
                           </Typography>
                           </Grid>
                           </Grid>
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
          <Typography variant="h5">Tareas entregadas</Typography>
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
                      sx={{ p: 0, border: 1, borderColor: "primary.main", pr: 1 }}
                      onClick={() => handleClick(t.id)}
                    >
                      <ListItemButton sx={{p: 1}}>
                        <ListItemAvatar sx={{pl:1}}>
                          <Avatar sx={{width: 35, height: 35}}>
                            <AssignmentSharpIcon />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          disableTypography
                          primary={
                            <Box>
                            <Typography
                            variant="h6"
                              sx={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                width: 'calc(46vw - 200px)'
                              }}
                            >
                              {t.title}
                            </Typography>
                            <Divider sx={{pb: 0.5}}/>
                            </Box>
                          }
                          secondary={
                            <Grid container>
                              <Grid item xs={8}>
                            <Typography
                            variant="body2"
                              sx={{
                                pt: 0.5,
                                width: '100%',
                                lineHeight: "1.5em",
                                height: "4.5em",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "normal",
                              }}
                            >
                              {t.description}
                            </Typography>
                            </Grid>
                            <Grid item xs={4}>
                            <Typography variant="body2" sx={{pt: 0.5, textAlign: "right"}}>
                     
                             {'Fecha de entrega:'} <br/> {format(new Date(t.end_date), 'dd/MM/yy')}
                           </Typography>
                           </Grid>
                           </Grid>
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
