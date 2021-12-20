import * as actionType from './types';
import axios from "axios";
// import {ADD_ACCESS_BY_USER_SUCCESS} from "./types";

const {REACT_APP_SERVER} = process.env

export const getAccessByUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_ACCESS_BY_USER_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/access/user/${userId}`);

    dispatch({
      type: actionType.GET_ACCESS_BY_USER_SUCCESS,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.GET_ACCESS_BY_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}

export const addAccessByUser = (body) => async (dispatch) => {

  try {
    dispatch({
      type: actionType.ADD_ACCESS_BY_USER_REQUEST
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/access`, body);

    dispatch({
      type: actionType.ADD_ACCESS_BY_USER_SUCCESS,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.ADD_ACCESS_BY_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};