import * as React from 'react'
import { styled } from '@mui/material/styles'
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


const tareas = [
  {
    id: '140fd1cd-b99f-4683-8c41-04ed84c62ce5',
    name: 'Tarea 1',
    description: 'Descripcion de tarea',
  },
  {
    id: '5485d298-41d2-40d5-8b8b-9aaa18bca450',
    name: 'Tarea 2',
    description: 'Descripcion de tarea',
  },
  {
    id: 'fd250d53-f74e-473b-a93a-e8a30212c243',
    name: 'Tarea 3',
    description: 'Descripcion de tarea',
  },
]

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

export default function Entregas() {
  const [tareaId, setTareaId] = React.useState(null)

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
                  {tareas.map((tarea, i) => {
                    return (
                      <ListItem
                        key={`${tarea.id + i}`}
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemButton onClick={() => setTareaId(tarea.id)}>
                          <ListItemAvatar>
                            <Avatar>
                              <AssignmentSharpIcon />
                            </Avatar>
                          </ListItemAvatar>

                          <ListItemText
                            primary={tarea.name}
                            secondary={tarea.description}
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
