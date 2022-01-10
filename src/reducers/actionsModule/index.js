import * as actionTypes from '../../actions/actionsModule/types'
const initialState = {
  actionsModule: [],
}
export const getActionsModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ACTIONS_BY_MODULE_REQUEST:
      return {
        //...state,
        loadingActions: true,
        actionsModule: [],
      }
    case actionTypes.GET_ACTIONS_BY_MODULE_SUCCESS:
      return {
        //...state,
        loadingActions: false,
        actionsModule: action.payload,
      }
    case actionTypes.GET_ACTIONS_BY_MODULE_FAIL:
      return {
        //...state,
        loadingActions: false,
        errorActions: action.payload,
      }
    default:
      return state
  }
}
