import * as actionType from './types';
import axios from "axios";

const {REACT_APP_SERVER} = process.env

export const getSchools = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_SCHOOLS_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/schools`);
    //console.log(data);
    dispatch({
      type: actionType.GET_SCHOOLS,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.SCHOOL_FAIL,
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
      type: actionType.GET_SCHOOLS_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/schools/${id}`);
    //console.log(data);
    dispatch({
      type: actionType.GET_SCHOOL,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.SCHOOL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const createSchool = (body) => async (dispatch) => {

  try {
    dispatch({
      type: actionType.GET_SCHOOLS_REQUEST
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/schools`, body);

    dispatch({
      type: actionType.ADD_SCHOOL,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.SCHOOL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const modifiedSchool = (body) => async (dispatch) => {
  let id = body.id;
  try {
    dispatch({
      type: actionType.GET_SCHOOLS_REQUEST
    })

    const { data } = await axios.put(`${REACT_APP_SERVER}/schools/${id}`, body);

    dispatch({
      type: actionType.EDIT_SCHOOL,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.SCHOOL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
