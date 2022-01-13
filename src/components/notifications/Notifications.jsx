import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { socketNotification } from '../socket'
// import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import CircularProgress from '@mui/material/CircularProgress'
import { Link as RouterLink } from 'react-router-dom'
import {
  getNotifications,
  removeNotifications,
} from '../../actions/notification'

const Notification = ({
  id,
  url,
  message: description,
  title,
  handleToggle,
  checked,
}) => {
  return (
    <ListItem>
      <ListItemIcon onClick={handleToggle(id)}>
        <Checkbox
          edge="start"
          checked={checked.indexOf(id) !== -1}
          tabIndex={-1}
          inputProps={{ 'aria-labelledby': id }}
        />
      </ListItemIcon>
      <ListItemButton
        sx={{
          width: '100%',
        }}
        component={RouterLink}
        to={url}
      >
        {/* TODO: Descomentar esto cuando el poder colocar el quien envia el mensaje funcione */}
        {/* <ListItemAvatar>
          <Avatar>B</Avatar>
        </ListItemAvatar> */}
        <ListItemText
          primary={<Typography color="primary">{title}</Typography>}
          secondary={description}
        />
      </ListItemButton>
    </ListItem>
  )
}

const Notifications = () => {
  const [checked, setChecked] = React.useState([])

  const { notifications, loading } = useSelector(
    (state) => state.notificationReducer
  )

  const user = localStorage.getItem('user')

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  React.useEffect(() => {
    socketNotification.on('notification',data => {
      console.log(data)
    })
  }, [])

  
  const handleLeido = async () => {
    setChecked([])

    await dispatch(removeNotifications(checked))
    await dispatch(getNotifications(user))
  }

  const handleTodoLeidos = async () => {
    // Aqui deberia ejecutar el action de eliminar notificaciones
    const ids = notifications.map((notification) => notification.id)
    await dispatch(removeNotifications(ids))
    await dispatch(getNotifications(user))
  }

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getNotifications(user))
  }, [dispatch, user])

  return (
    <Box>
      <Paper>
        <Grid
          container
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h6">Notificaciones</Typography>
          <Box
            sx={{
              ml: 'auto',
              display: 'flex',
              gap: 1,
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : notifications.length > 0 ? (
              <>
                <Button
                  onClick={handleLeido}
                  variant="contained"
                  disabled={checked.length === 0}
                >
                  Marcar como leido
                </Button>

                <Button variant="outlined" onClick={handleTodoLeidos}>
                  Marcar todo como leido
                </Button>
              </>
            ) : null}
          </Box>
        </Grid>
      </Paper>
      <List>
        <Paper>
          {loading ? (
            <CircularProgress />
          ) : notifications.length ? (
            notifications.map((notification) => (
              <Notification
                key={notification.id}
                {...notification}
                handleToggle={handleToggle}
                checked={checked}
              />
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No hay notificaciones" />
            </ListItem>
          )}
        </Paper>
      </List>
    </Box>
  )
}

export default Notifications
