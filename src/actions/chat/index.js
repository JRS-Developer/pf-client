import axios from 'axios'
import {
  getChatData,
  createChat,
  getOnlineUsers,
  getChatUsers,
  getChatMessages,
} from './services'
const { REACT_APP_CHAT } = process.env

export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST'
export const GET_MESSAGES = 'GET_MESSAGES'
export const MESSAGES_FAIL = 'GMESSAGES_FAIL'
export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER = 'GET_USER'
export const USER_FAIL = 'USER_FAIL'
export const SET_NEW_MESSAGE = 'SET_NEW_MESSAGE'
export const CREATE_MESSAGES = 'CREATE_MESSAGES'
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES'
export const RESET_MESSAGES = 'RESET_MESSAGES'
export const GET_CHAT = 'GET_CHAT'
export const RESET_CHAT = 'RESET_CHAT'

// Users
export const ADD_ONLINE_USER = 'ADD_ONLINE_USER'
export const REMOVE_ONLINE_USER = 'REMOVE_ONLINE_USER'

export const getMessages =
  ({ materia_id, clase_id, school_id, ciclo_lectivo_id }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_MESSAGES_REQUEST,
      })
      const params = { materia_id, clase_id, school_id, ciclo_lectivo_id }

      let chatData = {}

      // Obtengo el chat de la materia
      try {
        const { data } = await getChatData(params)
        chatData = data
      } catch (e) {
        // Si no existe el chat, lo creo
        if (e.response.status === 404) {
          const { data } = await createChat(params)
          chatData = data
        } else {
          // Sino es 404 entonces devuelvo el error para que lo handlee el otro catch
          throw e
        }
      }

      // Obtengo los mensajes del chat
      let messagesRequest = getChatMessages(chatData._id)

      // Obtengo los usuarios del chat desde la base de datos de postgres
      const usersRequest = getChatUsers(params)

      const [messages, users] = await Promise.all([
        messagesRequest,
        usersRequest,
      ])

      const onlineUsers = chatData.onlineUsers

      // Coloco los usuarios en el chat e inidico si esta online o no
      chatData.users = getOnlineUsers(users.data, onlineUsers)

      dispatch({
        type: GET_CHAT,
        payload: chatData,
      })

      dispatch({
        type: GET_MESSAGES,
        payload: messages.data,
      })
    } catch (error) {
      dispatch({
        type: MESSAGES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const setNewMessage = (data) => {
  return {
    type: SET_NEW_MESSAGE,
    payload: data,
  }
}

export const addOnlineUser = (userId) => ({
  type: ADD_ONLINE_USER,
  payload: userId,
})

export const removeOnlineUser = (userId) => ({
  type: REMOVE_ONLINE_USER,
  payload: userId,
})

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_REQUEST,
    })

    const { data } = await axios.get(`${REACT_APP_CHAT}/users/${id}`)

    dispatch({
      type: GET_USER,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createMessages = (body) => async (dispatch) => {
  try {
    // TODO: Eliminar este dispatch ya que causa que se muestre el loading al enviar un mensaje
    // dispatch({
    //   type: GET_MESSAGES_REQUEST,
    // })

    const { data } = await axios.post(`${REACT_APP_CHAT}/messages`, body)

    // Muestro el mensaje al usuario
    dispatch(setNewMessage(data))

    dispatch({
      type: CREATE_MESSAGES,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MESSAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateMessages = (body, message_id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MESSAGES_REQUEST,
    })

    const { data } = await axios.put(
      `${REACT_APP_CHAT}/messages/${message_id}`,
      body
    )

    dispatch({
      type: UPDATE_MESSAGES,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MESSAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
