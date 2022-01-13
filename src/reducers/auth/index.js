import { LOGOUT, SET_LOGGED } from '../../actions/auth/types'
import { socketChat } from '../../components/socket'

const initialState = {
  isLogged: false,
  loading: true,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED: {
      return {
        ...state,
        isLogged: true,
        loading: false,
      }
    }
    case LOGOUT: {
      socketChat.emit('go-offline', { userId: localStorage.getItem('user') })
      localStorage.removeItem('token')
      localStorage.clear()
      // location.reload();

      return {
        ...state,
        isLogged: false,
        loading: false,
      }
    }
    default:
      return state
  }
}
