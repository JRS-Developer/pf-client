import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux'

export default function Feed() {
  let photo = useSelector((store) => store.loginPhoto).photo

  const data = [
    {
      id: 1,
      name: 'Juan',
      avatar: '',
      img: photo,
      title: 'Biología Modulo 1',
      description: `Hola alumnos!
      Les dejo el material que vamos a usar todo este módulo`,
    },
    {
      id: 1,
      name: 'Juan',
      avatar: '',
      img: photo,
      title: 'Biología Modulo 1',
      description: `Hola alumnos!
      Les dejo el material que vamos a usar todo este módulo`,
    },
    {
      id: 1,
      name: 'Juan',
      avatar: '',
      img: photo,
      title: 'Biología Modulo 1',
      description: `Hola alumnos!
      Les dejo el material que vamos a usar todo este módulo`,
    },
    {
      id: 1,
      name: 'Juan',
      avatar: '',
      img: photo,
      title: 'Biología Modulo 1',
      description: `Hola alumnos!
      Les dejo el material que vamos a usar todo este módulo`,
    },
    {
      id: 1,
      name: 'Juan',
      avatar: '',
      img: photo,
      title: 'Biología Modulo 1',
      description: `Hola alumnos!
      Les dejo el material que vamos a usar todo este módulo`,
    },
  ]

  return (
    <Box sx={{ overflow: 'auto', height: 'calc(100vh - 180px)' }}>
      <Grid container spacing={2}>
        {data.map((e, i) => (
          <Grid item xs={12} key={`f${i}`}>
            <Box sx={{ width: '95%' }}>
              <Paper display="flex" align="center" sx={{p: 1, border: 1, borderColor: 'primary.main', borderRadius: 2, flexDirection: "column"}}>
                <Box display="flex" sx={{alignItems: 'center', pb: 1}}>
                  <Avatar alt={e.name} src={e.avatar} sx={{ width: 24, height: 24, mr: 1 }}/>
                  <Typography variant="subtitle1">{e.name}</Typography>
                </Box>
                <Box sx={{width: "50%", pb: 1,}}>
                  <img src={e.img} alt={e.title} styles={{objectFit: "cover"}} />
                </Box>
                <Typography variant="h6">{e.title}</Typography>
                <Typography variant="body2">{e.description}</Typography>
              </Paper>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
