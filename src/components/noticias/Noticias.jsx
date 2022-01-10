import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import GoogleFontLoader from 'react-google-font-loader';

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import { Row, Item } from '@mui-treasury/components/flex'
import { Info } from '@mui-treasury/components/info'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'

import { getCicloElectivos as listCicloElectivos } from '../../actions/cicloElectivo'



export default function Noticias(){
  const [valueCiclo, setValueCiclo] = React.useState('')
  const [valueSchool, setValueSchool] = React.useState('')
  const [listSchool, setListSchool] = React.useState('')

  
  const cicloElectivoReducer = useSelector(
    (state) => state.cicloElectivoReducer
    )
    const { cicloElectivos, loading, error } = cicloElectivoReducer
    
  const dispatch = useDispatch()
    
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
  }, [cicloElectivos])

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
          {loading ? (
            <CircularProgress />
          ) : (
            <Autocomplete
              value={valueSchool || ''}
              onChange={(event, newValue) => {
                setValueSchool(newValue)
              }}
              inputValue={valueSchool?.label || ''}
              id="school_id"
              options={listSchool? listSchool : false}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="School" />}
            />
          )}
        </Grid>
      
    </Grid>
    </>
  )
}





