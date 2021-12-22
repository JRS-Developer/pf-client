// INFO: Simple user reducer
import * as actionTypes from '../../actions/post/types'

const initialState = {
  posts: [],
  post: {},
  message: {},
  dataEdit: {},
  like: {},
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
    case actionTypes.CHANGE_LIKE: {
      const { postId, userId } = action.payload
      const { posts } = state

      // Obtengo el post y le cambio el madeLike y el array likes
      const newPosts = posts.map((post) => {
        if (post.id === postId)
          return {
            ...post,
            madeLike: !post.madeLike,
            likes: post.madeLike
              ? post.likes.filter((like) => like.user_id !== userId)
              : [...post.likes, { user_id: userId }],
          }
        return post
      })

      return {
        ...state,
        posts: newPosts,
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
        error: action.payload,
      }
    }

    default:
      return state
  }
}
