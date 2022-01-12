import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import { List, CircularProgress } from '@mui/material/'
import ModuleItem from './ModuleItem'
import { makeStyles } from '@mui/styles'
import { getNavbar as listNavbar } from '../../actions/navbar'
import { getActionsByModule } from '../../actions/actionsModule'

const useStyles = makeStyles((theme) => ({
  box: {
    scrollbarColor: '#6b6b6b #2b2b2b',
    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
      backgroundColor: 'none',
      width: 3,
    },
    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      backgroundColor: theme.palette.primary.main,
      minHeight: 24,
    },
    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
      backgroundColor: '#959595',
    },
    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
      backgroundColor: '#959595',
    },
    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#959595',
    },
    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
      backgroundColor: '#2b2b2b',
    },
  },
}))

const Navbar = ({ show, click }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
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
      className={classes.box}
      sx={{
        direction: "rtl",
        position: 'fixed',
        top: '64px',
        height: 'calc(100vh - 60px)',
        transform: !show ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-out',
        width: '200px',
        zIndex: '1000',
        overflow: 'auto',
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
