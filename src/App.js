import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { setLogged } from './actions/user'
import ProfileIndex from "./components/profile/ProfileIndex";

// Components
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Container from "./components/container/Container";


function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Switch>
      <Route exact path="/login" component={Login}/>
      <Route path="/">
      <Header click={() => setSideToggle(false) } clickClose={() => setSideToggle(true) } show={sideToggle}/>
      <Navbar show={sideToggle} click={() => setSideToggle(false)}/>
      </Route>
      </Switch>
      <Container show={sideToggle} />
    </Router>
  )
}

export default App
