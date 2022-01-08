import { useEffect } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  alumnoGetTaskById,
  markHomeworkDone,
} from '../../actions/tasks/index.js'
import LinearProgress from '@mui/material/LinearProgress'

// const tarea = {id: 9, title: "Tarea 9", complete: true, description: "Descripción de la tarea que tiene que realizar el alumno"}

export default function Homework() {
  const id = useParams().id
  const history = useHistory()
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasksReducer.task)
  const loading = useSelector((state) => state.tasksReducer.loading)

  console.log(loading)

  useEffect(() => {
    dispatch(alumnoGetTaskById(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleClick() {
    history.goBack()
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(markHomeworkDone(id))
    dispatch(alumnoGetTaskById(id))
  }

  //console.log('tasks', tasks)

  return (
    <Paper elevation={24}>
      {!loading ? (
        <Box
          sx={{ overflow: 'auto' }}
          style={{ height: 'calc(100vh - 110px)' }}
        >
          <Grid container>
            <Grid item xs={9}>
              <IconButton aria-label="delete" onClick={handleClick}>
                <ArrowBackIcon />
              </IconButton>
              <center>
                <Typography variant="h4">{tasks.title}</Typography>
              </center>
              <Typography variant="body1">{tasks.description}</Typography>
            </Grid>
            <Grid item xs={3} sx={{ backgroundColor: 'secondary.light', p: 1 }}>
              <Box
                sx={{
                  height: 'calc(100vh - 142px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mt: 2,
                }}
              >
                <Typography variant="h4">Subi tu tarea</Typography>
                <Paper
                  sx={{
                    width: '16vw',
                    height: '14vw',
                    borderRadius: 2,
                    mt: 1,
                    backgroundColor: 'primary.main',
                  }}
                >
                  Subida de archivos como en drive
                </Paper>
                <Paper
                  sx={{
                    width: '16vw',
                    height: '7vw',
                    borderRadius: 2,
                    backgroundColor: 'primary.main',
                    mt: 2,
                  }}
                >
                  Habla por privado con tu profesor
                </Paper>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  disabled={
                    Object.keys(tasks).length
                      ? tasks.matriculas[0].student_tasks.status === 'submitted'
                        ? true
                        : false
                      : false
                  }
                  onClick={handleSubmit}
                >
                  Marcar tarea como hecha
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <LinearProgress sx={{ borderRadius: 1 }} />
      )}
    </Paper>
  )
}
