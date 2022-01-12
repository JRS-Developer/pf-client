import * as actionTypes from '../../actions/materia/types'
let initialState = {
  materias: [],
  dataEdit: {},
  message: {},
}
export const getMateriasReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MATERIAS_REQUEST:
      return {
        ...state,
        loadingMaterias: true,
      }
    case actionTypes.GET_MATERIAS:
      return {
        ...state,
        loadingMaterias: false,
        materias: action.payload,
      }
    case actionTypes.GET_MATERIA:
      return {
        ...state,
        loadingMaterias: false,
        dataEdit: action.payload,
      }
    case actionTypes.ADD_MATERIA:
      return {
        ...state,
        loadingMaterias: false,
        message: action.payload,
      }
    case actionTypes.EDIT_MATERIA:
      return {
        ...state,
        loadingMaterias: false,
        message: action.payload,
      }
    case actionTypes.MATERIA_FAIL:
      return {
        ...state,
        loadingMaterias: false,
        error: action.payload,
      }

    case actionTypes.DELETE_MATERIA:
      return {
        ...state,
        loadingMaterias: false,
        message: action.payload,
      }

    default:
      return state
  }
}
