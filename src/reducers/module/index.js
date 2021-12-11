import * as actionTypes from '../../actions/module/types';
let initialState = {
  modules: [],
  dataEdit:{},
  message: {}
}
export const getModulesReducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.GET_MODULES_REQUEST:
      return {
        ...state,
        loading : true
      }
    case actionTypes.GET_MODULES:
      return {
        ...state,
        loading: false,
        modules: action.payload
      }
    case actionTypes.GET_MODULE:
      return {
        ...state,
        loading: false,
        dataEdit: action.payload
      }
    case actionTypes.ADD_MODULE:
      return {
        loading: false,
        modules: action.payload,
        message: action.payload
      }
    case actionTypes.EDIT_MODULE:
      return {
        loading: false,
        modules: action.payload,
        message: action.payload
      }
    case actionTypes.MODULE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
