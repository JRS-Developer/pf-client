import * as actionTypes from '../../actions/tasks/types'
let initialState = {
  tasks: [],
  task: {},
  dataEdit: {},
  message: {},
}
export const getTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_TASKS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      }
    case actionTypes.GET_TASK:
      return {
        ...state,
        loading: false,
        dataEdit: action.payload,
      }
    case actionTypes.ADD_TASK:
      return {
        loading: false,
        message: action.payload,
      }
    case actionTypes.EDIT_TASK:
      return {
        loading: false,
        tasks: action.payload,
        message: action.payload,
      }
    case actionTypes.CORREGIR_TASK:
      return {
        ...state,
        loading: false,
        message: action.payload,
      }
    case actionTypes.TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case actionTypes.ALUMNO_GET_TASKS_REQUEST:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      }
    case actionTypes.ALUMNO_GET_TASK_REQUEST:
      return {
        ...state,
        loading: false,
        task: action.payload,
      }
    case actionTypes.ALUMNO_MARK_DONE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      }
    case actionTypes.CLEAN_STORE:
      return initialState
    default:
      return state
  }
}
