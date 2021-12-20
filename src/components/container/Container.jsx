import { Switch, Route } from 'react-router-dom'
import Box from '@mui/material/Box'

import ProfileIndex from "../profile/ProfileIndex";
import ActionIndex from "../action/ActionIndex";
import UserIndex from "../User/UserIndex"
import ModuleIndex from "../module/ModuleIndex";
import ClassRoom from "../classroom/classroom";
import Homework from "../classroom/Homework"
import NotasAlumnos from '../notas/NotasAlumno'
// import NotasProfesor from '../notas/NotasProfesor'
import Account from '../account/Account'
import StudentIndex from "../student/StudentIndex";
import CicloElectivoIndex from "../CicloElectivo/CicloElectivoIndex"
import MatriculaIndex from "../matricula/MatriculaIndex";
import ClassIndex from "../class/ClassIndex"

const Content = ({ show }) => {
  return (
    
      <Box sx={{marginLeft: show ? 0 : "200px", p: 2, mt: 6, transition: "all 0.3s" }}>
        <Switch>
          <Route exact path="/roles" component={ProfileIndex} />
          <Route exact path="/actions" component={ActionIndex} />
          <Route exact path="/modules" component={ModuleIndex} />
          <Route exact path="/users" component={UserIndex} />
          <Route exact path="/materias" component={ClassRoom} />
          <Route exact path="/tareas/:id" component={Homework} />
          <Route exact path="/notasalumnos" component={NotasAlumnos} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/students" component={StudentIndex} />
          <Route exact path="/ciclo-electivo" component={CicloElectivoIndex} />
          <Route exact path="/matriculas" component={MatriculaIndex} />
          <Route exact path="/class" component={ClassIndex} />
        </Switch>
      </Box>
  )
}

export default Content
//
