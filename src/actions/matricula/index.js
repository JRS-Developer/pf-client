import * as actionType from './types'
import axios from 'axios'

const { REACT_APP_SERVER } = process.env

export const getMatriculas = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_MATRICULAS_REQUEST,
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/matriculas`)
    //console.log(data);
    dispatch({
      type: actionType.GET_MATRICULAS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.MATRICULA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getDataById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_MATRICULAS_REQUEST,
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/matriculas/${id}`)
    //console.log(data);
    dispatch({
      type: actionType.GET_MATRICULA,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.MATRICULA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createMatricula = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_MATRICULAS_REQUEST,
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/matriculas`, body)

    dispatch({
      type: actionType.ADD_MATRICULA,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.MATRICULA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const modifiedMatricula = (body) => async (dispatch) => {
  let id = body.id
  try {
    dispatch({
      type: actionType.GET_MATRICULAS_REQUEST,
    })

    const { data } = await axios.put(
      `${REACT_APP_SERVER}/matriculas/${id}`,
      body
    )

    dispatch({
      type: actionType.EDIT_MATRICULA,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.MATRICULA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getDatosMatricula = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_MATRICULAS_REQUEST,
    })

    const { data } = await axios.get(
      `${REACT_APP_SERVER}/matriculas/datos/matricula`
    )
    //console.log(data);
    dispatch({
      type: actionType.GET_DATOS_MATRICULAS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.MATRICULA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getStudentsMatricula = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_MATRICULAS_REQUEST,
    })

    const { data } = await axios.post(
      `${REACT_APP_SERVER}/matriculas/students/matricula`,
      body
    )
    //console.log(data);
    dispatch({
      type: actionType.GET_STUDENTS_MATRICULA,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.MATRICULA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
