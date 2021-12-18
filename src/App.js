import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
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


function App() {
  const [sideToggle, setSideToggle] = useState(false)
  const { isLogged } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'GaiaTheme')
  const [mode, setMode] = useState(localStorage.getItem('mode') === "0" ? 0 : 1)
  
  const actualTheme = themes[theme]
  const selectedTheme = createTheme(
    mode
      ? themes[theme]
      : {
        ...actualTheme,
        palette: {
          ...actualTheme.palette,
          mode: 'light',
          background: { paper: '#e6e6e6' },
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
          <Route path="/">
            {isLogged ? (
              <>
                <Header
                  click={() => setSideToggle(false)}
                  clickClose={() => setSideToggle(true)}
                  show={sideToggle}
                  setTheme={setTheme}
                  setMode={setMode}
                  mode={mode}
                />
                <Navbar show={sideToggle} click={() => setSideToggle(false)} />
                <Container show={sideToggle} />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App
