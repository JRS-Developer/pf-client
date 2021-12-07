import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { setLogged } from './actions/user'

// Components
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Login from "./components/login/Login";

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Switch>
      <Route exact path="/login" component={Login}/>
      <Route path="/">
      <Header click={() => setSideToggle(false) } clickClose={() => setSideToggle(true) } show={sideToggle}/>
      <Navbar show={sideToggle} click={() => setSideToggle(false)}/>
      <Content show={sideToggle} />
      </Route>
      </Switch>

    </Router>
  )
}

export default App
