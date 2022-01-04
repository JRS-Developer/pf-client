import React, { useState } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useHistory } from "react-router-dom"
import Logo from '../../logo2.png'
import {gaia} from './gaia'
import {pricing} from './pricing'
import {who} from './who'

export default function LandingPage() {

  const [value, setValue] = useState('¿Que es GAIA?')
  const pages = ['¿Que es GAIA?', 'Planes', '¿Quienes somos?'];
  const history = useHistory()

  function handleClick(e){
    setValue(e.target.name)
  }

  function show(value){
    switch (value){
      case '¿Que es GAIA?':
        return gaia

      case 'Planes':
        return pricing

      case '¿Quienes somos?':
        return who

      default:
        return(
          <Box>
            Error
          </Box>
        )
    }
  }

  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
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
                sx={{color: 'white', display: 'block', backgroundColor: value === page ? 'secondary.main' : 'none', ':hover': {
                  backgroundColor: value === page ? 'secondary.main' : 'none',
                  color: 'white',
                } }}
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
      {show(value)}
    </Box>
  )
}
