import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogged } from './actions/auth'

import { ThemeProvider } from '@mui/material/styles'
import * as themes from './theme'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'

// Components
import Navbar from './components/navbar/Navbar'
import Header from './components/header/Header'
import Login from './components/login/Login'
import Container from './components/container/Container'
import LandingPage from './components/LandingPage/LandingPage'

function App() {
  const [sideToggle, setSideToggle] = useState(false)
  const { isLogged } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()

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

  useEffect(() => {
    dispatch(checkLogged)
  }, [dispatch])

  return (
    <Router>
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={LandingPage} />
          <Route path="/">
            {isLogged ? (
              <>
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
              </>
            ) : (
              <Redirect
                push
                to={{
                  pathname: '/home',
                  state: {
                    location: location.pathname,
                  },
                }}
              />
            )}
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App
