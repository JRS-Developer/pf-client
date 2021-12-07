import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { setLogged } from './actions/user'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'

// Components
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Container from "./components/container/Container";


function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route path="/">
            <Header click={() => setSideToggle(false) } clickClose={() => setSideToggle(true) } show={sideToggle}/>
            <Navbar show={sideToggle} click={() => setSideToggle(false)}/>
          </Route>
        </Switch>
        <Container show={sideToggle} />
      </ThemeProvider>
    </Router>
  )
}

export default App
