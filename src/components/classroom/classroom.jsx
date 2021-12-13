import Messages from "./Messages";
import Feed from "./Feed";
import Homeworks from "./Homeworks"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';

export default function ClassRoom() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} centered>
            <Tab label="Publicaciones" value="1" />
            <Tab label="Chat" value="2" />
            <Tab label="Tareas" value="3" />
          </TabList>
        </Box>
        <Paper elevation={90}>
          <TabPanel value="1"><Feed /></TabPanel>
          <TabPanel value="2"><Messages /></TabPanel>
          <TabPanel value="3"><Homeworks /></TabPanel>
        </Paper>
      </TabContext>
    </Box>
  );
}