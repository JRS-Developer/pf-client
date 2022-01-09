import { useEffect, useState } from 'react'
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
import Divider from '@mui/material/Divider';
import HomeworkUploadFile from './HomeworkUploadFile.jsx'

export default function Homework() {
  const id = useParams().id
  const history = useHistory()
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasksReducer.task)
  const loading = useSelector((state) => state.tasksReducer.loading)
  const { devolucion, observation, grade } = tasks.hasOwnProperty('matriculas')
    ? tasks.matriculas[0].student_tasks
    : {}

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
            <Box sx={{display: "flex", flexDirection:"column", justifyContent: "space-between", height: "90%", p: 2}}>
              <Box>
                <Grid container>
                  <Grid item xs={12}>
                    <center>
                      <Typography variant="h4">{tasks.title}</Typography>
                    </center>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5">
                      Descripción de la tarea
                    </Typography>
                    <Typography variant="body1">{tasks.description}</Typography>

                    <Divider sx={{py: 2}}/>
                    
                    <Typography variant="h5" sx={{pt: 2}}>
                      Observaciones
                      </Typography>
                      <Typography variant="body1">
                        {observation}
                      </Typography>
                    
                    
                  </Grid>
                </Grid>
              </Box>

              <Box>
              <Divider/>
                <Grid container sx={{pt: 2}}>
                  <Grid item xs={4}>
                  <Typography variant="h5">
                    Nota:
                  </Typography>
                  <Typography variant="h6">
                    {grade ? grade : "-"}
                  </Typography>
                  </Grid>
                  <Grid item xs={4}>
                  <Typography variant="h5">
                        Estado de la tarea:
                    </Typography>
                    <Typography variant="h6">
                        {devolucion ? devolucion : "Todavía sin revisar"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              </Box>
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
                    width: '8vw',
                    height: '8vw',
                    borderRadius: 2,
                    mt: 1,
                    backgroundColor: 'primary.main',
                  }}
                >
                <HomeworkUploadFile/>
                </Paper>
                {/* <Paper
                  sx={{
                    width: '16vw',
                    height: '7vw',
                    borderRadius: 2,
                    backgroundColor: 'primary.main',
                    mt: 2,
                  }}
                >
                  Habla por privado con tu profesor
                </Paper> */}
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
