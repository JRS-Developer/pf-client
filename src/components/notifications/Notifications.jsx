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
import { useHistory } from 'react-router-dom'
import {
  getNotifications,
  removeNotifications,
} from '../../actions/notification'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

const Notification = ({
  id,
  url,
  message: description,
  title,
  sender,
  createdAt,
  handleToggle,
  checked,
  handleClick,
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
        onClick={handleClick}
      >
        <ListItemAvatar>
          <Avatar
            src={sender.avatar}
            alt={`${sender.firstName} - ${sender.lastName}`}
          >
            {sender.firstName.charAt(0).toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Typography color="primary">{title}</Typography>}
          secondary={description}
        />
        <ListItemText
          primary={
            <Typography color="primary" align="right">
              {formatDistanceToNow(new Date(createdAt), {
                locale: es,
              })}
            </Typography>
          }
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

  const history = useHistory()

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
    socketNotification.on('notification', (data) => {
      console.log(data)
    })
  }, [])

  const handleLeido = async () => {
    setChecked([])

    await dispatch(removeNotifications(checked))
    await dispatch(getNotifications(user))
  }

  const handleClick = (id, url) => () => {
    history.push(url)
    dispatch(removeNotifications([id]))
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
        {loading ? (
          <Paper
            sx={{
              p: 3,
              minHeight: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Paper>
        ) : notifications.length ? (
          <Paper>
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                {...notification}
                handleToggle={handleToggle}
                checked={checked}
                handleClick={handleClick(notification.id, notification.url)}
              />
            ))}
          </Paper>
        ) : (
          <Paper
            sx={{
              p: 3,
              minHeight: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6">No hay notificaciones</Typography>
                }
              />
            </ListItem>
          </Paper>
        )}
      </List>
    </Box>
  )
}

export default Notifications
