import * as actionTypes from '../user/types'
import axios from 'axios'
const { REACT_APP_SERVER } = process.env

export const setLogged = () => {
  return {
    type: actionTypes.SET_LOGGED,
  }
}

export const getDataById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_USERS_REQUEST,
    })
    const { data } = await axios.get(`${REACT_APP_SERVER}/users/${id}`)
    dispatch({
      type: actionTypes.GET_USER,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_USERS_REQUEST,
    })
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${REACT_APP_SERVER}/users`, {
      headers: { 'x-access-token': token },
    })
    dispatch({
      type: actionTypes.GET_USERS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createUser = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_USERS_REQUEST,
    })
    const { data } = await axios.post(`${REACT_APP_SERVER}/users`, body)
    dispatch({
      type: actionTypes.ADD_USER,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const modifiedUser = (body) => async (dispatch) => {
  const userId = body.id

  try {
    dispatch({
      type: actionTypes.GET_USERS_REQUEST,
    })

    if (body.firstName) {
      const { data } = await axios.put(
        `${REACT_APP_SERVER}/users/${userId}`,
        body
      )

      dispatch({
        type: actionTypes.EDIT_USER,
        payload: data,
      })
    } else {
      const { data } = await axios.delete(
        `${REACT_APP_SERVER}/users/${userId}`,
        body
      )

      dispatch({
        type: actionTypes.DELETE_USER,
        payload: data,
      })
    }
  } catch (error) {
    dispatch({
      type: actionTypes.USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
