import io from 'socket.io-client'
import store from '../store/'
import { setNewMessage, addOnlineUser, removeOnlineUser } from '../actions/chat'
const { REACT_APP_SOCKET } = process.env

if (!REACT_APP_SOCKET)
  console.error('error con la variable de entorno de socket.io')

const socket = io(REACT_APP_SOCKET)

socket.on('new-message', (data) => {
  store.dispatch(setNewMessage(data))
})

socket.on('online', (userId) => {
  store.dispatch(addOnlineUser(userId))
})

socket.on('offline', (userId) => {
  store.dispatch(removeOnlineUser(userId))
})

export default socket
