import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogged } from './actions/auth'

import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { GaiaTheme } from './theme'
import { ThemeProvider } from '@mui/material/styles'

// Components
import Login from './components/login/Login'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home'

function App() {
  const { isLogged, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()
  const theme = createTheme({
    ...GaiaTheme,
    palette: {
      ...GaiaTheme.palette,
      mode: 'dark',
    },
  })
  useEffect(() => {
    dispatch(checkLogged())
  }, [dispatch])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!loading && (
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={LandingPage} />
            <Route path="/">
              {isLogged ? (
                <Home />
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
        )}
      </ThemeProvider>
    </Router>
  )
}

export default App
