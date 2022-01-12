import * as actionTypes from '../../actions/clase/types'

let initialState = {
  clases: [],
  dataEdit: {},
  message: {},
}

export const getClasesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CLASES_REQUEST:
      return {
        ...state,
        loadingClases: true,
      }
    case actionTypes.GET_CLASES:
      return {
        ...state,
        loadingClases: false,
        clases: action.payload,
      }
    case actionTypes.GET_CLASE:
      return {
        ...state,
        loadingClases: false,
        dataEdit: action.payload,
      }
    case actionTypes.ADD_CLASE:
      return {
        ...state,
        loadingClases: false,
        message: action.payload,
      }
    case actionTypes.EDIT_CLASE:
      return {
        ...state,
        loadingClases: false,
        message: action.payload,
      }
    case actionTypes.DELETE_CLASE:
      return {
        ...state,
        loadingClasses: false,
        message: action.payload,
      }
    case actionTypes.CLASE_FAIL:
      return {
        ...state,
        loadingClases: false,
        error: action.payload,
      }
    default:
      return state
  }
}
