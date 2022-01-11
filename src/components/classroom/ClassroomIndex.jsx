import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import { ButtonLink } from './ClassroomStyles'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import CircularProgress from '@mui/material/CircularProgress'

import { getDatosMatricula as listDatosMatricula } from '../../actions/matricula'


export default function ClassroomIndex() {
  const dispatch = useDispatch()

  const getStatusReducer = useSelector((state) => state.matriculaReducer)
  const { loading, datosMatricula, error } = getStatusReducer

  const { school_id, ciclo_lectivo_id, clase_id, class: clase } = datosMatricula

  const shortName = (first, last) => `${first[0]}${last[0]}`

  useEffect(() => {
    dispatch(listDatosMatricula())
  }, [dispatch])

  return (
    <Container sx={{ py: 4 }} maxWidth="xl">
      <Alert severity="info" elevation={3}>
        <AlertTitle>{datosMatricula?.class?.name}</AlertTitle>
        Ciclo Lectivo — <strong>{datosMatricula?.ciclo_electivo?.name}</strong>
      </Alert>
      <br />
      <Grid container spacing={4}>
        {loading ? (
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Grid>
        ) : error ? (
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
          >
            <h1>{error}</h1>
          </Grid>
        ) : (
          datosMatricula?.class?.materias?.map((materia) => {
            const profesor = clase?.teachers_materias?.find(
              (teacher) => teacher.materia_id === materia.id
            )?.user

            const fullName =
              profesor?.firstName && profesor?.lastName
                ? `${profesor.firstName} ${profesor.lastName}`
                : ''

            return (
              <Grid key={materia.id} item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {profesor ? (
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: red[500] }}
                          aria-label="profesor"
                          src={profesor.avatar}
                          alt={fullName}
                        >
                          {shortName(profesor.firstName, profesor.lastName)}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={fullName}
                    />
                  ) : null}
                  <CardMedia
                    component="img"
                    height="194"
                    image= {`/imagenes/${materia.name}.jpg`}
                    alt="img"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {materia.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {materia.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <ButtonLink>
                      <Link
                        className="btnLink"
                        to={`/materias/details/${school_id}/${ciclo_lectivo_id}/${clase_id}/${materia.id}`}
                        cursor="pointer"
                      >
                        Ir a la materia
                      </Link>
                    </ButtonLink>
                  </CardActions>
                </Card>
              </Grid>
            )
          })
        )}
      </Grid>
    </Container>
  )
}
