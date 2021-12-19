import io from 'socket.io-client';

const {REACT_APP_SOCKET} = process.env;

if(!REACT_APP_SOCKET) console.log("error con la variable de entorno de socket.io")

const socket = io(REACT_APP_SOCKET);

export default socket;