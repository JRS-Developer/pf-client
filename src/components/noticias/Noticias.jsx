import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { getCicloElectivos as listCicloElectivos } from '../../actions/cicloElectivo'
import { getSchools as listSchools } from '../../actions/school'
import Feed from '../classroom/Feed'
import { getMatriculaByUserId } from '../../actions/matricula'
import Box from '@mui/material/Box'

export default function Noticias() {
  const [valueCiclo, setValueCiclo] = React.useState('')
  const [valueSchool, setValueSchool] = React.useState('')
  const alumnoId = localStorage.getItem('user')
  const alumnoRole = localStorage.getItem('role')
  const cicloElectivoReducer = useSelector(
    (state) => state.cicloElectivoReducer
  )
  const schoolReducer = useSelector((state) => state.schoolReducer)
  const alumnoMatriculaReducer = useSelector(
    (state) => state.matriculaReducer.dataEdit
  )
  //Me traigo las acciones.
  const getActionsModule = useSelector((state) => state.actionsModuleReducer)
  const { actionsModule } = getActionsModule

  //  function onSchoolChange(e) {
  //  console.log(e.target)
  //  let arr = Array.from(e.target.school_id)
  //  setValueSchool([alumnoMatriculaReducer.school_id])
  //  }

  // function onCicloLectivoChange(e) {
  //   let arr = Array.from(e.target.ciclo_lectivo_id)
  //   setValueCiclo([...arr])
  // }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listCicloElectivos())
    dispatch(listSchools())
    if (alumnoRole === 'Alumno') {
      dispatch(getMatriculaByUserId(alumnoId))
    }
  }, [dispatch, alumnoId, alumnoRole])

  const cicloElectivos = cicloElectivoReducer.cicloElectivos
  const loadingCicloLectivo = cicloElectivoReducer.loadingElectivo
  const errorCicloLectivo = cicloElectivoReducer.error

  const loadingSchool = schoolReducer.loadingSchool
  const schools = schoolReducer.schools
  const errorSchool = schoolReducer.error

  const actionsNames = actionsModule?.map((action) => action.name)

  useEffect(() => {
    if (cicloElectivos?.length > 0 && alumnoRole !== 'Alumno') {
      setValueCiclo({
        id: cicloElectivos[0].id,
        label: cicloElectivos[0].name,
      })
    } else {
      if (alumnoRole === 'Alumno') {
        setValueCiclo({ id: alumnoMatriculaReducer.ciclo_lectivo_id })
      }
    }
  }, [dispatch, cicloElectivos, alumnoRole, alumnoMatriculaReducer])

  useEffect(() => {
    if (schools?.length > 0 && alumnoRole !== 'Alumno') {
      setValueSchool({
        id: schools[0].id,
        label: schools[0].name,
      })
    } else {
      if (alumnoRole === 'Alumno') {
        setValueSchool({ id: alumnoMatriculaReducer.school_id })
      }
    }
  }, [dispatch, schools, alumnoRole, alumnoMatriculaReducer])

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
    
      <Box sx={{width: '100%', marginTop: '50px'}}>
      <Grid container spacing={4} >
        {actionsNames?.includes('Nuevo') || actionsNames?.includes('Editar') ? (
          <Grid item xs={12} md={6} lg={3} >
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
        ) : null}

        {actionsNames?.includes('Nuevo') || actionsNames?.includes('Editar') ? (
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
                renderInput={(params) => (
                  <TextField {...params} label="School" />
                )}
              />
            )}
          </Grid>
        ) : null}
      </Grid>
      <Box sx={{width: '100%'}}>
      
        {valueCiclo && valueSchool ? (
          <Feed
            valueCiclo={valueCiclo.id}
            valueSchool={valueSchool.id}
            noticias={true}
            nuevo={actionsNames?.includes('Nuevo')}
          />
        ) : null}
      
      
      </Box>
      </Box>
  )
}
