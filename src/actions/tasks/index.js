import * as actionType from './types'
import axios from 'axios'

const { REACT_APP_SERVER } = process.env

export const getTasks = (params) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST,
    })

    const { data } = await axios.get(
      `${REACT_APP_SERVER}/tasks/?school_id=${params.school_id}&class_id=${params.clase_id}&ciclo_lectivo_id=${params.ciclo_lectivo_id}&materia_id=${params.materia_id}`
    )
    // console.log("data",data);
    // console.log("params",params)
    dispatch({
      type: actionType.GET_TASKS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getTaskById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST,
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/tasks/${id}`)
    //console.log(data);
    dispatch({
      type: actionType.GET_TASK,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createTask = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST,
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/tasks`, body)

    dispatch({
      type: actionType.ADD_TASK,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const modifiedTask = (body) => async (dispatch) => {
  let taskId = body.id
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST,
    })

    const { data } = await axios.put(
      `${REACT_APP_SERVER}/tasks/${taskId}`,
      body
    )

    dispatch({
      type: actionType.EDIT_TASK,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const corregirTask = (body) => async (dispatch) => {
  let taskId = body.task_id
  let matriculaId = body.matricula_id
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST,
    })

    const { data } = await axios.put(
      `${REACT_APP_SERVER}/tasks/${matriculaId}/${taskId}`,
      body
    )

    dispatch({
      type: actionType.CORREGIR_TASK,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeTask = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST,
    })

    const { data } = await axios.delete(`${REACT_APP_SERVER}/tasks/${id}`)

    dispatch({
      type: actionType.DELETE_TASK,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const alumnoGetTasks = (params) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST,
    })

    const { data } = await axios.get(
      `${REACT_APP_SERVER}/tasks/alumno/?materia_id=${params.materia_id}&class_id=${params.class_id}&ciclo_lectivo_id=${params.ciclo_lectivo_id}&school_id=${params.school_id}`
    )
    dispatch({
      type: actionType.ALUMNO_GET_TASKS_REQUEST,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const alumnoGetTaskById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST,
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/tasks/alumno/${id}`)

    dispatch({
      type: actionType.ALUMNO_GET_TASK_REQUEST,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const markHomeworkDone = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST,
    })

    const { data } = await axios.patch(`${REACT_APP_SERVER}/tasks/alumno/${id}`)

    dispatch({
      type: actionType.ALUMNO_MARK_DONE,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const cleanStore = () => {
  return {
    type: actionType.CLEAN_STORE,
  }
}
