import * as actionTypes from '../../actions/examenNotas/types'
let initialState = {
  examenNotas: [],
  dataEdit: {},
  message: {},
}
export const getExamenNotasReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EXAMEN_NOTAS_REQUEST:
      return {
        ...state,
        loadingExamenNotas: true,
      }
    case actionTypes.GET_EXAMEN_NOTAS:
      return {
        ...state,
        loadingExamenNotas: false,
        examenNotas: action.payload,
      }
    case actionTypes.GET_EXAMEN_NOTA:
      return {
        ...state,
        loadingExamenNotas: false,
        dataEdit: action.payload,
      }
    case actionTypes.ADD_EXAMEN_NOTA:
      return {
        loadingExamenNotas: false,
        message: action.payload,
      }
    case actionTypes.EDIT_EXAMEN_NOTA:
      return {
        loadingExamenNotas: false,
        examenNotas: action.payload,
        message: action.payload,
      }
    case actionTypes.EXAMEN_NOTA_FAIL:
      return {
        ...state,
        loadingExamenNotas: false,
        error: action.payload,
      }
    default:
      return state
  }
}
