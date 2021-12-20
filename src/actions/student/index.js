import * as actionType from './types';
import axios from "axios";

const {REACT_APP_SERVER} = process.env

export const getStudents = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_STUDENTS_REQUEST
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/users/role`, body);

    dispatch({
      type: actionType.GET_STUDENTS_SUCCESS,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.GET_STUDENTS_FAIL,
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
      type: actionType.GET_STUDENTS_REQUEST,
    })
    const { data } = await axios.get(`${REACT_APP_SERVER}/users/${id}`)
    dispatch({
      type: actionType.GET_STUDENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.GET_STUDENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const modifiedStudent = () => async (dispatch) => {}

export const createStudent = () => async => (dispatch) => {}