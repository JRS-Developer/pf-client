import * as actionTypes from '../../actions/tasks/types';
let initialState = {
  tasks: [],
  dataEdit:{},
  message: {}
}
export const getTasksReducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.GET_TASKS_REQUEST:
      return {
        ...state,
        loading : true
      }
    case actionTypes.GET_TASKS:
      return {
        ...state,
        loading: false,
        tasks: action.payload
      }
    case actionTypes.GET_TASK:
      return {
        ...state,
        loading: false,
        dataEdit: action.payload
      }
    case actionTypes.ADD_TASK:
      return {
        loading: false,
        tasks: action.payload,
        message: action.payload
      }
    case actionTypes.EDIT_TASK:
      return {
        loading: false,
        tasks: action.payload,
        message: action.payload
      }
    case actionTypes.TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
