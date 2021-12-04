// INFO: Simple user reducer
import { SET_LOGGED } from '../../actions/user/types'

const initialState = {
  isLogged: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED:
      return {
        ...state,
        isLogged: true,
      }
    default:
      return state
  }
}
