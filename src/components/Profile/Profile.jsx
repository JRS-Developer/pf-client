import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';

import Account from "../account/Account"
import NotasAlumno from '../notas/NotasAlumno';
import ThemeChanger from './ThemeChanger';

export default function Profile({setTheme, primary, setPrimary, secondary, setSecondary}){
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);    
  };

  return(
    <Box>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange}>
            <Tab label="Mi Cuenta" value="1" />
            <Tab label="Notas" value="2" />
            <Tab label="Temas" value="3" />
          </TabList>
        </Box>
        <Paper elevation={24}>
          <TabPanel value="1"><Account /></TabPanel>
          <TabPanel value="2"><NotasAlumno /></TabPanel>
          <TabPanel value="3"><ThemeChanger setTheme={setTheme} primary={primary} setPrimary={setPrimary} secondary={secondary} setSecondary={setSecondary}/></TabPanel>
        </Paper>
      </TabContext>
    </Box>
  )
}