import * as actionTypes from '../../actions/action/types'
let initialState = {
  actions: [],
  dataEdit: {},
  message: {},
}
export const getActionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_ACTIONS:
      return {
        ...state,
        loading: false,
        actions: action.payload,
      }
    case actionTypes.GET_ACTION:
      return {
        ...state,
        loading: false,
        dataEdit: action.payload,
      }
    case actionTypes.ADD_ACTION:
      return {
        loading: false,
        actions: action.payload,
        message: action.payload,
      }
    case actionTypes.EDIT_ACTION:
      return {
        loading: false,
        actions: action.payload,
        message: action.payload,
      }
    case actionTypes.ACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
