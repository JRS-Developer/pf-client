import {
  GET_MESSAGES_REQUEST,
  GET_MESSAGES,
  MESSAGES_FAIL,
  GET_USER,
  GET_USER_REQUEST,
  USER_FAIL,
  CREATE_MESSAGES,
  UPDATE_MESSAGES,
  GET_CHAT,
  SET_NEW_MESSAGE,
  RESET_MESSAGES,
  RESET_CHAT,
  ADD_ONLINE_USER,
  REMOVE_ONLINE_USER,
} from '../../actions/chat'

// users es un objeo que contiene propieades y cada propiead es un array que contiene los usuarios
const setOnlineUser = (users, id) => {
  const result = {}

  Object.keys(users).forEach((key) => {
    result[key] = users[key].map((user) => {
      if (user.user.id === id) {
        return {
          ...user,
          online: true,
        }
      }
      return user
    })
  })

  return result
}

const setOfflineUser = (users, id) => {
  const result = {}

  Object.keys(users).forEach((key) => {
    result[key] = users[key].map((user) => {
      if (user.user.id === id) {
        return {
          ...user,
          online: false,
        }
      }
      return user
    })
  })

  return result
}

const initialState = {
  messages: [],
  PrivateMsg: [],
  likes: [],
  user: {},
  messsage: {},
  error: {},
  chat: null,
  loading: false,
}

export const getChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case GET_MESSAGES:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, ...action.payload],
      }

    case GET_CHAT:
      return {
        ...state,
        loading: false,
        chat: action.payload,
      }

    case RESET_CHAT:
      return {
        ...state,
        loading: false,
        chat: null,
      }
    case SET_NEW_MESSAGE:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload],
      }
    case CREATE_MESSAGES:
      return {
        ...state,
        loading: false,
      }

    case UPDATE_MESSAGES:
      return {
        ...state,
        loading: false,
        message: action.payload,
      }
    case RESET_MESSAGES:
      return {
        ...state,
        loading: false,
        messages: [],
      }
    case MESSAGES_FAIL:
      return {
        ...state,
        loadingClases: false,
        error: action.payload,
      }
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case GET_USER:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, ...action.payload],
      }

    case USER_FAIL:
      return {
        ...state,
        loadingClases: false,
        error: action.payload,
      }

    case ADD_ONLINE_USER:
      return {
        ...state,
        loading: false,
        chat: state.chat
          ? {
              ...state.chat,
              users: setOnlineUser(state.chat.users, action.payload),
            }
          : null,
      }
    case REMOVE_ONLINE_USER:
      return {
        ...state,
        loading: false,
        chat: state.chat
          ? {
              ...state.chat,
              users: setOfflineUser(state.chat.users, action.payload),
            }
          : null,
      }
    default:
      return state
  }
}
