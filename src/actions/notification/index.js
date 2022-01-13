import * as actionTypes from './types'
import axios from 'axios'
const { REACT_APP_WEBPUSH } = process.env
console.log(process.env)

export const getNotifications = (user_id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.SET_LOADING })

    // TODO: Obtener las notificaciones del usuario
    const notifications = await axios.get(
      `${REACT_APP_WEBPUSH}/notifications/`,
      {
        params: {
          userId: user_id,
        },
      }
    )

    dispatch({
      type: actionTypes.GET_NOTIFICATIONS,
      payload: notifications.data,
    })
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

export const addNotification = (notification) => {
  return {
    type: actionTypes.ADD_NOTIFICATION,
    payload: notification,
  }
}

export const removeNotifications = (notificationsIds) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${REACT_APP_WEBPUSH}/notifications/`, {
      data: {
        notificationsIds,
      },
    })

    dispatch({
      type: actionTypes.REMOVE_NOTIFICATIONS,
      payload: data.message,
    })
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
