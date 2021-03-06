import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import GoogleFontLoader from 'react-google-font-loader';

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@material-ui/core/Grid'
import { Row, Item } from '@mui-treasury/components/flex'
import { Info } from '@mui-treasury/components/info'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'

import { getCicloElectivos as listCicloElectivos } from '../../actions/cicloElectivo'
import { teacherMaterias as listMaterias } from '../../actions/teacher'

const nada = []

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    transition: '0.3s',
    position: 'relative',
    '&:before': {
      transition: '0.2s',
      position: 'absolute',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      borderRadius: '1rem',
      zIndex: 0,
      bottom: 0,
    },
    '&:hover': {
      '&:before': {
        bottom: -6,
      },
      '& $card': {
        boxShadow: '-1px 7px 22px 0 #bcc3d6',
      },
    },
  },
  card: {
    zIndex: 1,
    position: 'relative',
    borderRadius: '1rem',
    boxShadow: '0 1px 10px 0 rgb(0 0 0 / 20%)',
    /*backgroundColor: '#fff',*/
    transition: '0.4s',
    height: '100%',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: '0.75rem',
  },
  avatar: {
    fontSize: '0.875rem',
    backgroundColor: '#6d7efc',
  },
  join: {
    background: 'linear-gradient(to top, #638ef0, #82e7fe)',
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '12px',
    color: '#f4f4f4',
    '& > *': {
      textTransform: 'none',
    },
  },
}))

const CustomCard = ({
  thumbnail,
  title,
  subtitle,
  description,
  materia_id,
  school_id,
  clase_id,
  ciclo_lectivo_id,
}) => {
  const styles = useStyles()
  // const btnStyles = useGraphicBtnStyles();
  return (
    <Paper elevation={3}>
      <Row p={2} gap={2} sx={{ pb: 1 }}>
        <Grid container>
          <Grid item xs={4}>
            <Info sx={{p:0, m:0}}>
              <Typography variant="h5">{title}</Typography>
              <Divider sx={{mr: 2}}/>
              <Typography variant="subtitle1">{subtitle}</Typography>
            </Info>
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ width: '100%', height: '20vh' }}>
              <CardMedia
                component="img"
                height="100%"
                image={`/imagenes/${title}.jpg`}
                alt="img"
              />
            </Box>
          </Grid>
        </Grid>
      </Row>
      <Divider sx={{pb: 0.5, mx: 1}}/>
      {/* <Box
        pb={1}
        px={2}
        color={'grey.600'}
        fontSize={'0.875rem'}
        fontFamily={'Ubuntu'}
      >
        {description}
      </Box> */}
      <Row p={2} gap={2} position={'bottom'} sx={{ pt: 0 }}>
        <Item>
          <AvatarGroup max={3} classes={{ avatar: styles.avatar }}>
            {new Array(5).fill(0).map((_, index) => (
              <Avatar
                key={index}
                src={`https://i.pravatar.cc/300?img=${Math.floor(
                  Math.random() * 30
                )}`}
              />
            ))}
          </AvatarGroup>
        </Item>
        <Item position={'middle-right'}>
          <Button
            variant="contained"
            component={Link}
            exact
            to={`materia/${school_id}/${clase_id}/${ciclo_lectivo_id}/${materia_id}`}
          >
            Entrar
          </Button>
        </Item>
      </Row>
    </Paper>
  )
}

export const TeacherClassroom = React.memo(function TeamCard() {
  const [valueCiclo, setValueCiclo] = React.useState('')
  const [valueSchool, setValueSchool] = React.useState('')
  const [listSchool, setListSchool] = React.useState('')

  const dispatch = useDispatch()

  const cicloElectivoReducer = useSelector(
    (state) => state.cicloElectivoReducer
  )
  const { cicloElectivos, loading, error } = cicloElectivoReducer

  const obtenerMaterias = useSelector((state) => state.teacherReducer)
  const { teacherMaterias, loadingTeacher } = obtenerMaterias

  useEffect(() => {
    dispatch(listCicloElectivos())
  }, [dispatch])

  useEffect(() => {
    if (cicloElectivos?.length > 0) {
      setValueCiclo({
        id: cicloElectivos[0].id,
        label: cicloElectivos[0].name,
      })
      const teacherId = localStorage.getItem('user')
      dispatch(
        listMaterias({
          teacher_id: teacherId,
          ciclo_lectivo_id: cicloElectivos[0].id,
        })
      )
    }
  }, [dispatch, cicloElectivos])

  useEffect(() => {
    if (teacherMaterias?.length > 0) {
      let materias = []
      teacherMaterias?.forEach((sc) => {
        materias.push({
          id: sc.school.id,
          label: sc.school.name,
        })
      })

      //Obtenemos las schools no repetidas
      const setObj = new Set() // creamos pares de clave y array

      const unicos = materias.reduce((acc, persona) => {
        const clave = JSON.stringify(persona)

        if (!setObj.has(clave)) {
          setObj.add(clave, persona)
          acc.push(persona)
        }
        return acc
      }, [])

      setListSchool(unicos)
      setValueSchool(unicos[0])
    }
  }, [cicloElectivos, teacherMaterias])

  // Listamos Los ciclos electivos
  let listaElectivos = []
  cicloElectivos?.map((electivo) => {
    return listaElectivos.push({
      id: electivo.id,
      label: electivo.name,
    })
  })

  return (
    <>
      <br />
      {/*<NoSsr>
        <GoogleFontLoader fonts={[{ font: 'Ubuntu', weights: [400, 700] }]} />
      </NoSsr>*/}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={3}>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            <Autocomplete
              value={valueCiclo || ''}
              onChange={(event, newValue) => {
                setValueCiclo(newValue)
              }}
              inputValue={valueCiclo?.label || ''}
              id="ciclo_lectivo_id"
              options={listaElectivos}
              sx={{ width: '100%' }}
              renderInput={(params) => (
                <TextField {...params} label="Ciclo Lectivo" />
              )}
            />
          )}
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          {loadingTeacher || loading ? (
            <CircularProgress />
          ) : (
            <Autocomplete
              value={valueSchool || ''}
              onChange={(event, newValue) => {
                setValueSchool(newValue)
              }}
              inputValue={valueSchool?.label || ''}
              id="school_id"
              options={listSchool ? listSchool : nada}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="School" />}
            />
          )}
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {loadingTeacher || loading ? (
          <Grid item container justify="center" alignItems="center" xs={12}>
            <CircularProgress />
          </Grid>
        ) : (
          teacherMaterias?.map((mt) => (
            <Grid item xs={12} md={6} lg={4} key={mt.id}>
              <CustomCard
                thumbnail={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQHCBAj8nRJkEwjWg5TpNuSZZG9iscsf43V1mfx0LZHNDYW3S_&usqp=CAU'
                }
                title={mt.materia.name}
                subtitle={mt.class.name}
                description={mt.materia.description}
                id={mt.materia_id}
                school_id={mt.school_id}
                clase_id={mt.clase_id}
                ciclo_lectivo_id={mt.ciclo_lectivo_id}
                materia_id={mt.materia_id}
              />
            </Grid>
          ))
        )}
      </Grid>
    </>
  )
})
export default TeacherClassroom
