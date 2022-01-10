import React, { useState } from 'react'
// import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
// import AppBar from '@mui/material/AppBar';
// import Container from '@mui/material/Container';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import PrivateChat from './PrivateChat'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useEffect } from 'react'
import socket from '../../socket'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages, createMessages } from '../../../actions/chat'
import { getDataById as getUser } from '../../../actions/user'

const mensajes = [
  {
    id: 1,
    name: 'Juan',
    message: 'Hola como andan?',
    avatar: '/static/images/avatar/5.jpg',
  },
  {
    id: 2,
    name: 'Lean',
    message: `Cansado`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 1,
    name: 'Juan',
    message: 'Mal yo tambien',
    avatar: '/static/images/avatar/2.jpg',
  },
  {
    id: 2,
    name: 'Lean',
    message: 'Esta para un sandwich de milanesa',
    avatar: '/static/images/avatar/3.jpg',
  },
  {
    id: 1,
    name: 'Juan',
    message: 'Siii con una buena birra',
    avatar: '/static/images/avatar/4.jpg',
  },
  {
    id: 2,
    name: 'Lean',
    message: `Venite`,
    avatar: '/static/images/avatar/5.jpg',
  },
  {
    id: 1,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
]
const Chat = () => {
  //const context = createContext();
  const [message, setMessage] = useState('')
  const [typing, setTyping] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const { messages: chatMessages } = useSelector((state) => state.chatReducer)
  const { dataEdit: userInfo, loading: loadingUser } = useSelector(
    (state) => state.usersReducer
  )
  console.log(chatMessages)
  console.log(userInfo)

  const user = window.localStorage.getItem('user')

  const { claseId, materiaId, cicloLectivoId, schoolId } = useParams()
  const dispatch = useDispatch()

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setIsPrivate(!isPrivate)
    setAnchorEl(null)
  }

  const handleChange = (e) => {
    e.prevent.default()
    setMessage(e.target.value)
    // socket.emit('typing', userInfo);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createMessages(message));

    const fullName = `${userInfo.firstName} - ${userInfo.lastName}`
    socket.emit('message', fullName, message);

    setMessage('');
  }

  useEffect(() => {
    const chat = {
      materia_id: materiaId,
      clase_id: claseId,
      ciclo_lectivo_id: cicloLectivoId,
      school_id: schoolId,
    }

    dispatch(getMessages(chat))
    dispatch(getUser(user))
  }, [dispatch, materiaId, claseId, user, cicloLectivoId, schoolId])

  // useEffect(() => {
  //   socket.on('connect', () => {

  //   })
  //   socket.emit('conectado', userInfo);
  // }, [userInfo]);

  //    socket.on('typing', (data) => {
  //     setTyping(data);
  //    });

  return (
    <>
      {!isPrivate ? (
        <>
          <Box sx={{ overflow: 'auto', height: 'calc(100vh - 180px)' }}>
            <Box sx={{ overflow: 'auto', height: 'calc(100vh - 252px)' }}>
              <Paper sx={{ pb: '50px' }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  sx={{ p: 2, pb: 0 }}
                >
                  Inbox
                </Typography>
                <List sx={{ mb: 2 }}>
                  {mensajes.map(({ id, name, message, person }, i) => (
                    <ListItem
                      key={`m${i}`}
                      button
                      sx={{
                        color: name === 'Juan' ? 'primary.main' : 'secondary',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar alt="Profile Picture" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Button
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                          >
                            {name}
                          </Button>
                        }
                        secondary={message}
                      />
                    </ListItem>
                  ))}
                </List>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    Send private message
                  </MenuItem>
                </Menu>
              </Paper>
            </Box>
          </Box>
          <Box
            sx={{
              top: 'auto',
              bottom: 0,
              bgColor: 'primary.main',
              width: '100%',
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box spacing={0} display="flex" direction="row" sx={{ mt: 2 }}>
                <TextField
                  name="message"
                  required
                  fullWidth
                  id="message"
                  placeholder="Escribir nuevo mensaje..."
                  autoFocus
                  value={message}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  endIcon={<Icon>send</Icon>}
                  width="15%"
                  disabled={!message.length}
                >
                  Enviar
                </Button>
              </Box>
            </form>
          </Box>
        </>
      ) : (
        <PrivateChat onButton={handleClose} />
      )}
    </>
  )
}

export default Chat
