import * as actionType from './types';
import axios from "axios";

const {REACT_APP_SERVER} = process.env

export const getTeachers = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TEACHERS_REQUEST
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/users/role`, body);

    dispatch({
      type: actionType.GET_TEACHERS_SUCCESS,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.GET_TEACHERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}

export const getDataById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TEACHERS_REQUEST,
    })
    const { data } = await axios.get(`${REACT_APP_SERVER}/users/${id}`)
    dispatch({
      type: actionType.GET_TEACHER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.GET_TEACHERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getTeacherMaterias = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TEACHERS_REQUEST,
    })
    const { data } = await axios.post(`${REACT_APP_SERVER}/teacherMaterias/materias`, body)
    dispatch({
      type: actionType.GET_TEACHER_MATERIAS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.GET_TEACHERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const modifiedTeacher = () => async (dispatch) => {}

export const createTeacher = () => async => (dispatch) => {}