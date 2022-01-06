import { useState, useRef } from 'react'
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
// import AppBar from '@mui/material/AppBar';
// import Container from '@mui/material/Container';
// import Dialog from '@mui/material/Dialog'
// import Divider from '@mui/material/Divider'
// import AppBar from '@mui/material/AppBar'
// import Toolbar from '@mui/material/Toolbar'
// import IconButton from '@mui/material/IconButton'
// import CloseIcon from '@mui/icons-material/Close'
// import Slide from '@mui/material/Slide'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import PrivateChat from './PrivateChat'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect } from 'react'
import socket from '../../socket'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMessages,
  createMessages,
  resetMessages,
  resetChat,
} from '../../../actions/chat'
import { getDataById as getUser } from '../../../actions/user'
import UserMessage from './UserMessage'
import ChatInput from './ChatInput'

const user = window.localStorage.getItem('user')

const Chat = () => {
  const [typing, setTyping] = useState('')

  const [isPrivate, setIsPrivate] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const chatRef = useRef(null)

  const {
    messages: chatMessages,
    chat,
    loading: loadingChat,
  } = useSelector((state) => state.chatReducer)

  const { dataEdit: userInfo, loading: loadingUser } = useSelector(
    (state) => state.usersReducer
  )

  const fullName = `${userInfo.firstName} ${userInfo.lastName}`

  const { claseId, materiaId, cicloLectivoId, schoolId } = useParams()
  const dispatch = useDispatch()

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const scrollToBottom = () => {
    if (chatRef && chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight
  }

  const handleClose = () => {
    setIsPrivate(!isPrivate)
    setAnchorEl(null)
  }

  const handleSubmit = (message) => {
    // Si el mensaje esta vacio, no se envia
    if (message.trim() === '') return

    const data = {
      chat: chat._id,
      user: userInfo.id,
      message,
    }

    dispatch(createMessages(data))

    const user = { ...userInfo, fullName }
    // Crep un unico _id para el mensaje, esto es para los otros usuarios
    const _id = new Date().getTime()

    socket.emit('message', { user, message, chatId: chat._id, _id })
  }

  const findUserData = (users, userId) => {
    return users.find(
      (user) => user.user.id === userId || user.user.id === userId?.id
    )
  }

  useEffect(() => {
    // Despues de obtener la info del chat, mando un socket.emit para unirme al chat

    if (chat) {
      socket.emit('join', {
        chatId: chat._id,
        userId: userInfo.id,
      })
    }

    return () => {
      // Dejo el chat
      if (chat) {
        socket.emit('leave', { chatId: chat._id, userId: userInfo.id })
      }
    }
  }, [chat, userInfo.id])

  useEffect(() => {
    const chat = {
      materia_id: materiaId,
      clase_id: claseId,
      ciclo_lectivo_id: cicloLectivoId,
      school_id: schoolId,
    }

    dispatch(getMessages(chat))
    dispatch(getUser(user))

    return () => {
      // Reinicio los mensajes y el chat
      dispatch(resetMessages())
      dispatch(resetChat())
    }
  }, [dispatch, materiaId, claseId, cicloLectivoId, schoolId])

  // Mostrar typing cuando otro usuario esta escribiendo
  useEffect(() => {
    socket.on('typing', (data) => {
      setTyping(data)
    })
  }, [])

  // Cuando el usuario deja de escribir por un tiempo, se elimina el typing
  useEffect(() => {
    if (typing) {
      const timeout = setTimeout(() => {
        setTyping('')
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [typing])

  // Cuando abre el chat y hay nuevos mensajes, baja el scroll
  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  return (
    <>
      {!isPrivate ? (
        <>
          <Box sx={{ overflow: 'hidden', borderRadius: 3 }}>
            <Box
              sx={{ overflow: 'auto', height: 'calc(100vh - 252px)' }}
              ref={chatRef}
            >
              <Paper
                sx={{
                  minHeight: '100%',
                  height: 'auto',
                  flexDirection: 'column',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {(loadingChat || loadingUser) && user ? (
                  <CircularProgress />
                ) : chatMessages.length ? (
                  <List
                    subheader={
                      <ListSubheader>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ p: 2, pl: 0 }}
                        >
                          Inbox
                        </Typography>
                        {typing && (
                          <Typography
                            variant="body2"
                            sx={{ p: 1, pl: 0, pr: 2 }}
                          >
                            {typing}
                          </Typography>
                        )}
                      </ListSubheader>
                    }
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      width: '100%',
                    }}
                  >
                    {chatMessages.map(({ _id, message, user: userId }) => {
                      const { users } = chat
                      const { teachers, students } = users

                      // Encuentro al usuario que coincide con el id del usuario que esta en el mensaje
                      const { user: foundUser } = findUserData(
                        [...teachers, ...students],
                        userId
                      )

                      // Si lo encuentra significa que el suuario existe y es un usuario valido
                      if (foundUser)
                        return (
                          <UserMessage
                            key={_id}
                            message={message}
                            user={foundUser}
                            isSender={foundUser.id === user}
                            handleClick={handleClick}
                            open={open}
                          />
                        )
                      return null
                    })}
                  </List>
                ) : (
                  <>Este es el inicio del chat, envia el primer mensaje</>
                )}
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
          <ChatInput handleSubmit={handleSubmit} />
        </>
      ) : (
        <PrivateChat onButton={handleClose} />
      )}
    </>
  )
}

export default Chat
