import * as actionType from './types';
import axios from "axios";

const {REACT_APP_SERVER} = process.env

export const getActionsByModule = (moduleId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_ACTIONS_BY_MODULE_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/access/${moduleId}`);

    dispatch({
      type: actionType.GET_ACTIONS_BY_MODULE_SUCCESS,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.GET_ACTIONS_BY_MODULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};