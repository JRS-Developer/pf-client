import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { getCicloElectivos as listCicloElectivos } from '../../actions/cicloElectivo'
import { getSchools as listSchools } from '../../actions/school'
import Feed from '../classroom/Feed'

export default function Noticias() {
  const [valueCiclo, setValueCiclo] = React.useState('')
  const [valueSchool, setValueSchool] = React.useState('')

  const cicloElectivoReducer = useSelector(
    (state) => state.cicloElectivoReducer
  )
  const schoolReducer = useSelector((state) => state.schoolReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listCicloElectivos())
    dispatch(listSchools())
  }, [dispatch])

  const cicloElectivos = cicloElectivoReducer.cicloElectivos
  const loadingCicloLectivo = cicloElectivoReducer.loadingElectivo
  const errorCicloLectivo = cicloElectivoReducer.error

  const loadingSchool = schoolReducer.loadingSchool
  const schools = schoolReducer.schools
  const errorSchool = schoolReducer.error

  useEffect(() => {
    if (cicloElectivos?.length > 0) {
      setValueCiclo({
        id: cicloElectivos[0].id,
        label: cicloElectivos[0].name,
      })
    }
  }, [dispatch, cicloElectivos])

  useEffect(() => {
    if (schools?.length > 0) {
      setValueSchool({
        id: schools[0].id,
        label: schools[0].name,
      })
    }
  }, [dispatch, schools])

  // Listamos Los ciclos electivos
  let listaElectivos = []
  cicloElectivos?.map((electivo) => {
    return listaElectivos.push({
      id: electivo.id,
      label: electivo.name,
    })
  })

  let listaSchools = []
  schools?.map((school) => {
    return listaSchools.push({
      id: school.id,
      label: school.name,
    })
  })

  return (
    <>
      <br />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={3}>
          {loadingCicloLectivo ? (
            <CircularProgress />
          ) : errorCicloLectivo ? (
            <h3>{errorCicloLectivo}</h3>
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
          {loadingSchool ? (
            <CircularProgress />
          ) : errorSchool ? (
            <h3>{errorSchool}</h3>
          ) : (
            <Autocomplete
              value={valueSchool || ''}
              onChange={(event, newValue) => {
                setValueSchool(newValue)
              }}
              inputValue={valueSchool?.label || ''}
              id="school_id"
              options={listaSchools}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="School" />}
            />
          )}
        </Grid>
      </Grid>
      <Grid container>
        {valueCiclo && valueSchool ? (
          <Feed valueCiclo={valueCiclo.id} valueSchool={valueSchool.id} />
        ) : null}
      </Grid>
    </>
  )
}
