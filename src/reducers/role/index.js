import * as actionTypes from '../../actions/role/types'
let initialState = {
  roles: [],
  dataEdit: {},
  message: {},
}
export const getRolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ROLES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_ROLES:
      return {
        ...state,
        loading: false,
        roles: action.payload,
      }
    case actionTypes.GET_ROLE:
      return {
        ...state,
        loading: false,
        dataEdit: action.payload,
      }
    case actionTypes.ADD_ROLE:
      return {
        loading: false,
        roles: action.payload,
        message: action.payload,
      }
    case actionTypes.EDIT_ROLE:
      return {
        loading: false,
        roles: action.payload,
        message: action.payload,
      }
    case actionTypes.DELETE_ROLE:
      return {
        loading: false,
        roles: action.payload,
        message: action.payload,
      }
    case actionTypes.ROLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
