import * as actionTypes from './types';
import axios from 'axios';
const { REACT_APP_WEBPUSH, REACT_APP_API } = process.env

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

export const addNotifications = (userId, data) => async (dispatch) => {
  try {

    const receivers = await axios.post(`${REACT_APP_API}/student/matricula`, data)

    
      await axios.post(`${REACT_APP_WEBPUSH}/notification/${userId}`, {message: data.message, receivers})
   
    
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
