import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from '@mui/material/'

import { stringAvatar } from '../utils'

/**
 * UserMessage
 *
 * message: string que contiene el mensaje
 * user: objeto que contiene el usuario
 * isSender: booleano que indica si el mensaje es del usuario o del otro usuario
 * handleClick: funcion que se ejecuta al hacer click en el nombre del usuario
 * open: booleano que indica si el menu esta abierto o no
 **/

const UserMessage = ({ message, user, isSender, handleClick, open }) => {
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <ListItem
      sx={{
        alignSelf: isSender ? 'flex-end' : 'flex-start',
        border: isSender ? 0 : 2,
        borderColor: isSender ? 'transparent' : 'primary.main',
        bgcolor: isSender ? 'primary.main' : 'transparent',
        ml: isSender ? 'auto' : 2,
        mr: isSender ? 2 : 'auto',
        width: '40%',
        minWidth: '250px',
        borderRadius: isSender ? '10px 10px 0px 10px' : '10px 10px 10px 0px',
      }}
    >
      {isSender ? null : (
        <ListItemAvatar>
          <Avatar alt={fullName} src={user.avatar} {...stringAvatar(fullName)}>
            <Typography variant="body2" sx={{ p: 0, m: 0 }}>
              {`${fullName.split(' ')[0][0]}${
                fullName.split(' ')[1][0]
              }`.toUpperCase()}
            </Typography>
          </Avatar>
        </ListItemAvatar>
      )}
      <ListItemText
        primary={
          isSender ? null : (
            <Typography
              variant="body"
              aria-controls="basic-menu"
              aria-haspopup="true"
              // sx={{
              //   cursor: 'pointer',
              // }}
              aria-expanded={open ? 'true' : 'fasle'}
              onClick={handleClick}
            >
              {fullName}
            </Typography>
          )
        }
        secondary={message}
      />
    </ListItem>
  )
}

export default UserMessage
