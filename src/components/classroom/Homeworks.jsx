import React from "react";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTasks } from "../../actions/tasks";

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
  const dispatch = useDispatch()
  const tasks = useSelector(state=>state.tasksReducer.tasks)
  // console.log(tasks)
  
  useEffect(() => {
    //datos mockeados para mandar por body asi devuelve la tarea de la clase 4to año materia biología.
    let body = {class_id:"57e3dc00-da1f-4522-b71c-3a09af7b670b" , materia_id:"10910772-1b07-4622-833c-633bcaddbe91"}
    dispatch(getTasks(body))
  }, [dispatch])

  return(
    <Box sx={{ overflow: 'auto', height: 'calc(100vh - 180px)' }}>
      <Box sx={{backgroundColor: "primary.light", height: 40}}></Box>
        <Grid container spacing={2} sx={{mt: 1}}>
          <Grid item xs={6} display="flex" align="center" sx={{flexDirection: "column"}}>
            Tareas sin entregar
            <Paper display="flex" sx={{flexDirection: "column"}}>
              {/* {tareas.filter(t => t.complete === false).map((t, i) => {return ( */}
                {tasks.map((t, i) => {return (
                <Link to={`/tareas/${t.id}`} key={`tp${i}`}>
                  <Box>{t.title}</Box>
                  <Box>{t.description}</Box>
                </Link>
              )})}
            </Paper>
          </Grid>
          <Grid item xs={6} display="flex" align="center" sx={{flexDirection: "column"}}>
            Tareas entregadas
            <Paper display="flex" sx={{flexDirection: "column"}}>
              {tareas.filter(t => t.complete === true).map((t, i) => {return (
                  <Link to={`/tareas/${t.id}`} key={`tc${i}`}>
                    <Box>{t.name}</Box>
                  </Link>
                )})}
            </Paper>
          </Grid>
        </Grid>
    </Box>
  )
}