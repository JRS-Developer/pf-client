import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import NewMessage from "./newMessage";
import Container from "@mui/material/Container"

const messages = [
  {
    id: 1,
    primary: 'Juan',
    secondary: "Hola como andan?",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 2,
    primary: 'Lean',
    secondary: `Bien cagado de`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 3,
    primary: 'Juan',
    secondary: 'Mal yo tambien',
    person: '/static/images/avatar/2.jpg',
  },
  {
    id: 4,
    primary: 'Lean',
    secondary: 'Esta para un sandwich de milanesa',
    person: '/static/images/avatar/3.jpg',
  },
  {
    id: 5,
    primary: "Juan",
    secondary: 'Siii con una buena birra',
    person: '/static/images/avatar/4.jpg',
  },
  {
    id: 6,
    primary: 'Lean',
    secondary: `Venite`,
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 7,
    primary: 'Juan',
    secondary: `Yendo`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    primary: 'Juan',
    secondary: `Yendo`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    primary: 'Juan',
    secondary: `Yendo`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    primary: 'Juan',
    secondary: `Yendo`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    primary: 'Juan',
    secondary: `Yendo`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    primary: 'Juan',
    secondary: `Yendo`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    primary: 'Juan',
    secondary: `Yendo`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    primary: 'Juan',
    secondary: `Yendo`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    primary: 'Juan',
    secondary: `Yendo`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    id: 7,
    primary: 'Juan',
    secondary: `Yendo`,
    person: '/static/images/avatar/1.jpg',
  },
];

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Messages() {
  return (
    <Box>
      <Box sx={{maxHeight: '80vh', overflow: 'auto'}} >
        <Paper sx={{ pb: '50px' }}>
          
          <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
            Inbox
          </Typography>
          <List sx={{ mb: 2 }}>
            {messages.map(({ id, primary, secondary, person }) => (
              <React.Fragment key={id}>
                {id === 1 && (
                  <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                    Today
                  </ListSubheader>
                )}

                {id === 3 && (
                  <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                    Yesterday
                  </ListSubheader>
                )}

                <ListItem button>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={person} />
                  </ListItemAvatar>
                  <ListItemText primary={primary} secondary={secondary} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
      <NewMessage />
    </Box>
  );
}