import { LOGOUT, SET_LOGGED } from "../../actions/auth/types";

const initialState = {
  isLogged: false
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED: {
      return {
        ...state,
        isLogged: true
      }
    }
    case LOGOUT: {
      localStorage.removeItem('token')
      return {
        ...state,
        isLogged: false
      }
    }
    default: return state
  }
}
