import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

export default function DevCard({ dev }) {
  const gitHubIconImage = (
    <img
      style={{ width: '25px' }}
      alt="gitHub"
      src="/iconsLanding/github.png"
    />
  )

  const linkedinIcon = (
    <img
      style={{ width: '25px' }}
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
          height="120"
          image={dev.photo}
        />

        <CardContent sx={{ p: 0.5, pt: 1 }}>
          <Typography gutterBottom variant="body2" component="div">
            {dev.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pinUbicacionIcon}
            {dev.ciudad}
          </Typography>
        </CardContent>
        <CardActions>
          <a href={dev.github}>{gitHubIconImage}</a>
          <a href={dev.linkedin}>{linkedinIcon}</a>
        </CardActions>
      </Card>
    </Grid>
  )
}
