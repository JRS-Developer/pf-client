import { SET_LOGGED, LOGOUT } from './types'

// Para chequear que esta logeado
export const checkLogged = () => (dispatch) => {
  const token = localStorage.getItem('token')

  if (!token) return dispatch({ type: LOGOUT })

  return dispatch({
    type: SET_LOGGED,
  })
}

// Para iniciar sesion
export const setLogged = () => (dispatch) => {
  return dispatch({
    type: SET_LOGGED,
  })
}

// Para cerrar sesion
export const logout = (dispatch) => {
  return dispatch({
    type: LOGOUT,
  })
}
