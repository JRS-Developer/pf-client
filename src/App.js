import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { setLogged } from './actions/user'

// Components
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Content from "./components/content/Content";

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Header click={() => setSideToggle(false) } clickClose={() => setSideToggle(true) } show={sideToggle}/>
      <Navbar show={sideToggle} click={() => setSideToggle(false)}/>
      <Content show={sideToggle} />

    </Router>
  )
}

export default App
