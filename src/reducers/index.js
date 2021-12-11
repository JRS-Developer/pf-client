import { combineReducers } from 'redux'

import getUserReducer from './user/'
import {getActionsReducer} from "./action";
import {getModulesReducer} from "./module";
export default combineReducers({
  usersReducer: getUserReducer,
  actionsReducer: getActionsReducer,
  modulesReducer: getModulesReducer
import userReducer from './user/'
import authReducer from './auth'

export default combineReducers({
  users: userReducer,
  auth: authReducer

})
