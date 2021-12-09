// INFO: Simple user reducer
import * as actionTypes from '../../actions/user/types'

const initialState = {
  users: [],
  isLogged: false,
}


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        users: []
      }

    case actionTypes.GET_USERS:
        return {
          ...state,
          loading: false,
          users: action.payload
        }
    
    // case actionTypes.GET_USER:
    // return {
    //   ...state,
    //   loading: false,
    //   users: action.payload
    // }
    // case actionTypes.ADD_USER:
    // return {
    //   ...state,
    //   loading: false,
    //   users: action.payload
    // }
    // case actionTypes.DELETE_USER:
    // return {
    //   ...state,
    //   loading: false,
    //   users: action.payload
    // }
    // case actionTypes.EDIT_USERS:
    // return {
    //   ...state,
    //   loading: false,
    //   users: action.payload
    // }
    default:
      return state
  }
}
