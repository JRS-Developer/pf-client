import * as actionType from './types'
import axios from 'axios'

const { REACT_APP_SERVER } = process.env

export const getNotasExamen = (body, student=false) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_EXAMEN_NOTAS_REQUEST,
    })

    const { data } = await axios.post(
      `${REACT_APP_SERVER}/examenesNotas/notas?student=${student}`,
      body
    )

    dispatch({
      type: actionType.GET_EXAMEN_NOTAS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.EXAMEN_NOTA_FAIL,
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
      type: actionType.GET_EXAMEN_NOTAS_REQUEST,
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/examenesNotas/${id}`)
    //console.log(data);
    dispatch({
      type: actionType.GET_EXAMEN_NOTA,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.EXAMEN_NOTA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addNotasExamen = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_EXAMEN_NOTAS_REQUEST,
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/examenesNotas`, body)

    dispatch({
      type: actionType.ADD_EXAMEN_NOTA,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.EXAMEN_NOTA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const editNotasExamen = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_EXAMEN_NOTAS_REQUEST,
    })

    const { data } = await axios.put(
      `${REACT_APP_SERVER}/examenesNotas/${body.id}`,
      body
    )

    dispatch({
      type: actionType.EDIT_EXAMEN_NOTA,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.EXAMEN_NOTA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
