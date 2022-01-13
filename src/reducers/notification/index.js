import * as actionTypes from '../../actions/notification/types'

const initialState = {
  notifications: [],
  loading: false,
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        loading: false,
        notifications: [...state.notifications, action.payload],
      }
    case actionTypes.GET_NOTIFICATIONS:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      }
    case actionTypes.NOTIFICATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
