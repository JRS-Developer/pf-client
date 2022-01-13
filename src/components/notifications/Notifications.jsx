import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import CircularProgress from '@mui/material/CircularProgress'
import { useDispatch, useSelector } from 'react-redux'
import { socketNotification } from '../socket'

const Notification = ({ user, link, description }) => {


  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={user.avatar} alt={user.firstName} />
      </ListItemAvatar>
      <ListItemText primary={user.firstName} secondary={description} />
    </ListItem>
  )
}

const Notifications = () => {
  const { notifications, loading } = useSelector(
    (state) => state.notificationsReducer
  )
  const dispatch = useDispatch()

  React.useEffect(() => {}, [dispatch])

  return (
    <Box>
      <List>
        {loading ? (
          <CircularProgress />
        ) : (
          notifications.map((notification) => (
            <Notification key={notification.id} {...notification} />
          ))
        )}
      </List>
    </Box>
  )
}

export default Notifications
