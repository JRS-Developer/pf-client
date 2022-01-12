import * as actionTypes from './types'
import axios from 'axios'

export const getNotifications = (user_id) => async (dispatch) => {
  try {
    // TODO: Obtener las notificaciones del usuario
  } catch (error) {
    dispatch({
      type: actionTypes.NOTIFICATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addNotifications = () => async (dispatch) => {
  try {
  } catch (error) {
    dispatch({
      type: actionTypes.NOTIFICATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeNotifications = () => async (dispatch) => {
  try {
  } catch (error) {
    dispatch({
      type: actionTypes.NOTIFICATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
