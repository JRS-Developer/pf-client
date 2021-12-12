import * as actionTypes from './types'
import axios from 'axios'

export const getLoginPhoto = () => async (dispatch) => {

    const instancia = axios.create()

    const { data } = await instancia.get(`https://pixabay.com/api/?key=24774357-7b4d64a66a3415085ab0888ed&q=students&image_type=photo`)

    return dispatch({
      type: actionTypes.GET_LOGIN_PHOTO,
      payload: data.hits,
    })

}