import { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Box from '@mui/material/Box'

import RolesIndex from '../Roles/RolesIndex'
import ActionIndex from '../action/ActionIndex'
import UserIndex from '../User/UserIndex'
import ModuleIndex from '../module/ModuleIndex'
import ClassRoom from '../classroom/classroom'
import ClassroomIndex from '../classroom/ClassroomIndex'
import Homework from '../classroom/Homework'
// import NotasAlumnos from '../notas/NotasAlumno'
// import NotasProfesor from '../notas/NotasProfesor'
// import Account from '../account/Account'
import StudentIndex from '../student/StudentIndex'
import CicloElectivoIndex from '../CicloElectivo/CicloElectivoIndex'
import MatriculaIndex from '../matricula/MatriculaIndex'
import ClassIndex from '../class/ClassIndex'
import SchoolIndex from '../school/SchoolIndex'
import MateriaIndex from '../materia/MateriaIndex'
import Profile from '../Profile/Profile'
import TeacherIndex from '../teacher/TeacherIndex'
import TablaEntregas from '../teacher/homework/TablaEntregas.jsx'
import TeacherClassroom from '../teacher/TeacherClassroom'
import ActionsMateria from '../teacher/ActionsMateria'
import Notifications from '../notifications/Notifications'
import { socketChat } from '../socket'
import Noticias from '../noticias/Noticias'


const Content = ({
  show,
  setTheme,
  primary,
  setPrimary,
  secondary,
  setSecondary,
}) => {
  // Seteamos al usuario como usuario conectado en el socket
  useEffect(() => {
    const user = localStorage.getItem('user')
    socketChat.emit('go-online', user)

    const handleUnload = () => {
      socketChat.emit('go-offline', user)
      // e.preventDefault()
      // e.returnValue = ''
    }

    // Seteamos al usuario como usuario desconectado en el socket cuando se cierre la pestaña
    window.addEventListener('unload', handleUnload)

    return () => {
      window.removeEventListener('unload', handleUnload)
    }
  }, [])

  return (
    <Box
      sx={{
        marginLeft: show ? 0 : '200px',
        p: 2,
        mt: 6,
        transition: 'all 0.3s',
      }}
    >
      <Switch>
        <Route exact path="/roles" component={RolesIndex} />
        <Route exact path="/actions" component={ActionIndex} />
        <Route exact path="/modules" component={ModuleIndex} />
        <Route exact path="/users" component={UserIndex} />
        <Route exact path="/classroom" component={ClassroomIndex} />
        {/* AULA virtual */}
        <Route exact path="/tareas/:id" component={Homework} />
        <Route exact path="/students" component={StudentIndex} />
        {/* ADMINISTRACION */}
        <Route exact path="/ciclo-lectivo" component={CicloElectivoIndex} />
        {/* ADMINISTRACION */}
        <Route exact path="/matriculas" component={MatriculaIndex} />
        {/* ADMINISTRACION */}
        <Route exact path="/class" component={ClassIndex} />
        {/* ADMINISTRACION */}
        <Route exact path="/schools" component={SchoolIndex} />
        <Route
          exact
          path="/materias/details/:schoolId/:cicloLectivoId/:claseId/:materiaId"
          component={ClassRoom}
        />
        <Route exact path="/teachers" component={TeacherIndex} />
        <Route exact path="/materias" component={MateriaIndex} />
        {/* AULA virtual */}
        {/* <Route exact path="/materias/details/:claseId/:materiaId" component={ClassRoom} /> */}
        <Route exact path="/noticias" component={Noticias} />
        <Route exact path="/homeworkslist/:tareaId" component={TablaEntregas} />
        <Route exact path="/profile">
          <Profile
            setTheme={setTheme}
            primary={primary}
            setPrimary={setPrimary}
            secondary={secondary}
            setSecondary={setSecondary}
          />
        </Route>
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/classroom-teacher" component={TeacherClassroom} />
        <Route
          exact
          path="/materia/:school_id/:clase_id/:ciclo_lectivo_id/:materia_id"
          component={ActionsMateria}
        />
      </Switch>
    </Box>
  )
}

export default Content
//
