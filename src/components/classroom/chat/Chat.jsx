import { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import PrivateChat from './PrivateChat'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect } from 'react'
import { socketChat } from '../../socket'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMessages,
  createMessages,
  resetStore
} from '../../../actions/chat'
import { getDataById as getUser } from '../../../actions/user'
import UserMessage from './UserMessage'
import ChatInput from './ChatInput'
import Subheader from './ChatSubheader'
import ListUser from './ListUser'
import { makeStyles } from '@material-ui/core/styles'

// Imports


const drawerWidth = 240
const chatHeight = 'calc(100vh - 252px)'

const useStyles = makeStyles(() => ({
  box: {
    scrollbarColor: '#6b6b6b #2b2b2b',
    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
      backgroundColor: 'none',
      width: 5,
    },
    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      backgroundColor: '#6b6b6b',
      minHeight: 24,
    },
    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
      backgroundColor: '#959595',
    },
    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
      backgroundColor: '#959595',
    },
    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#959595',
    },
    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
      backgroundColor: '#2b2b2b',
    },
  },
}))

const Chat = () => {
  const [typing, setTyping] = useState('')
  const [openUsers, setOpenUsers] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const user = localStorage.getItem('user')

  const classes = useStyles()

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

  const params = useParams()
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

  const handleClickUsers = () => {
    setOpenUsers((open) => !open)
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

    socketChat.emit('message', { user, message, chatId: chat._id, _id })
  }

  const findUserData = (users, userId) => {
    return users.find(
      (user) => user.user.id === userId || user.user.id === userId?.id
    )
  }

  useEffect(() => {
    // Despues de obtener la info del chat, mando un socket.emit para unirme al chat
    if (chat) {
      socketChat.emit('join', {
        chatId: chat._id,
        userId: userInfo.id,
      })
      
    }


    return () => {
      // Dejo el chat
      if (chat) {
        socketChat.emit('leave', { chatId: chat._id, userId: userInfo.id })
      }
    }
  }, [chat, userInfo.id])

  useEffect(() => {
    const chat = {
      materia_id: params?.materiaId || params?.materia_id,
      clase_id: params?.claseId || params?.clase_id,
      ciclo_lectivo_id: params?.cicloLectivoId || params?.ciclo_lectivo_id,
      school_id: params?.schoolId || params?.school_id,
    }

    dispatch(getMessages(chat))
    dispatch(getUser(user))

    // Cuando salga del chat, reinicio el store
    return () => {
      dispatch(resetStore())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params])

  // Mostrar typing cuando otro usuario esta escribiendo
  useEffect(() => {
    socketChat.on('typing', (data) => {
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
        <Box>
          <Box
            className={classes.box}
            sx={{
              overflow: 'hidden',
              borderRadius: 3,
              display: 'flex',
            }}
          >
            <Box
              sx={{
                overflow: 'auto',
                height: chatHeight,
                position: 'relative',
                transition: '.3s all',
                width: openUsers ? '75%' : '100%',
              }}
              ref={chatRef}
            >
              <Paper
                sx={{
                  height: 'auto',
                  minHeight: chatHeight,
                  flexDirection: 'column',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: openUsers ? `calc(100% - ${drawerWidth}px` : '100%',
                }}
              >
                {loadingChat || loadingUser ? (
                  <CircularProgress />
                ) : chatMessages.length ? (
                  <>
                    <List
                      subheader={
                        <Subheader
                          typing={typing}
                          handleClick={handleClickUsers}
                          open={openUsers}
                        />
                      }
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: chatHeight,
                        gap: 1,
                        width: '100%',
                      }}
                    >
                      {chatMessages.map(({ _id, message, user: userId }) => {
                        const { users } = chat
                        const { teachers, students } = users

                        // Encuentro al usuario que coincide con el id del usuario que esta en el mensaje
                        let foundUser = findUserData(
                          [...teachers, ...students],
                          userId
                        )
                        foundUser = foundUser?.user

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
                  </>
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
            {loadingUser || loadingChat ? null : (
              <ListUser open={openUsers} users={chat?.users} />
            )}
          </Box>
          {loadingUser || loadingChat ? null : (
            <ChatInput
              handleSubmit={handleSubmit}
              fullName={fullName}
              chatId={chat?._id}
            />
          )}
        </Box>
      ) : (
        <PrivateChat onButton={handleClose} />
      )}
    </>
  )
}

export default Chat
