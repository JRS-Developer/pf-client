import * as actionTypes from '../../actions/navbar/types'

export const getNavbarReducer = (state = { navbar: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_NAVBAR_REQUEST:
      return {
        //...state,
        loading: true,
        navbar: [],
      }
    case actionTypes.GET_NAVBAR_SUCCESS:
      return {
        //...state,
        loading: false,
        navbar: action.payload,
      }
    case actionTypes.GET_NAVBAR_FAIL:
      return {
        //...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
