import Logo from '../../logo2.png'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import Paper from '@mui/material/Paper'

export default function Gaia({scroll}){

  return (
  <Grid container>
    <Slide in={true} direction="up">
      <Grid
        item
        xs={4}
        sx={{
          p: 5,
          pr: 2.5,
          pb: 2.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={Logo} style={{ width: '100%' }} alt="Logo Gaia"/>
      </Grid>
    </Slide>
    <Slide in={true} timeout={500} direction="left">
      <Grid
        item
        xs={8}
        sx={{ p: 5, pl: 2.5, pb: 2.5, display: 'flex', alignItems: 'center' }}
      >
        <Paper sx={{ width: '100%', height: '100%', p: 2 }}>
          <Typography variant="h5">¿Que es Gaia?</Typography>
          <Typography variant="h6" noWrap component="div">
            <br />
            <p>Gaia es...</p>
            <p>a</p>a<p>a</p>
            <p>a</p>
            <p>a</p>
          </Typography>
        </Paper>
      </Grid>
    </Slide>
    <Slide in={true} timeout={500} direction="up">
      <Grid
        item
        xs={7}
        sx={{ p: 2.5, pl: 5, display: 'flex', alignItems: 'center' }}
      >
        <Paper sx={{ width: '100%', height: '100%', p: 2 }}>
          <Typography variant="h5">¿Otra cosa?</Typography>
          <Typography variant="h6" noWrap component="div">
            <br />
            <p>Otras cosas</p>
            <p>a</p>a<p>a</p>
            <p>a</p>
            <p>a</p>
          </Typography>
        </Paper>
      </Grid>
    </Slide>
    <Slide in={true} timeout={500} direction="right">
      <Grid
        item
        xs={5}
        sx={{ p: 2.5, pr: 5, display: 'flex', alignItems: 'center' }}
      >
        <Paper sx={{ width: '100%', height: '100%', p: 2 }}>
          <Typography variant="h5">¿Otra cosa?</Typography>
          <Typography variant="h6" noWrap component="div">
            <br />
            <p>Otras cosas</p>
            <p>a</p>a<p>a</p>
            <p>a</p>
            <p>a</p>
          </Typography>
        </Paper>
      </Grid>
    </Slide>
    <Slide in={true} timeout={500} direction="up">
      <Grid
        item
        xs={6}
        sx={{ p: 2.5, pl: 5, display: 'flex', alignItems: 'center' }}
      >
        <Paper sx={{ width: '100%', height: '100%', p: 2 }}>
          <Typography variant="h5" id="g1">G1</Typography>
          <Typography variant="h6" noWrap component="div">
            <br />
            <p>Otras cosas</p>
            <p>a</p>a<p>a</p>
            <p>a</p>
            <p>a</p>
          </Typography>
        </Paper>
      </Grid>
    </Slide>
    <Slide in={true} timeout={500} direction="right">
      <Grid
        item
        xs={6}
        sx={{ p: 2.5, pr: 5, display: 'flex', alignItems: 'center' }}
      >
        <Paper sx={{ width: '100%', height: '100%', p: 2 }}>
          <Typography variant="h5">¿Otra cosa?</Typography>
          <Typography variant="h6" noWrap component="div">
            <br />
            <p>Otras cosas</p>
            <p>a</p>a<p>a</p>
            <p>a</p>
            <p>a</p>
          </Typography>
        </Paper>
      </Grid>
    </Slide>
    <Slide in={true} timeout={500} direction="up">
      <Grid
        item
        xs={6}
        sx={{ p: 2.5, pl: 5, display: 'flex', alignItems: 'center' }}
      >
        <Paper sx={{ width: '100%', height: '100%', p: 2 }}>
          <Typography variant="h5">¿Otra cosa?</Typography>
          <Typography variant="h6" noWrap component="div">
            <br />
            <p>Otras cosas</p>
            <p>a</p>a<p>a</p>
            <p>a</p>
            <p>a</p>
          </Typography>
        </Paper>
      </Grid>
    </Slide>
    <Slide in={true} timeout={500} direction="right">
      <Grid
        item
        xs={6}
        sx={{ p: 2.5, pr: 5, display: 'flex', alignItems: 'center' }}
      >
        <Paper sx={{ width: '100%', height: '100%', p: 2 }}>
          <Typography variant="h5">¿Otra cosa?</Typography>
          <Typography variant="h6" noWrap component="div">
            <br />
            <p>Otras cosas</p>
            <p>a</p>a<p>a</p>
            <p>a</p>
            <p>a</p>
          </Typography>
        </Paper>
      </Grid>
    </Slide>
  </Grid>
)
}
