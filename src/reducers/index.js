import { combineReducers } from 'redux'
import authReducer from './auth'
import { getUsersReducer } from './user/'
import { getActionsReducer } from './action'
import { getModulesReducer } from './module'
import { getRolesReducer } from './role'
import { getNavbarReducer } from './navbar'
import { loginPhotoReducer } from './loginPhoto'
import { getActionsModuleReducer } from './actionsModule'
import { getAccessUserReducer, addAccessUserReducer } from './access'
import { getTasksReducer } from './task'
import { getPostsReducer } from './post'
import { getStudentsReducer } from './student'
import { getCicloElectivoReducer } from './cicloElectivo'
import { getMatriculaReducer } from './matricula'
import { getClasesReducer } from './clase'
import { getMateriasReducer } from './materia'
import { getSchoolReducer } from './school'
import { getChatReducer} from './chat'
import { getTeacherReducer } from './teacher'
import { getExamenNotasReducer } from './examenNotas'


export default combineReducers({
  usersReducer: getUsersReducer,
  actionsReducer: getActionsReducer,
  modulesReducer: getModulesReducer,
  rolesReducer: getRolesReducer,
  auth: authReducer,
  navbarReducer: getNavbarReducer,
  loginPhoto: loginPhotoReducer,
  actionsModuleReducer: getActionsModuleReducer,
  accessUserReducer: getAccessUserReducer,
  addAccessUserReducer: addAccessUserReducer,
  tasksReducer: getTasksReducer,
  postsReducer: getPostsReducer,
  studentReducer: getStudentsReducer,
  cicloElectivoReducer: getCicloElectivoReducer,
  matriculaReducer: getMatriculaReducer,
  clasesReducer: getClasesReducer,
  materiasReducer: getMateriasReducer,
  schoolReducer: getSchoolReducer,
  chatReducer:getChatReducer,
  teacherReducer: getTeacherReducer,
  examenNotasReducer: getExamenNotasReducer
})
