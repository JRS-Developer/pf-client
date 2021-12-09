import {useState} from "react";
// import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import { setLogged } from './actions/user'
import { ThemeProvider } from '@mui/material/styles';
import { DarkTheme, LightTheme } from './theme'
import CssBaseline from '@mui/material/CssBaseline'

// Components
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Container from "./components/container/Container";


function App() {
  const [sideToggle, setSideToggle] = useState(false);
  const [mode, setMode] = useState("dark");
  const selectedTheme = mode === "dark" ? DarkTheme : LightTheme;

  return (
    <Router>
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route path="/">
            <Header click={() => setSideToggle(false) } clickClose={() => setSideToggle(true) } show={sideToggle} setMode={setMode} mode={mode}/>
            <Navbar show={sideToggle} click={() => setSideToggle(false)}/>
            <Container show={sideToggle} />
          </Route>
        </Switch>     
      </ThemeProvider>
    </Router>
  )
}

export default App
