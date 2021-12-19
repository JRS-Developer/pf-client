import * as actionTypes from '../../actions/matricula/types';
let initialState = {
  matriculas: [],
  dataEdit:{},
  message: {}
}
export const getMatriculaReducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.GET_MATRICULAS_REQUEST:
      return {
        ...state,
        loading : true
      }
    case actionTypes.GET_MATRICULAS:
      return {
        ...state,
        loading: false,
        matriculas: action.payload
      }
    case actionTypes.GET_MATRICULA:
      return {
        ...state,
        loading: false,
        dataEdit: action.payload
      }
    case actionTypes.ADD_MATRICULA:
      return {
        loading: false,
        matriculas: action.payload,
        message: action.payload
      }
    case actionTypes.EDIT_MATRICULA:
      return {
        loading: false,
        matriculas: action.payload,
        message: action.payload
      }
    case actionTypes.MATRICULA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
