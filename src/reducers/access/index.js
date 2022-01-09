import * as actionTypes from '../../actions/access/types'
const initialState = {
  modulesUser: [],
}
export const getAccessUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ACCESS_BY_USER_REQUEST:
      return {
        //...state,
        loadingAccess: true,
        modulesUser: [],
      }
    case actionTypes.GET_ACCESS_BY_USER_SUCCESS:
      return {
        //...state,
        loadingAccess: false,
        modulesUser: action.payload,
      }
    case actionTypes.GET_ACCESS_BY_USER_FAIL:
      return {
        //...state,
        loadingAccess: false,
        errorAccess: action.payload,
      }
    default:
      return state
  }
}

export const addAccessUserReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case actionTypes.ADD_ACCESS_BY_USER_REQUEST:
      return {
        //...state,
        loadingSave: true,
      }
    case actionTypes.ADD_ACCESS_BY_USER_SUCCESS:
      return {
        //...state,
        loadingSave: false,
        message: action.payload,
      }
    case actionTypes.ADD_ACCESS_BY_USER_FAIL:
      return {
        //...state,
        loadingSave: false,
        error: action.payload,
      }
    default:
      return state
  }
}
