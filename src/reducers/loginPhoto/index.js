import * as actionTypes from '../../actions/loginPhoto/types'

const initialState = {
  photo: {},
}

export const loginPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LOGIN_PHOTO:
      let photo =
        action.payload[Math.floor(Math.random() * action.payload.length)]
      return {
        ...state,
        photo: photo.largeImageURL,
      }
    default:
      return state
  }
}
