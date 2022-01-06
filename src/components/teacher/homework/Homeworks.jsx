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
import { getTasks, removeTask } from '../../../actions/tasks/index.js'
import { useParams } from 'react-router-dom'

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

export default function Entregas() {
  const [tareaId, setTareaId] = React.useState(null)
  const [deletedTask, setDeletedTask] = React.useState(0)
  const tasks = useSelector((state) => state.tasksReducer.tasks)

  let params = useParams()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getTasks(params))
  }, [dispatch, params, deletedTask])

  const handleDeleteClick = async (arg) => {
    await dispatch(removeTask(arg))
    setDeletedTask(deletedTask + 1)
  }

  return (
    <>
      {tareaId ? (
        <TablaEntregas tareaId={tareaId} setTareaId={setTareaId} />
      ) : (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Tareas de esta clase y materia
              </Typography>
              <Demo>
                <List>
                  {tasks.map((tasks, i) => {
                    return (
                      <ListItem
                        key={`${tasks.id + i}`}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteClick(tasks.id)}
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
              </Demo>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  )
}
