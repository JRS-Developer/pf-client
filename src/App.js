import {useState} from "react";
// import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import { setLogged } from './actions/user'
import { ThemeProvider } from '@mui/material/styles';
import * as themes from './theme'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles';

// Components
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Container from "./components/container/Container";


//import { getUsers } from "./actions/user";
import { useSelector } from "react-redux";




function App() {
  const [sideToggle, setSideToggle] = useState(false);

  const [theme, setTheme] = useState("GaiaTheme");
  const [mode, setMode] = useState(true);
  const actualTheme = themes[theme]
  const selectedTheme = createTheme(mode ? themes[theme] : {...actualTheme, palette: {...actualTheme.palette, mode: 'light', background:{paper: '#e6e6e6'}}});
  const selector = useSelector((state)=> state.users)

  console.log()

  return (
    <Router>
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route path="/">
            <Header click={() => setSideToggle(false) } clickClose={() => setSideToggle(true) } show={sideToggle} setTheme={setTheme} setMode={setMode} mode={mode}/>
            <Navbar show={sideToggle} click={() => setSideToggle(false)}/>
            <Container show={sideToggle} />
          </Route>
        </Switch>     
      </ThemeProvider>
    </Router>
  )
}

export default App
