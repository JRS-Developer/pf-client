import * as actionType from './types';
import axios from "axios";

const {REACT_APP_SERVER} = process.env

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_POSTS_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/publications`);
    console.log(data);
    dispatch({
      type: actionType.GET_POSTS,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_POSTS_REQUEST
    })

    const { data } = await axios.get(`${REACT_APP_SERVER}/publications/${postId}`);

    dispatch({
      type: actionType.GET_POST,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const createPost = (body) => async (dispatch) => {

  try {
    dispatch({
      type: actionType.GET_POSTS_REQUEST
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/publications`, body);

    dispatch({
      type: actionType.CREATE_POST,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updatePost = (body, postId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_POSTS_REQUEST
    })

    const { data } = await axios.put(`${REACT_APP_SERVER}/publications/${postId}`, body);

    dispatch({
      type: actionType.UPDATE_POST,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_POSTS_REQUEST
    })

    const { data } = await axios.delete(`${REACT_APP_SERVER}/publications/${postId}`);

    dispatch({
      type: actionType.DELETE_POST,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_POSTS_REQUEST
    })

    const { data } = await axios.put(`${REACT_APP_SERVER}/publications/${postId}/like`);

    dispatch({
      type: actionType.LIKE_POST,
      payload: data
    })
  }catch (error) {
    dispatch({
      type: actionType.POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};