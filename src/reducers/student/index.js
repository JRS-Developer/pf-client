import * as actionTypes from '../../actions/student/types';
const initialState = {
  students : [],
  dataEdit: {},
  message : {}
}

export const getStudentsReducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.GET_STUDENTS_REQUEST:
      return {
        ...state,
        loadingStudent : true
      }
    case actionTypes.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        loadingStudent: false,
        students: action.payload
      }
    case actionTypes.GET_STUDENT_SUCCESS:
      return {
        ...state,
        loadingStudent: false,
        dataEdit: action.payload
      }
    case actionTypes.EDIT_STUDENT_SUCCESS:
      return {
        loadingStudent: false,
        students: action.payload,
        message: action.payload
      }
    case actionTypes.GET_STUDENTS_FAIL:
      return {
        ...state,
        loadingStudent: false,
        error: action.payload
      }
    default:
      return state
  }
}