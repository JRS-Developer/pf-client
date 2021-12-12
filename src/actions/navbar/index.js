import * as actionType from './types';
import axios from "axios";

const {REACT_APP_SERVER} = process.env

export const getNavbar = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_NAVBAR_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/access`);

    dispatch({
      type: actionType.GET_NAVBAR_SUCCESS,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.GET_NAVBAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};