import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import { List, CircularProgress } from '@mui/material/'
import ModuleItem from './ModuleItem'

import { getNavbar as listNavbar } from '../../actions/navbar'
import { getActionsByModule } from '../../actions/actionsModule'

const Navbar = ({ show, click }) => {
  const dispatch = useDispatch()

  const getNavbar = useSelector((state) => state.navbarReducer)
  const { navbar, loading, error } = getNavbar

  useEffect(() => {
    dispatch(listNavbar())
  }, [dispatch])

  const getActionsModule = (moduleId) => {
    dispatch(getActionsByModule(moduleId))
  }

  return (
    <List
      component="nav"
      sx={{
        position: 'fixed',
        top: '64px',
        height: 'calc(100vh - 60px)',
        transform: !show ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.5s ease-out',
        width: '200px',
        zIndex: '1000',
        overflow: 'hidden',
        boxShadow:
          'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
      }}
    >
      {loading ? (
        <Box
          sx={{
            height: 'inherit',
            width: 'inherit',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box
          sx={{
            height: 'inherit',
            width: 'inherit',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {error}
        </Box>
      ) : (
        navbar?.map((module) => (
          <ModuleItem
            key={module.id}
            module={module}
            getActionsModule={getActionsModule}
          />
        ))
      )}
    </List>
  )
}

export default Navbar
