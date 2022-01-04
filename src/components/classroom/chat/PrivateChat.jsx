import * as React  from 'react';
// import { styled } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Toolbar from '@mui/material/Toolbar';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
// import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import MenuIcon from '@mui/icons-material/Menu';
// import AddIcon from '@mui/icons-material/Add';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreIcon from '@mui/icons-material/MoreVert';
// import Container from "@mui/material/Container"
import {  useState,  useEffect, /*useContext*/ } from 'react';
import { useSelector} from 'react-redux';
// import socket from '../../socket';
import Chat from './Chat';
import socket from '../../socket';


// const mensajes = [
//   {
//     id: 1,
//     name: 'Juan',
//     message: "Hola como andan?",
//     avatar: '/static/images/avatar/5.jpg',
//   },
//   {
//     id: 2,
//     name: 'Lean',
//     message: `Cansado`,
//     avatar: '/static/images/avatar/1.jpg',
//   },
//   {
//     id: 1,
//     name: 'Juan',
//     message: 'Mal yo tambien',
//     avatar: '/static/images/avatar/2.jpg',
//   },
//   {
//     id: 2,
//     name: 'Lean',
//     message: 'Esta para un sandwich de milanesa',
//     avatar: '/static/images/avatar/3.jpg',
//   },
//   {
//     id: 1,
//     name: "Juan",
//     message: 'Siii con una buena birra',
//     avatar: '/static/images/avatar/4.jpg',
//   },
//   {
//     id: 2,
//     name: 'Lean',
//     message: `Venite`,
//     avatar: '/static/images/avatar/5.jpg',
//   },
//   {
//     id: 1,
//     name: 'Juan',
//     message: `Yendo`,
//     avatar: '/static/images/avatar/1.jpg',
//   },
//   {
//     id: 7,
//     name: 'Juan',
//     message: `Yendo`,
//     avatar: '/static/images/avatar/1.jpg',
//   },
//   {
//     id: 7,
//     name: 'Juan',
//     message: `Yendo`,
//     avatar: '/static/images/avatar/1.jpg',
//   },
//   {
//     id: 7,
//     name: 'Juan',
//     message: `Yendo`,
//     avatar: '/static/images/avatar/1.jpg',
//   },
//   {
//     id: 7,
//     name: 'Juan',
//     message: `Yendo`,
//     avatar: '/static/images/avatar/1.jpg',
//   },
//   {
//     id: 7,
//     name: 'Juan',
//     message: `Yendo`,
//     avatar: '/static/images/avatar/1.jpg',
//   },
//   {
//     id: 7,
//     name: 'Juan',
//     message: `Yendo`,
//     avatar: '/static/images/avatar/1.jpg',
//   },
//   {
//     id: 7,
//     name: 'Juan',
//     message: `Yendo`,
//     avatar: '/static/images/avatar/1.jpg',
//   },
//   {
//     id: 7,
//     name: 'Juan',
//     message: `Yendo`,
//     avatar: '/static/images/avatar/1.jpg',
//   },
//   {
//     id: 7,
//     name: 'Juan',
//     message: `Yendo`,
//     avatar: '/static/images/avatar/1.jpg',
//   },
// ];
export default function PrivateChat() {
  const [messages, setMessages] = useState('');
  const [isGeneral, setIsGeneral] = useState(false);
  const privateChat = useSelector(state => state.privateChat)
  
  useEffect(() => {
    socket.emit('conectado');
  }, []);

const handleClick = () => {
  setIsGeneral(!isGeneral);
};

const handleSubmit = (e) => {
  e.preventDefault();
  
};

const handleChange = (e) => {
  e.preventDefault();
  setMessages(e.target.value)
}


  return (
    <>
    { !isGeneral ? (<Box sx={{overflow: 'auto', height: 'calc(100vh - 180px)'}}>
      <Button
      onClick={handleClick}
      >Chat General</ Button>
      <Box sx={{overflow: 'auto', height: 'calc(100vh - 252px)'}}>
        <Paper sx={{ pb: '50px' }}>
          <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
            Inbox
          </Typography>
          <List sx={{ mb: 2 }}>
            {privateChat.map(({ id, name, message, person }, i) => (
                <ListItem key={`m${i}`}button sx={{color: name === 'Juan' ? 'primary.main' : 'secondary.main'}}>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" />
                  </ListItemAvatar>
                  <ListItemText primary={name} secondary={message} />
                </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
      <Box
            sx={{
              top: 'auto',
              bottom: 0,
              bgColor: 'primary.main',
              width: '100%',
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box spacing={0} display="flex" direction="row" sx={{ mt: 2 }}>
                <TextField
                  name="message"
                  required
                  fullWidth
                  id="message"
                  placeholder="Escribir nuevo mensaje..."
                  autoFocus
                  value={messages}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  endIcon={<Icon>send</Icon>}
                  width="15%"
                  disabled={!messages.length}
                >
                  Enviar
                </Button>
              </Box>
            </form>
          </Box>
    </Box>) : (<Chat />)}
    </>
  );
}