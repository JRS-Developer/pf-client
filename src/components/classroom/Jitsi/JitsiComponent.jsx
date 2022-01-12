import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Jitsi from 'react-jitsi'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDataById } from '../../../actions/user'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import useTheme from '@mui/material/styles/useTheme'

export default function JitsiComponent() {
  const dispatch = useDispatch()
  const { firstName, lastName } = useSelector(
    (state) => state.usersReducer.dataEdit
  )
  const [call, setCall] = useState(false)
  const params = useParams()
  const claseId = params.claseId || params.clase_id
  const materiaId = params.materiaId || params.materia_id
  const cicloLectivoId = params.cicloLectivoId || params.ciclo_lectivo_id
  const schoolId = params.schoolId || params.school_id

  const theme = useTheme()

  useEffect(() => {
    dispatch(getDataById(localStorage.getItem('user')))
  }, [dispatch])

  function handleClick(e){
  e.preventDefault()
    setCall(true)
  }

  useEffect(() => {
  document.getElementById('react-jitsi-container') &&
    document
      .getElementById('react-jitsi-container')
      .getElementsByTagName('DIV') &&
    ReactDOM.render(
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 128px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress
          size={100}
          sx={{ color: theme.palette.primary.main }}
        />
        <div>Podría demorar unos segundos...</div>
      </div>,
      document
        .getElementById('react-jitsi-container')
        .getElementsByTagName('DIV')[0]
    )})

  return (
    <>
      {call ? (
        <Jitsi
          roomName={`${schoolId}${cicloLectivoId}${claseId}${materiaId}`}
          displayName={`${firstName} ${lastName}`}
          config={{ prejoinPageEnabled: false }}
          containerStyle={{ width: '100%', height: 'calc(100vh - 128px)' }}
        />
      ) : (
        <Box sx={{
          width: '100%',
          height: 'calc(100vh - 128px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Button variant="contained" onClick={handleClick}>
            Iniciar videollamada
          </Button>
        </Box>
      )}
    </>
  )
}
