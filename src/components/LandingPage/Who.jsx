import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grow from '@mui/material/Grow';

export default function Who(){
  return (
  <Box sx={{ p: 5, height: 'calc(100vh - 64px)' }}>
    <Grow in={true} timeout={500}>
    <Paper elevation={24} sx={{ width: '100%', height: '100%', p: 2 }}>
      Somos...
    </Paper>
    </Grow>
  </Box>
)
}
