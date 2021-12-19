import * as actionType from './types';
import axios from "axios";

const {REACT_APP_SERVER} = process.env

export const getClases = (school_id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_CLASES_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/classes/${school_id}`);
    //console.log(data);
    dispatch({
      type: actionType.GET_CLASES,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.CLASE_FAIL,
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
      type: actionType.GET_CLASES_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/classes/clase/${id}`);
    //console.log(data);
    dispatch({
      type: actionType.GET_CLASE,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.CLASE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const createClase = (body) => async (dispatch) => {

  try {
    dispatch({
      type: actionType.GET_CLASES_REQUEST
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/classes`, body);

    dispatch({
      type: actionType.ADD_CLASE,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.CLASE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const modifiedClase = (body) => async (dispatch) => {
  let id = body.id;
  try {
    dispatch({
      type: actionType.GET_CLASES_REQUEST
    })

    const { data } = await axios.put(`${REACT_APP_SERVER}/classes/${id}`, body);

    dispatch({
      type: actionType.EDIT_CLASE,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.CLASE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
