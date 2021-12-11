import * as actionType from './types';
import axios from "axios";

const {REACT_APP_SERVER} = process.env

export const getModules = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_MODULES_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/modules`);
    //console.log(data);
    dispatch({
      type: actionType.GET_MODULES,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.MODULE_FAIL,
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
      type: actionType.GET_MODULES_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/modules/${id}`);
    //console.log(data);
    dispatch({
      type: actionType.GET_MODULE,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.MODULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const createModule = (body) => async (dispatch) => {

  try {
    dispatch({
      type: actionType.GET_MODULES_REQUEST
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/modules`, body);

    dispatch({
      type: actionType.ADD_MODULE,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.MODULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const modifiedModule = (body) => async (dispatch) => {
  let moduleId = body.id;
  try {
    dispatch({
      type: actionType.GET_MODULES_REQUEST
    })

    const { data } = await axios.put(`${REACT_APP_SERVER}/modules/${moduleId}`, body);

    dispatch({
      type: actionType.EDIT_MODULE,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.MODULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const removeModule = (body) => async (dispatch) => {
  let id = body.id
  try {
    dispatch({
      type: actionType.GET_MODULES_REQUEST
    })

    const { data } = await axios.put(`${REACT_APP_SERVER}/modules/${id}`, body);

    dispatch({
      type: actionType.DELETE_MODULE,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.MODULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};