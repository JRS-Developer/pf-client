import * as React  from 'react';
// import { styled } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
// import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
// import MenuIcon from '@mui/icons-material/Menu';
// import AddIcon from '@mui/icons-material/Add';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreIcon from '@mui/icons-material/MoreVert';
import NewMessage from "./newMessage";
// import Container from "@mui/material/Container"
import { /* useState, */ useEffect } from 'react';

import socket from '../socket'


import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const mensajes = [
  {
    id: 1,
    name: 'Juan',
    message: "Hola como andan?",
    avatar: '/static/images/avatar/5.jpg',
  },
  {
    id: 2,
    name: 'Lean',
    message: `Cansado`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 1,
    name: 'Juan',
    message: 'Mal yo tambien',
    avatar: '/static/images/avatar/2.jpg',
  },
  {
    id: 2,
    name: 'Lean',
    message: 'Esta para un sandwich de milanesa',
    avatar: '/static/images/avatar/3.jpg',
  },
  {
    id: 1,
    name: "Juan",
    message: 'Siii con una buena birra',
    avatar: '/static/images/avatar/4.jpg',
  },
  {
    id: 2,
    name: 'Lean',
    message: `Venite`,
    avatar: '/static/images/avatar/5.jpg',
  },
  {
    id: 1,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    name: 'Juan',
    message: `Yendo`,
    avatar: '/static/images/avatar/1.jpg',
  },
];



export default function Messages({materia}) {
  // const [messages, setMessages] = useState([mensajes])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    useEffect(() => {
      socket.emit('conectado');
    }, []);

  return (
    <Box sx={{overflow: 'auto', height: 'calc(100vh - 180px)'}}>
      <Box sx={{overflow: 'auto', height: 'calc(100vh - 252px)'}}>
        <Paper sx={{ pb: '50px' }}>
          
          <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
            Inbox
          </Typography>
          <List sx={{ mb: 2 }}>
            {mensajes.map(({ id, name, message, person }, i) => (
                <ListItem key={`m${i}`}button sx={{color: name === 'Juan' ? 'primary.main' : 'secondary.main'}}>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" />
                  </ListItemAvatar>
                  <ListItemText primary={<Button
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
      >
        {name}
      </Button>
     }  secondary={message} />
                  
                </ListItem>
              
            ))}
          </List>
          <Menu
     id="basic-menu"
     anchorEl={anchorEl}
     open={open}
     onClose={handleClose}
     MenuListProps={{
       'aria-labelledby': 'basic-button',
     }}
   >
     <MenuItem onClick={handleClose}>Send private message</MenuItem>
     
   </Menu>
        </Paper>
      </Box>
      <NewMessage />
    </Box>
  );
}