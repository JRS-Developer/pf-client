import * as actionTypes from '../../actions/teacher/types'

const initialState = {
  teachers: [],
  dataEdit: {},
  message: {},
  teacherMaterias: [],
  allTeacherMaterias: [],
}

export const getTeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TEACHERS_REQUEST:
      return {
        ...state,
        loadingTeacher: true,
      }
    case actionTypes.GET_TEACHERS_SUCCESS:
      return {
        ...state,
        loadingTeacher: false,
        teachers: action.payload,
      }
    case actionTypes.GET_TEACHER_SUCCESS:
      return {
        ...state,
        loadingTeacher: false,
        dataEdit: action.payload,
      }
    case actionTypes.EDIT_TEACHER_SUCCESS:
      return {
        ...state,
        loadingTeacher: false,
        message: action.payload,
      }
    case actionTypes.GET_TEACHER_MATERIAS:
      return {
        ...state,
        loadingTeacher: false,
        teacherMaterias: action.payload,
      }
    case actionTypes.GET_ALL_TEACHER_MATERIAS:
      return {
        ...state,
        loadingTeacher: false,
        allTeacherMaterias: action.payload,
      }
    case actionTypes.RESET_TEACHER_MATERIAS:
      return {
        ...state,
        teacherMaterias: initialState.teacherMaterias,
      }
    case actionTypes.GET_TEACHERS_FAIL:
      return {
        ...state,
        loadingTeacher: false,
        error: action.payload,
      }
    default:
      return state
  }
}
