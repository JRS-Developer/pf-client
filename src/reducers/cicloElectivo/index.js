import * as actionTypes from '../../actions/cicloElectivo/types'
let initialState = {
  cicloElectivos: [],
  dataEdit: {},
  message: {},
}
export const getCicloElectivoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CICLO_ELECTIVOS_REQUEST:
      return {
        ...state,
        loadingElectivo: true,
      }
    case actionTypes.GET_CICLO_ELECTIVOS:
      return {
        ...state,
        loadingElectivo: false,
        cicloElectivos: action.payload,
      }
    case actionTypes.GET_CICLO_ELECTIVO:
      return {
        ...state,
        loadingElectivo: false,
        dataEdit: action.payload,
      }
    case actionTypes.ADD_CICLO_ELECTIVO:
      return {
        ...state,
        loadingElectivo: false,
        message: action.payload,
      }
    case actionTypes.EDIT_CICLO_ELECTIVO:
      return {
        ...state,
        loadingElectivo: false,
        message: action.payload,
      }
    case actionTypes.CICLO_ELECTIVO_FAIL:
      return {
        ...state,
        loadingElectivo: false,
        error: action.payload,
      }
    default:
      return state
  }
}
