import { useState, useEffect } from 'react'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import * as themes from '../theme'
import CssBaseline from '@mui/material/CssBaseline'

import Navbar from './navbar/Navbar'
import Header from './header/Header'
import Container from './container/Container'

import {subscription} from '../services'

const Home = () => {
  const [sideToggle, setSideToggle] = useState(false)

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'GaiaTheme'
  )
  const [mode, setMode] = useState(localStorage.getItem('mode') === '0' ? 0 : 1)
  const [primary, setPrimary] = useState(
    localStorage.getItem('primary') || themes.GaiaTheme.palette.primary.main
  )
  const [secondary, setSecondary] = useState(
    localStorage.getItem('secondary') || themes.GaiaTheme.palette.secondary.main
  )
  const [custom, setCustom] = useState({
    typography: {
      fontSize: 12,
    },
    palette: {
      mode: 'dark',
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      info: {
        main: '#846699',
      },
    },
  })

  useEffect(() => {
    subscription()
  })

  useEffect(() => {
    setCustom({
      typography: {
        fontSize: 12,
      },
      palette: {
        mode: 'dark',
        primary: {
          main: primary,
        },
        secondary: {
          main: secondary,
        },
        info: {
          main: '#846699',
        },
      },
    })
  }, [primary, secondary])

  const actualTheme = theme !== 'custom' ? themes[theme] : custom

  const selectedTheme = createTheme(
    mode
      ? actualTheme
      : {
          ...actualTheme,
          palette: {
            ...actualTheme.palette,
            mode: 'light',
            background: { paper: '#e0e0e0' },
          },
        }
  )

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <main>
        <Header
          click={() => setSideToggle(false)}
          clickClose={() => setSideToggle(true)}
          show={sideToggle}
          setMode={setMode}
          mode={mode}
        />
        <Navbar show={sideToggle} click={() => setSideToggle(false)} />
        <Container
          show={sideToggle}
          setTheme={setTheme}
          primary={primary}
          setPrimary={setPrimary}
          secondary={secondary}
          setSecondary={setSecondary}
        />
      </main>
    </ThemeProvider>
  )
}

export default Home
