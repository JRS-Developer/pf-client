import * as actionType from './types'
import axios from 'axios'

const { REACT_APP_SERVER } = process.env

export const getRoles = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_ROLES_REQUEST,
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/roles`)
    //console.log(data);
    dispatch({
      type: actionType.GET_ROLES,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.ROLE_FAIL,
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
      type: actionType.GET_ROLES_REQUEST,
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/roles/${id}`)

    dispatch({
      type: actionType.GET_ROLE,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.ROLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createRole = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_ROLES_REQUEST,
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/roles`, body)

    dispatch({
      type: actionType.ADD_ROLE,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.ROLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const modifiedRole = (body) => async (dispatch) => {
  let roleId = body.id
  try {
    dispatch({
      type: actionType.GET_ROLES_REQUEST,
    })

    if (body.name) {
      const { data } = await axios.put(
        `${REACT_APP_SERVER}/roles/${roleId}`,
        body
      )

      dispatch({
        type: actionType.EDIT_ROLE,
        payload: data,
      })
    } else {
      const { data } = await axios.delete(
        `${REACT_APP_SERVER}/roles/${roleId}`,
        body
      )

      dispatch({
        type: actionType.DELETE_ROLE,
        payload: data,
      })
    }
  } catch (error) {
    dispatch({
      type: actionType.ROLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
