import { combineReducers } from 'redux'
import authReducer from './auth'
import { getUsersReducer } from './user/'
import { getActionsReducer } from './action'
import { getModulesReducer } from './module'
import { getRolesReducer } from './role'

export default combineReducers({
  usersReducer: getUsersReducer,
  actionsReducer: getActionsReducer,
  modulesReducer: getModulesReducer,
  rolesReducer: getRolesReducer,
  auth: authReducer,
})
