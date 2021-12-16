import React from "react";
import {useHistory, useParams} from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const tarea = {id: 9, title: "Tarea 9", complete: true, description: "Descripción de la tarea que tiene que realizar el alumno"}

export default function Homework(){
    const id = useParams().id
    const history = useHistory()
    
    function handleClick(){
        history.goBack()
    }
    

    return(
        <Paper elevation={24}>
            <Box sx={{ overflow: 'auto' }} style={{ height: 'calc(100vh - 110px)' }}>
                <Grid container>
                    <Grid item xs={9}>
                    <IconButton aria-label="delete" onClick={handleClick}>
                        <ArrowBackIcon />
                    </IconButton>
                        <center><Typography variant="h4">Tarea {id}</Typography></center>
                        <Typography variant="body1" >{tarea.description}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{backgroundColor: "secondary.light", p: 1}}>
                        <Box sx={{height: 'calc(100vh - 142px)', display: "flex", flexDirection: "column", alignItems: "center", mt: 2}}>
                            <Typography variant="h4">Subi tu tarea</Typography>
                            <Paper sx={{width: "16vw", height: "14vw", borderRadius: 2, mt:1, backgroundColor: "primary.main"}}>Subida de archivos como en drive</Paper>
                            <Paper sx={{width: "16vw", height: "7vw", borderRadius: 2, backgroundColor: "primary.main", mt:2}}>Habla por privado con tu profesor</Paper>
                            <Button variant="contained" sx={{mt: 2}}>Marcar tarea como hecha</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}