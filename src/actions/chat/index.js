import axios from 'axios'
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

export const getMessages =
  ({ materia_id, clase_id, school_id, ciclo_lectivo_id }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_MESSAGES_REQUEST,
      })

      // Obtengo el chat de la materia
      let { data: chatData } = await axios.get(`${REACT_APP_CHAT}/chat/clase`, {
        params: {
          materia_id,
          clase_id,
          school_id,
          ciclo_lectivo_id,
        },
      })

      // Obtengo los mensajes del chat
      let messagesRequest = axios.get(
        `${REACT_APP_CHAT}/messages/${chatData._id}`
      )

      // Obtengo los usuarios del chat desde la base de datos de postgres
      const usersRequest = axios.get(`/chat/`, {
        params: {
          materia_id,
          clase_id,
          school_id,
          ciclo_lectivo_id,
        },
      })

      const [messages, users] = await Promise.all([
        messagesRequest,
        usersRequest,
      ])

      // Coloco los usuarios en el chat
      chatData.users = users.data

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

export const resetMessages = () => ({
  type: RESET_MESSAGES,
})

export const resetChat = () => ({
  type: RESET_CHAT,
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
