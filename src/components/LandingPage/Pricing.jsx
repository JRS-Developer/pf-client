import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

export default function Pricing(){
  return (
  <Box sx={{ my: 5, mx: 8 }}>
    <Grid container>
      <Fade in={true} timeout={1000}>
        <Grid item xs={4} sx={{ px: 2.5 }}>
          <Paper elevation={24} sx={{ height: '70vh', p: 2 }}>
            A
          </Paper>
        </Grid>
      </Fade>
      <Fade in={true} timeout={2000}>
        <Grid item xs={4} sx={{ px: 2.5 }}>
          <Paper elevation={24} sx={{ height: '70vh', p: 2 }}>
            B
          </Paper>
        </Grid>
      </Fade>
      <Fade in={true} timeout={3000}>
        <Grid item xs={4} sx={{ px: 2.5 }}>
          <Paper elevation={24} sx={{ height: '70vh', p: 2 }}>
            C
          </Paper>
        </Grid>
      </Fade>
    </Grid>
  </Box>
)
}
