import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Jitsi from 'react-jitsi'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDataById } from '../../../actions/user'
import CircularProgress from '@mui/material/CircularProgress'
import useTheme from "@mui/material/styles/useTheme"

export default function JitsiComponent() {
  const dispatch = useDispatch()
  const { firstName, lastName } = useSelector(
    (state) => state.usersReducer.dataEdit
  )
  const params = useParams()
  const claseId = params.claseId || params.clase_id
  const materiaId = params.materiaId || params.materia_id
  const cicloLectivoId = params.cicloLectivoId || params.ciclo_lectivo_id
  const schoolId = params.schoolId || params.school_id

  const theme = useTheme();

  useEffect(() => {
    dispatch(getDataById(localStorage.getItem('user')))
  }, [dispatch])

  document.getElementById('react-jitsi-container') &&
    document
      .getElementById('react-jitsi-container')
      .getElementsByTagName('DIV') &&
    ReactDOM.render(
      <div style={{width: '100%', height: 'calc(100vh - 128px)',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={100} sx={{color: theme.palette.primary.main}}/>
      </div>,
      document
        .getElementById('react-jitsi-container')
        .getElementsByTagName('DIV')[0]
    )

  return (
    <Jitsi
      roomName={`${schoolId}${cicloLectivoId}${claseId}${materiaId}`}
      displayName={`${firstName} ${lastName}`}
      config={{ prejoinPageEnabled: false }}
      containerStyle={{ width: '100%', height: 'calc(100vh - 128px)' }}
    />
  )
}
