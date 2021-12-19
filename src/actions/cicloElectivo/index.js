import * as actionType from './types';
import axios from "axios";

const {REACT_APP_SERVER} = process.env

export const getCicloElectivos = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_CICLO_ELECTIVOS_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/cicloElectivos`);
    //console.log(data);
    dispatch({
      type: actionType.GET_CICLO_ELECTIVOS,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.CICLO_ELECTIVO_FAIL,
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
      type: actionType.GET_CICLO_ELECTIVOS_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/cicloElectivos/${id}`);
    //console.log(data);
    dispatch({
      type: actionType.GET_CICLO_ELECTIVO,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.CICLO_ELECTIVO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const createCicloElectivo = (body) => async (dispatch) => {

  try {
    dispatch({
      type: actionType.GET_CICLO_ELECTIVOS_REQUEST
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/cicloElectivos`, body);

    dispatch({
      type: actionType.ADD_CICLO_ELECTIVO,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.CICLO_ELECTIVO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const modifiedCicloElectivo = (body) => async (dispatch) => {
  let id = body.id;
  try {
    dispatch({
      type: actionType.GET_CICLO_ELECTIVOS_REQUEST
    })

    const { data } = await axios.put(`${REACT_APP_SERVER}/cicloElectivos/${id}`, body);

    dispatch({
      type: actionType.EDIT_CICLO_ELECTIVO,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.CICLO_ELECTIVO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
