import * as actionType from './types';
import axios from "axios";

const {REACT_APP_SERVER} = process.env

export const getActions = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_ACTIONS_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/actions`);
    //console.log(data);
    dispatch({
      type: actionType.GET_ACTIONS,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.ACTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getDataById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_ACTIONS_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/actions/${id}`);
    //console.log(data);
    dispatch({
      type: actionType.GET_ACTION,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.ACTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const createAction = (body) => async (dispatch) => {

  try {
    dispatch({
      type: actionType.GET_ACTIONS_REQUEST
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/actions`, body);

    dispatch({
      type: actionType.ADD_ACTION,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.ACTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const modifiedAction = (body) => async (dispatch) => {
  let actionId = body.id;
  try {
    dispatch({
      type: actionType.GET_ACTIONS_REQUEST
    })

    const { data } = await axios.put(`${REACT_APP_SERVER}/actions/${actionId}`, body);

    dispatch({
      type: actionType.EDIT_ACTION,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.ACTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
