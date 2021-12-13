import React from "react";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Link } from "react-router-dom";

const tareas =[
  {id: 1, name: "Tarea 1", complete: false},
  {id: 2, name: "Tarea 2", complete: true},
  {id: 3, name: "Tarea 3", complete: true},
  {id: 4, name: "Tarea 4", complete: false},
  {id: 5, name: "Tarea 5", complete: true},
  {id: 6, name: "Tarea 6", complete: true},
  {id: 7, name: "Tarea 7", complete: true},
  {id: 8, name: "Tarea 8", complete: false},
  {id: 9, name: "Tarea 9", complete: true},
  {id: 10, name: "Tarea 10", complete: true},
  {id: 11, name: "Tarea 11", complete: true},
  {id: 10, name: "Tarea 10", complete: false},
  {id: 11, name: "Tarea 11", complete: true},
]

export default function Homeworks(){

  return(
    <Box sx={{ overflow: 'auto' }} style={{ height: 'calc(100vh - 210px)' }}>
      <Box sx={{backgroundColor: "primary.light", height: 40}}></Box>
        <Grid container spacing={2} sx={{mt: 1}}>
          <Grid item xs={6} display="flex" flexDirection="column" align="center">
            Tareas sin entregar
            <Paper display="flex" flexDirection="column">
              {tareas.filter(t => t.complete === false).map(t => {return (
                <Link to={`/tareas/${t.id}`}>
                  <Box>{t.name}</Box>
                </Link>
              )})}
            </Paper>
          </Grid>
          <Grid item xs={6} display="flex" flexDirection="column" align="center">
            Tareas entregadas
            <Paper display="flex" flexDirection="column">
              {tareas.filter(t => t.complete === true).map(t => {return (
                  <Link to={`/tareas/${t.id}`}>
                    <Box>{t.name}</Box>
                  </Link>
                )})}
            </Paper>
          </Grid>
        </Grid>
    </Box>
  )
}