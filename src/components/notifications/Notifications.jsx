import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
// import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
// import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
// import Avatar from '@mui/material/Avatar'
import CircularProgress from '@mui/material/CircularProgress'
import { useDispatch, useSelector } from 'react-redux'
import { socketNotification } from '../socket'
// import { Link } from 'react-router-dom'
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
          disableRipple
          inputProps={{ 'aria-labelledby': id }}
        />
      </ListItemIcon>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <ListItemText
          primary={<Typography>{title}</Typography>}
          secondary={description}
        />
      </Box>
    </ListItem>
  )
}

const Notifications = () => {
  // const { notifications, loading } = useSelector(
  //   (state) => state.notificationsReducer
  // )
  const [checked, setChecked] = React.useState([])

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
  const { notifications, loading } = useSelector(
    (state) => state.notificationReducer
  )
  console.log(notifications)

  React.useEffect(() => {
    socketNotification.on('notification',data => {
      console.log(data)
    })
  }, [])

  const handleLeido = () => {
    setChecked([])
    removeNotifications(checked)
  }

  const handleTodoLeidos = () => {
    // Aqui deberia ejecutar el action de eliminar notificaciones
    const ids = notifications.map((notification) => notification.id)
    removeNotifications(ids)
  }

  const user = localStorage.getItem('user')

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
            }}
          >
            {checked.length ? (
              <Button onClick={handleLeido}>Marcar como leido</Button>
            ) : null}
            <Button variant="outlined" onClick={handleTodoLeidos}>
              Marcar todo como leido
            </Button>
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
