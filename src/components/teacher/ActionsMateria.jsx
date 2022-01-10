import React, { useState } from 'react'
//import Tabs from '@mui/material/Tabs';
import TabList from '@mui/lab/TabList'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import AssignmentIcon from '@mui/icons-material/Assignment'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import CommentIcon from '@mui/icons-material/Comment'
import Homeworks from './homework/Homeworks.jsx'
import ExamenNotasIndex from '../examenNotas/ExamenNotasIndex'
import Chat from '../classroom/chat/Chat'
import Feed from '../classroom/Feed'
import FeedIcon from '@mui/icons-material/Feed';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import JitsiComponent from '../classroom/Jitsi/JitsiComponent'
//import CorregirTarea from './homework/forms/CorregirTarea.jsx'

export default function ActionsMateria() {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
          >

            <Tab icon={<FeedIcon />} label="Publicaciones" value="1" />
            <Tab icon={<AssignmentIcon />} label="Tareas" value="2" />
            <Tab
              icon={<FormatListBulletedIcon />}
              label="Notas de Examen"
              value="3"
            />
            <Tab icon={<CommentIcon />} label="Chat" value="4" />
            <Tab icon={<VideoCameraFrontIcon />} label="Videollamada" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Feed />
        </TabPanel>
        <TabPanel value="2">
          <Homeworks />
        </TabPanel>
        <TabPanel value="3">
          <ExamenNotasIndex />
        </TabPanel>
        <TabPanel value="4">
          <Chat />
        </TabPanel>
        <TabPanel value="5">
          <JitsiComponent />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
