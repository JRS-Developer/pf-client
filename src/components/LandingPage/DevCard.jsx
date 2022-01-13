import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

export default function DevCard({ dev }) {
  const gitHubIconImage = (
    <img style={{ width: '3vw' }} alt="gitHub" src="/iconsLanding/github.png" />
  )

  const linkedinIcon = (
    <img
      style={{ width: '3vw' }}
      alt="linkedin"
      src="/iconsLanding/linkedin.png"
    />
  )

  const pinUbicacionIcon = (
    <img
      style={{ width: '1.1vw' }}
      alt="linkedin"
      src="/iconsLanding/ubicacion.png"
    />
  )
  return (
    <Grid item xs={1.5}>
      <Card sx={{ m: 0.4, border: 1, borderColor: 'black', height: '45vh' }}>
        <CardMedia
          component="img"
          alt="dev photo"
          image={dev.photo}
          sx={{ height: '20vh' }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '25vh',
          }}
        >
          <CardContent sx={{ p: 0.5, pt: 1 }}>
            <Typography
              gutterBottom
              variant="body2"
              sx={{ fontSize: '1.1vw' }}
              component="div"
            >
              {dev.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: '1.1vw' }}
              color="text.secondary"
            >
              {pinUbicacionIcon}
              {dev.ciudad}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Tooltip title="GitHub" placement="bottom" arrow>
              <a
                href={dev.github}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {gitHubIconImage}
              </a>
            </Tooltip>
            <Tooltip title="Linkedin" placement="bottom" arrow>
              <a
                href={dev.linkedin}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 0,
                }}
              >
                {linkedinIcon}
              </a>
            </Tooltip>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  )
}
