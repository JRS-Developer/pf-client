import * as actionTypes from '../../actions/school/types';
let initialState = {
  schools: [],
  dataEdit:{},
  message: {}
}
export const getSchoolReducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.GET_SCHOOLS_REQUEST:
      return {
        ...state,
        loadingSchool : true
      }
    case actionTypes.GET_SCHOOLS:
      return {
        ...state,
        loadingSchool: false,
        schools: action.payload
      }
    case actionTypes.GET_SCHOOL:
      return {
        ...state,
        loadingSchool: false,
        dataEdit: action.payload
      }
    case actionTypes.ADD_SCHOOL:
      return {
        loadingSchool: false,
        schools: action.payload,
        message: action.payload
      }
    case actionTypes.EDIT_SCHOOL:
      return {
        loadingSchool: false,
        schools: action.payload,
        message: action.payload
      }
      case actionTypes.DELETE_SCHOOL:
        return {
          loadingSchool: false,
          schools: action.payload,
          message: action.payload
        }
    case actionTypes.SCHOOL_FAIL:
      return {
        ...state,
        loadingSchool: false,
        error: action.payload
      }
    default:
      return state
  }
}
