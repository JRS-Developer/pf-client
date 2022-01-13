import React, { useState } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom'
import Logo from '../../logo2.png'
import Gaia from './Gaia'

import Who from './Who'

const useStyles = makeStyles((theme) => ({
  box: {
    scrollbarColor: '#6b6b6b #2b2b2b',
    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
      backgroundColor: 'none',
      width: 5,
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

export default function LandingPage() {
  const classes = useStyles()
  const [value, setValue] = useState('¿Que es GAIA?')
  const [scroll, setScroll] = useState(0)
  const pages = ['¿Que es GAIA?', '¿Quienes somos?']
  const history = useHistory()

  function handleClick(e) {
    setValue(e.target.name)
  }

  function handleScroll(e) {
    setScroll(e.target.scrollTop)
    console.log(e.target.scrollTop)
    console.log(e.target.offsetHeight)
  }

  function show(value) {
    switch (value) {
      case '¿Que es GAIA?':
        return <Gaia scroll={scroll}/>



      case '¿Quienes somos?':
        return <Who/>

      default:
        return <Box>Error</Box>
    }
  }

  return (
    <Box>
      <AppBar position="fixed" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: 'block' }}
          >
            <Box sx={{ width: 50, mt: 1 }}>
              <img src={Logo} style={{ width: '100%' }} alt="Logo Gaia" />
            </Box>
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', ml: 2 }}>
            {pages.map((page) => (
              <Button
                key={page}
                name={page}
                size="large"
                sx={{
                  color: 'white',
                  display: 'block',
                  backgroundColor: value === page ? 'secondary.main' : 'none',
                  ':hover': {
                    backgroundColor: value === page ? 'secondary.main' : 'none',
                    color: 'white',
                  },
                }}
                onClick={handleClick}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Button
            sx={{ backgroundColor: 'secondary.main', color: 'white' }}
            onClick={() => history.push('/login')}
          >
            Log in
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        className={classes.box}
        onScroll={handleScroll}
        sx={{ height: 'calc(100vh - 64px)', overflow: 'auto', overflowX: "hidden" , mt: '64px' }}
      >
        {show(value)}
      </Box>
    </Box>
  )
}
