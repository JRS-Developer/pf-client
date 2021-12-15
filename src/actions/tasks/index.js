import * as actionType from './types';
import axios from "axios";

const {REACT_APP_SERVER} = process.env

export const getTasks = (params) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/tasks/?materia_id=${params.materia_id}&class_id=${params.class_id}`);
    // console.log("data",data);
    // console.log("params",params)
    dispatch({
      type: actionType.GET_TASKS,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getTaskById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/tasks/${id}`);
    //console.log(data);
    dispatch({
      type: actionType.GET_TASK,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const createTask = (body) => async (dispatch) => {

  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/tasks`, body);

    dispatch({
      type: actionType.ADD_TASK,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const modifiedTask = (body) => async (dispatch) => {
  let taskId = body.id;
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST
    })

    const { data } = await axios.put(`${REACT_APP_SERVER}/tasks/${taskId}`, body);

    dispatch({
      type: actionType.EDIT_TASK,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const removeTask = (id) => async (dispatch) => {
  
  try {
    dispatch({
      type: actionType.GET_TASKS_REQUEST
    })

    const { data } = await axios.delete(`${REACT_APP_SERVER}/modules/${id}`);

    dispatch({
      type: actionType.DELETE_TASK,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};