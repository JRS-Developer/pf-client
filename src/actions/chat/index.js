import axios from 'axios';
const {REACT_APP_CHAT} = process.env;

export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES = 'GET_MESSAGES';
export const MESSAGES_FAIL = 'GMESSAGES_FAIL';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER = 'GET_USER';
export const USER_FAIL = 'USER_FAIL';
export const CREATE_MESSAGES = 'CREATE_MESSAGES';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';

export const getMessages = ({ materia_id, class_id }) => async (dispatch) => {
    try{
        dispatch({
            type: GET_MESSAGES_REQUEST
          })

        const chat = await axios.get(`${REACT_APP_CHAT}/chat/${materia_id}/${class_id}`);
      
        const { data } = await axios.get(`${REACT_APP_CHAT}/messages/${chat.data._id}`);
          console.log(data);
    
        const message = data.length > 0 ? data : {message: "Este chat esta vacío, sé el primero en comenzar la conversación"}

        dispatch({
          type: GET_MESSAGES,
          payload: message,
        })
        
    } catch(error){
        dispatch({
            type: MESSAGES_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
          })
    }
   
};

export const getUser = (id) => async (dispatch) => {

    try{

        dispatch({
            type: GET_USER_REQUEST
        });


        const { data } = await axios.get(`${REACT_APP_CHAT}/users/${id}`);
        console.log(data);

        dispatch({
        type: GET_USER,
        payload: data,  
        });
    
    } catch(error){
        dispatch({
            type: USER_FAIL,
            payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    };
};

export const createMessages = (body) => async (dispatch) => {

    try {
      dispatch({
        type: GET_MESSAGES_REQUEST
      })
  
      const { data } = await axios.post(`${REACT_APP_CHAT}/messages`, body);
  
      dispatch({
        type: CREATE_MESSAGES,
        payload: data
      })
    }catch (error) {
      dispatch({
        type: MESSAGES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };
  
  export const updateMessages = (body, message_id) => async (dispatch) => {
    try {
      dispatch({
        type: GET_MESSAGES_REQUEST
      })
  
      const { data } = await axios.put(`${REACT_APP_CHAT}/messages/${message_id}`, body);
  
      dispatch({
        type: UPDATE_MESSAGES,
        payload: data
      })
    }catch (error) {
      dispatch({
        type: MESSAGES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };