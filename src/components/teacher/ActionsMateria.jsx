import React, {useState} from 'react';
//import Tabs from '@mui/material/Tabs';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CommentIcon from '@mui/icons-material/Comment';

export default function ActionsMateria() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList  value={value} onChange={handleChange} aria-label="icon label tabs example">
            <Tab icon={<AssignmentIcon />} label="Tareas" value="1" />
            <Tab icon={<FormatListBulletedIcon />} label="Notas de Examen" value="2" />
            <Tab icon={<CommentIcon />} label="Chat" value="3" />
          </TabList >
        </Box>
        <TabPanel value="1">
          Tareas
        </TabPanel>
        <TabPanel value="2">
          Notas de Examen
        </TabPanel>
        <TabPanel value="3">
          Chat
        </TabPanel>
      </TabContext>
    </Box>
  );
}