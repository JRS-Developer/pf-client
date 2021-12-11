// INFO: Simple user reducer
import * as actionTypes from '../../actions/user/types'

const initialState = {
  users: [],
  message: {},
  dataEdit: {},
}

export const getUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      }
    case actionTypes.GET_USER:
      return {
        ...state,
        loading: false,
        dataEdit: action.payload,
      }
    case actionTypes.ADD_USER:
      return {
        ...state,
        loading: false,
        users: action.payload,
        message: action.payload,
      }
    case actionTypes.EDIT_USER:
      return {
        loading: false,
        users: action.payload,
        message: action.payload,
      }
    case actionTypes.DELETE_USER:
      return {
        loading: false,
        users: action.payload,
        message: action.payload,
      }
    case actionTypes.USERS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    default:
      return state
  }
}
