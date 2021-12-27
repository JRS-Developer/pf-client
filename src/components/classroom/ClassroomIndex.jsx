import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { ButtonLink } from './ClassroomStyles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ClassroomIndex() {

  return (
    <Container sx={{ py: 4 }} maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Nombre del profesor"
            />
            <CardMedia
              component="img"
              height="194"
              image="https://static.laverdad.es/www/multimedia/202005/08/media/cortadas/984X608-matematicas-kaQG-U11087194903WZF-984x608@RC.jpg"
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Matemáticas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent>
            <CardActions>
              <ButtonLink>
                <Link className="btnLink" to="/materias/details/a3d2aa7e-8938-482c-aee1-b923ec136b0e/a6dca1e0-2c97-412b-afcc-bd0c9e419a3c" cursor="pointer"  >Ir a la materia</Link>
              </ButtonLink>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Nombre del profesor"
            />
            <CardMedia
              component="img"
              height="194"
              image="https://static.laverdad.es/www/multimedia/202005/08/media/cortadas/984X608-matematicas-kaQG-U11087194903WZF-984x608@RC.jpg"
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Matemáticas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent>
            <CardActions>
              <ButtonLink>
                <Link className="btnLink" to="/materias/details/1/5" cursor="pointer"  >Ir a la materia</Link>
              </ButtonLink>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Nombre del profesor"
            />
            <CardMedia
              component="img"
              height="194"
              image="https://static.laverdad.es/www/multimedia/202005/08/media/cortadas/984X608-matematicas-kaQG-U11087194903WZF-984x608@RC.jpg"
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Matemáticas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent>
            <CardActions>
              <ButtonLink>
                <Link className="btnLink" to="/materias/details/1/5" cursor="pointer"  >Ir a la materia</Link>
              </ButtonLink>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Nombre del profesor"
            />
            <CardMedia
              component="img"
              height="194"
              image="https://static.laverdad.es/www/multimedia/202005/08/media/cortadas/984X608-matematicas-kaQG-U11087194903WZF-984x608@RC.jpg"
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Matemáticas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent>
            <CardActions>
              <ButtonLink>
                <Link className="btnLink" to="/materias/details/1/5" cursor="pointer"  >Ir a la materia</Link>
              </ButtonLink>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>

  );
}
