import { LOGOUT, SET_LOGGED } from '../../actions/auth/types'

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
      localStorage.removeItem('token')
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
