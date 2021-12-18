// INFO: Simple user reducer
import * as actionTypes from '../../actions/post/types'

const initialState = {
  posts: [],
  post: {},
  message: {},
  dataEdit: {},
  like:{}
}

export const getPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      }
    case actionTypes.CREATE_POST:
      return {
        ...state,
        loading: false,
        message: action.payload,
        }
    case actionTypes.UPDATE_POST:
      return {
        loading: false,
        message: action.payload,
      }
    case actionTypes.DELETE_POST:
      return {
        loading: false,
        message: action.payload,
      }
    case actionTypes.LIKE_POST: {
      return {
        ...state,
        message: action.payload
      }
    }
    case actionTypes.GET_POST:
      return {
        ...state,
        loading: false,
        post: action.payload,
      }
    case actionTypes.POST_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    

    default:
      return state
  }
}
