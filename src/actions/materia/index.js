import * as actionType from './types'
import axios from 'axios'

const { REACT_APP_SERVER } = process.env

export const getMaterias = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_MATERIAS_REQUEST,
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/materias`)
    //console.log(data);
    dispatch({
      type: actionType.GET_MATERIAS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.MATERIA_FAIL,
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
      type: actionType.GET_MATERIAS_REQUEST,
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/materias/${id}`)
    //console.log(data);
    dispatch({
      type: actionType.GET_MATERIA,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.MATERIA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createMateria = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_MATERIAS_REQUEST,
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/materias`, body)

    dispatch({
      type: actionType.ADD_MATERIA,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.MATERIA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const modifiedMateria = (body) => async (dispatch) => {
  let id = body.id
  try {
    dispatch({
      type: actionType.GET_MATERIAS_REQUEST,
    })

    if(body.name){
    const { data } = await axios.put(`${REACT_APP_SERVER}/materias/${id}`, body)
    dispatch({
      type: actionType.EDIT_MATERIA,
      payload: data,
    })
    } else{
      const { data } = await axios.delete(
        `${REACT_APP_SERVER}/materias/${id}`,
        body
      )

      dispatch({
        type: actionType.DELETE_MATERIA,
        payload: data,
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.MATERIA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
