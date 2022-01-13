import io from 'socket.io-client'
import store from '../store/'
import { setNewMessage, addOnlineUser, removeOnlineUser } from '../actions/chat'
// import { addNotification } from '../actions/notification'
const { REACT_APP_SOCKET_CHAT, REACT_APP_SOCKET_NOTIFICATION } = process.env;


if (!REACT_APP_SOCKET_CHAT?.startsWith('http')) {
  console.error(
    'error con la variable de entorno de socket.io, falta la variable REACT_APP_SOCKET_CHAT'
  )
}

if (!REACT_APP_SOCKET_NOTIFICATION?.startsWith('http')) {
  console.error(
    'error con la variable de entorno de socket.io, falta la variable REACT_APP_SOCKET_NOTIFICATION'
  )
}

const socketChat = io(REACT_APP_SOCKET_CHAT)
const socketNotification = io(REACT_APP_SOCKET_NOTIFICATION)

// Chat
socketChat.on('new-message', (data) => {
  store.dispatch(setNewMessage(data))
})

socketChat.on('online', (userId) => {
  store.dispatch(addOnlineUser(userId))
})

socketChat.on('offline', (userId) => {
  store.dispatch(removeOnlineUser(userId))
})

// Notification

// socketNotification.on('new-notification', (data) => {
// })

// socketNotification.on('online', (userId) => {
//   store.dispatch()
// })

// socketNotification.on('notification', (data) => {
  
// })

// socketNotification.on('offline', (userId) => {
//   store.dispatch()
// })



export { socketChat, socketNotification }
