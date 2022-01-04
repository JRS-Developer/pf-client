import Logo from '../../logo2.png'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide';

export const gaia = (
  <Box>
    <Grid container>
      <Slide in={true} direction="up">
        <Grid item xs={4} sx={{ p: 5 }}>
          <img src={Logo} style={{ width: '100%' }} alt="Logo Gaia" />
        </Grid>
      </Slide>
      <Slide in={true} timeout={500} direction="left">
        <Grid item xs={8} sx={{ p: 5 }}>
          <Typography variant="h6" noWrap component="div">
            Gaia es...
          </Typography>
        </Grid>
      </Slide>
    </Grid>
  </Box>
)
