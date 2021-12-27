import Messages from "./chat/PrivateChat";
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
import NotasProfesor from '../notas/NotasProfesor'

export default function ClassRoom() {
  const [value, setValue] = useState('1');
  const [materia, setMateria] = useState('');
  
  const handleChange = (event, newValue) => {
    if(Number(newValue) === 2){
      setValue(newValue);
      setMateria(newValue);
      return
    }
    setValue(newValue);
    
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange}>
            <Tab label="Publicaciones" value="1" />
            <Tab label="Chat" value="2" />
            <Tab label="Tareas" value="3" />
            <Tab label="Notas" value="4" />
          </TabList>
        </Box>
        <Paper elevation={24}>
          <TabPanel value="1"><Feed /></TabPanel>
          <TabPanel value="2"><Chat /></TabPanel>
          <TabPanel value="3"><Homeworks /></TabPanel>
          <TabPanel value="4"><NotasProfesor /></TabPanel>
        </Paper>
      </TabContext>
    </Box>
  );
}