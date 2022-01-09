import * as actionType from './types'
import axios from 'axios'

const { REACT_APP_SERVER } = process.env

export const getPosts =
  (classId, materiaId, cicloLectivoId, schoolId) => async (dispatch) => {
    try {
      dispatch({
        type: actionType.GET_POSTS_REQUEST,
      })

      let query = `${REACT_APP_SERVER}/publications?`
      query += new URLSearchParams({
        classId: classId,
        cicloLectivoId: cicloLectivoId,
        materiaId: materiaId,
        schoolId: schoolId,
      }).toString()

      const { data } = await axios.get(query)

      dispatch({
        type: actionType.GET_POSTS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: actionType.POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getPost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_POSTS_REQUEST,
    })

    const { data } = await axios.get(
      `${REACT_APP_SERVER}/publications/${postId}`
    )

    dispatch({
      type: actionType.GET_POST,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPost = (body) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_POSTS_REQUEST,
    })

    const { data } = await axios.post(`${REACT_APP_SERVER}/publications`, body)

    dispatch({
      type: actionType.CREATE_POST,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePost = (body, postId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_POSTS_REQUEST,
    })

    const { data } = await axios.put(
      `${REACT_APP_SERVER}/publications/${postId}`,
      body
    )

    dispatch({
      type: actionType.UPDATE_POST,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePost = (body) => async (dispatch) => {
  try {
    const { id: postId } = body

    dispatch({
      type: actionType.GET_POSTS_REQUEST,
    })

    const { data } = await axios.delete(
      `${REACT_APP_SERVER}/publications/${postId}`
    )

    dispatch({
      type: actionType.DELETE_POST,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: actionType.POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const likePost = (postId) => async (dispatch) => {
  const userId = localStorage.getItem('user')
  const payload = {
    postId,
    userId,
  }
  try {
    dispatch({
      type: actionType.CHANGE_LIKE,
      payload,
    })

    await axios.put(`${REACT_APP_SERVER}/publications/${postId}/like`)
  } catch (error) {
    dispatch({
      type: actionType.CHANGE_LIKE,
      payload,
    })
    dispatch({
      type: actionType.POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
