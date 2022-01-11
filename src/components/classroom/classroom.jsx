/* import Messages from "./chat/PrivateChat"; */
import Chat from "./chat/Chat";
import Feed from "./Feed";
import Homeworks from "./Homeworks";
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
//import NotasProfesor from '../notas/NotasProfesor';
import ExamenNotasIndex from '../examenNotas/ExamenNotasIndex';
import FullScreenDialog from './chat/ListUser';
import AssignmentIcon from '@mui/icons-material/Assignment'
import FeedIcon from '@mui/icons-material/Feed';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import GroupIcon from '@mui/icons-material/Group';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import CommentIcon from '@mui/icons-material/Comment'

import ListStudents from '../classroom/ListStudents.jsx'
import JitsiComponent from "./Jitsi/JitsiComponent";

export default function ClassRoom() {
  const [value, setValue] = useState('1');
  // const [materia, setMateria] = useState('');
  
  const handleChange = (_event, newValue) => {
    if(Number(newValue) === 2){
      setValue(newValue);
      // setMateria(newValue);
      return
    }
    setValue(newValue);
    
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange}>
            <Tab label="Publicaciones" icon={<FeedIcon />} value="1" />
            <Tab label="Chat" icon={<CommentIcon />} value="2" />
            <Tab label="Tareas" icon={<AssignmentIcon />} value="3" />
            <Tab label="Notas" icon={<FormatListBulletedIcon />} value="4" />
            <Tab label="Lista" icon={<GroupIcon />} value="5" />
            <Tab label="Videollamada" icon={<VideoCameraFrontIcon />} value="6" />
          </TabList>
        </Box>
        <Paper elevation={24}>
          <TabPanel value="1"><Feed /></TabPanel>
          <TabPanel value="2"><Chat /></TabPanel>
          <TabPanel value="3"><Homeworks /></TabPanel>
          <TabPanel value="4">
            {/*<NotasProfesor />*/}
            <ExamenNotasIndex student={true} />
          </TabPanel>  
          <TabPanel value="5">
            <h2>Lista de Alumnos</h2>
            <ListStudents />
          </TabPanel>
          <TabPanel sx={{p: 0}} value="6"><JitsiComponent /></TabPanel>
        </Paper>
      </TabContext>
    </Box>
  );
}
